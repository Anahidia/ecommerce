import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entities';
import { Repository } from 'typeorm';
import { readFileSync } from 'fs';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';
import { CreateUserDto } from 'dto/CreateUserDto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async seedUsers() {
    const filePath = path.join(process.cwd(), 'src', 'utils', 'userSeeder.json');

    // Leer el archivo JSON
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));

    // Insertar los usuarios en la base de datos
    await Promise.all(
      data.map(async (element) => {
        const user = new Users();
        user.name = element.name;
        user.email = element.email;

        // Hashear la contraseña antes de asignarla
        const hashedPassword = await bcrypt.hash(element.password, 10);
        user.password = hashedPassword;

        user.phone = element.phone;
        user.address = element.address;
        user.country = element.country;
        user.city = element.city;
        user.isAdmin = element.isAdmin || false;  // Asignar 'false' si no se especifica el campo

        // Crear o actualizar el usuario
        await this.usersRepository
          .createQueryBuilder()
          .insert()
          .into(Users)
          .values(user)
          .orUpdate(['name', 'password', 'phone', 'address', 'country', 'city', 'isAdmin'], ['email'])
          .execute();
      }),
    );

    return 'Usuarios agregados';
  }
  // Obtener todos los usuarios con paginación
  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [users, total] = await this.usersRepository.findAndCount({
      take: limit,
      skip,
    });

    return {
      total,
      page,
      limit,
      users: users.map(({ password, ...userNoPassword }) => userNoPassword),
    };
  }

  // Obtener usuario por correo electrónico
  async getUsersByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    return user;
  }

  // Obtener usuario por Google ID
  async getUserByGoogleId(googleId: string) {
    const user = await this.usersRepository.findOne({ where: { googleId } });
    if (!user) throw new NotFoundException(`Usuario con Google ID ${googleId} no encontrado`);
    return user;
  }

  // Obtener usuario por ID
  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true }, // Relación de órdenes si es necesario
    });
    if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Crear un nuevo usuario
  async createUser(user: Partial<Users>) {
    const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });
    if (existingUser) throw new ForbiddenException('Ya existe un usuario con ese correo electrónico');

    const newUser = await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });

    if (!dbUser) throw new NotFoundException(`Usuario con id ${newUser.id} no encontrado`);

    const { password, ...userWithoutPassword } = dbUser;
    return userWithoutPassword;
  }

  // Asignar un rol de admin a un usuario
  async assignAdminRole(email: string, currentUserId: string) {
    const currentUser = await this.usersRepository.findOne({ where: { id: currentUserId } });
    if (!currentUser || !currentUser.isAdmin) {
      throw new ForbiddenException('No tienes permisos para asignar roles de admin');
    }

    const userToUpdate = await this.usersRepository.findOne({ where: { email } });
    if (!userToUpdate) throw new NotFoundException('Usuario no encontrado');
    if (userToUpdate.isAdmin) throw new ForbiddenException('Este usuario ya es administrador');

    userToUpdate.isAdmin = true;
    return await this.usersRepository.save(userToUpdate);
  }

  // Actualizar usuario
  async updateUser(id: string, upUser: Partial<Users>): Promise<Partial<Users>> {
    const existingUser = await this.usersRepository.findOne({ where: { id } });
    if (!existingUser) throw new NotFoundException(`Usuario con id ${id} no encontrado`);

    await this.usersRepository.update(id, upUser);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (!updatedUser) throw new NotFoundException(`Usuario con id ${id} no encontrado tras la actualización`);

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  // Eliminar usuario
  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);

    await this.usersRepository.remove(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
