import { Injectable,BadRequestException} from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcryptjs'
import { Users } from 'src/entities/user.entities';
import{JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly userRepository:UserRepository,
    private readonly jwtService:JwtService,){}
  getAuthService(): string {
    return 'get all auth';
  }

 async signUpService(user:Partial<Users>){
  const {email,password}=user
    const foundUser=await this.userRepository.getUsersByEmmail(email)
  
   if (!email|| !password) throw new BadRequestException('required email y password')

  
   if(foundUser)throw new BadRequestException('registered email')
   console.log(foundUser)

   //proceso de registro

   //1.hashear la password

   const hashedPass= await bcrypt.hash(password,10)

   return await this.userRepository.createUser({...user,password:hashedPass})

}


  async signInService(email:string,password:string){
   if(!email || !password) return 'Data Required'
    const user=await this.userRepository.getUsersByEmmail(email)
   if(!user) throw new BadRequestException('invalid credentials')

   //comparacion de contraseñas (la de la bs vs la del cliente)

   const validPassword=await bcrypt.compare(password,user.password)

   if(!validPassword) throw new BadRequestException('invalid credentials')
//firma del token

const payload={
  id:user.id,
  email:user.email,
  isadmin:user.isadmin
}

//generamos token

const token =this.jwtService.sign(payload)

//entregamos respuesta

    return {
      message:'load-in user',
      token
  }}
}
