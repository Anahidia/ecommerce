import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

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
  async createAdminService(email:string,currentUserId:string){
  return this.UsersRepository.assignAdminRole(email,currentUserId)
  }
  updateUserService(id:string, upUser){
return this.UsersRepository.updateUser(id,upUser)
  }
  deleteUserService(id:string){
return this.UsersRepository.deleteUser(id)
  }
}
