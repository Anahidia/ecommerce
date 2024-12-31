import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'dto/LoginUserDto';
import { CreateUserDto } from 'dto/CreateUserDto';
import { ApiOperation, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginGoogleUserDto } from 'dto/loginGoogleDto';
import { CreateGoogleUserDto } from 'dto/createUserByGoogle';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registrar un nuevo usuario (email y password)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUpWithEmail(user);
  }

  @Post('signup/google')
  @ApiOperation({ summary: 'Registrar un nuevo usuario con Google' })
  @ApiBody({ type: CreateGoogleUserDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente con Google' })
  async signUpWithGoogle(@Body() user: CreateGoogleUserDto) {
    return await this.authService.signUpWithGoogle(user);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión con email y password' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  async signInWithEmail(@Body() loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    return await this.authService.signInWithEmail(email, password);
  }

  @Post('signin/google')
  @ApiOperation({ summary: 'Iniciar sesión con Google' })
  @ApiBody({ type: LoginGoogleUserDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso con Google' })
  async signInWithGoogle(@Body() loginGoogleDto: LoginGoogleUserDto) {
    const { email, googleId } = loginGoogleDto;
    return await this.authService.signInWithGoogle(email, googleId);
  }
}