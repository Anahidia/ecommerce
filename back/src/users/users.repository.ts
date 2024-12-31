import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

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