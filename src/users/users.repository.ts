import { ForbiddenException, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
constructor(
  @InjectRepository(Users)
  private usersRepository:Repository<Users>
){}

 async getUsers(page:number,limit:number) {
    const skip=(page-1)*limit
    const users=await this.usersRepository.find({
      take:limit,
      skip:skip
    })
    return users.map(({password,...userNoPasword})=>userNoPasword)
    }

  async getUsersByEmmail(email:string){
     return await this.usersRepository.findOneBy({email})
    
  }


 async getUserById(id:string){
const user= await this.usersRepository.findOne({
where:{id},
relations:{
  orders:true
}
})
if(!user) throw new NotFoundException(`product whit id ${id} not found`)


const { password, ...userNoPass}=user

return userNoPass


  }
async createUser(user:Partial<Users>):Promise<Partial<Users>>{
const newUser=await this.usersRepository.save(user)
const dbUser= await this.usersRepository.findOneBy({id:newUser.id})
const {password,...userWhithoutPassword}=dbUser
return userWhithoutPassword
}

async createdAdmin(email:string,currentUserId:string) {
  
  const currentUser= await this.usersRepository.findOne({where:{id:currentUserId}})
  if(!currentUser || !currentUser.isadmin){
    throw new NotFoundException('No tienes permisos para asignar roles de admin')
 }
 const userUpdate= await this.usersRepository.findOne({where:{email:email}})
 if (!userUpdate) {
  throw new NotFoundException('Usuario no encontrado');
}
if(userUpdate.isadmin){
  throw new ForbiddenException('este usuario ya es admmin')
}
userUpdate.isadmin=true
return await this.usersRepository.save(userUpdate)

}

async updateUser(id:string,upUser:Users):Promise<Partial<Users>>{

  await this.usersRepository.update(id,upUser)
  const upDateUser= await this.usersRepository.findOneBy({id})
  
  if(!upDateUser) throw new NotFoundException(`product whit id ${id} not found`)

  const {password, ...userWhithoutPassword}=upDateUser
return userWhithoutPassword
}

async deleteUser(id:string){
const user= await this.usersRepository.findOneBy({id})
if(!user) throw new NotFoundException(`product whit id ${id} not found`)

this.usersRepository.remove(user)
  const {password, ...userWhithoutPassword}=user

  return userWhithoutPassword

}
}