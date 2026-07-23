import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ 
    example: 'test@gmail.com', 
    description: "User's email"
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ 
    example: '123456', 
    description: 'User`s password' 
  })

  @IsString()
  @IsNotEmpty()
  password!: string;
}