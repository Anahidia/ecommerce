import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/user.entities';
import { CreateUserDto } from 'dto/CreateUserDto';
import { CreateGoogleUserDto } from 'dto/createUserByGoogle';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUpWithEmail(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const foundUser = await this.userRepository.getUsersByEmail(email);
    if (foundUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser({ ...createUserDto, password: hashedPassword });
  }

  // Registro con Google
  async signUpWithGoogle(createGoogleUserDto: CreateGoogleUserDto) {
    const { email, googleId } = createGoogleUserDto;

    const foundUser = await this.userRepository.getUsersByEmail(email);
    if (foundUser) {
      throw new BadRequestException('Email already registered');
    }

    return await this.userRepository.createUser({ email, googleId, password: null });
  }

  // Inicio de sesión con formulario
  async signInWithEmail(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.getUsersByEmail(email);
    if (!user || !user.password) {
      throw new BadRequestException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, isAdmin: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  // Inicio de sesión con Google
  async signInWithGoogle(email: string, googleId: string): Promise<{ token: string }> {
    const user = await this.userRepository.getUsersByEmail(email);
    if (!user || user.googleId !== googleId) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, isAdmin: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }

}
