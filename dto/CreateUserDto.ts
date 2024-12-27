
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsInt, IsString, IsOptional, Validate } from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Perez' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({ example: 'juan@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    { message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*' }
  )
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @ApiProperty({ example: 'Password123!' })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({ example: '123 Main St', required: false })
  @MinLength(3)
  @MaxLength(80)
  @IsString()
  address?: string;

  @ApiProperty({ example: 1234567890 })
  @IsInt()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({ example: 'Argentina', required: false })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string;

  @ApiProperty({ example: 'Concordia', required: false })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isAdmin?: boolean;

  // Campo para Google
  @ApiProperty({ example: 'google-unique-id', required: false })
  @IsOptional()
  googleId?: string; // Este campo será opcional para usuarios que se registren con Google
}
