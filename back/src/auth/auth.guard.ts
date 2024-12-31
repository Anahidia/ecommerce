import { UnauthorizedException,CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from '@nestjs/jwt'


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request=context.switchToHttp().getRequest()
    // recibir por headers el token
    const token = request.headers.authorization?.split(' ')[1]; //bearer xxxxx

//revisamos si hay token
  if(!token) throw new UnauthorizedException('token required')

  try{
    //validar token
    const decoded = this.jwtService.verify(token);
    request.user = decoded
const secret=process.env.JWT_SECRET
const pyload= this.jwtService.verify(token,{secret})

pyload.exp=new Date(pyload.exp*1000)
pyload.iat=new Date(pyload.iat*1000)

if(pyload.isAdmin){
  pyload.roles=['admin']
}
else{
  pyload.roles=['user']
}

request.pyload=pyload


return true

  }
  catch(error){
throw new UnauthorizedException('invalid token ')
  }



   
  }
}
