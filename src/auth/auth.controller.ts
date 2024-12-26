import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'dto/LoginUserDto';
import { CreateUserDto } from 'dto/CreateUserDto';
import { ApiOperation, ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @ApiOperation({ summary: 'Verificar estado del servicio de autenticación' }) 
  @ApiResponse({ status: 200, description: 'Servicio de autenticación funcionando.' })
  
  getAuth(): string {
    return this.authService.getAuthService();
  }



  @Post('singup')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' }) 
  @ApiBody({ type: CreateUserDto }) 
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' }) 
  @ApiResponse({ status: 400, description: 'Datos inválidos para el registro.' }) 
 
 async signup(@Body()user:CreateUserDto){

    return await this.authService.signUpService(user)

  }

  @Post('singin')
  @ApiOperation({ summary: 'Iniciar sesión con usuario existente' }) 
  @ApiBody({ type: LoginUserDto }) 
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.', schema: { example: { token: 'jwt_token_example' } } }) 
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
 
  async singIn(@Body()credentials:LoginUserDto){
   const {email,password}=credentials

   return await this.authService.signInService(email,password)
  }
}
