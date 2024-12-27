import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';

import { Users } from 'src/entities/user.entities';
import { CreateUserDto } from 'dto/CreateUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUpService(createUserDto: CreateUserDto) {
    const { email, password, googleId } = createUserDto;

    // Verifica si el usuario ya existe
    const foundUser = await this.userRepository.getUsersByEmail(email);
    if (foundUser) {
      throw new BadRequestException('Email already registered');
    }

    // Si el usuario se registra con un Google ID, no es necesario hacer hash de la contraseña
    if (googleId) {
      return await this.userRepository.createUser({ ...createUserDto, password: null });
    }

    // Si es un registro tradicional, hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser({ ...createUserDto, password: hashedPassword });
  }

  async signInService(email: string, password: string): Promise<any> {
    const user = await this.userRepository.getUsersByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new BadRequestException('Invalid credentials');

    const payload = {
      id: user.id,
      email: user.email,
      isadmin: user.isadmin,
    };

    const token = this.jwtService.sign(payload);

    return { message: 'Logged in user', token };
  }
}