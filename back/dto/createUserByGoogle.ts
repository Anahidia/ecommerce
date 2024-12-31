import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoogleUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'google-id-12345', description: 'ID único de Google' })
  @IsString()
  @IsNotEmpty()
  googleId: string;
}
