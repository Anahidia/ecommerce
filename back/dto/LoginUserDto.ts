import { Matches,MinLength,IsEmail,MaxLength} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto{

  @ApiProperty({ example: 'juan@example.com' })
    @IsEmail()
    email:string
    @ApiProperty({ example: 'Password123!' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        { message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*' }
      )
      @MinLength(8)
      @MaxLength(15)
    password:string
}