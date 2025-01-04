import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Rol } from 'src/rol.enum';

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UserRepository) {}
  getUserServices(page:number,limit:number) {
    return this.UsersRepository.getUsers(page,limit);
  }
  getUserByIdService(id:string){
    return this.UsersRepository.getUserById(id)
  }
  createUserService(user){
 return this.UsersRepository.createUser(user)
  }
  async createAdminService(email:string,currentUserId:string,newRole:Rol){
  return this.UsersRepository.assignRole(email,currentUserId,newRole)
  }
  updateUserService(id:string, upUser){
return this.UsersRepository.updateUser(id,upUser)
  }
  deleteUserService(id:string){
return this.UsersRepository.deleteUser(id)
  }
}
