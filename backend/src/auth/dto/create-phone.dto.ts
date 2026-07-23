import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreatePhoneDto {
  @ApiProperty({ 
    example: '+380123456789', 
    description: "User's phone number"
  })
  @IsString()
  @IsNotEmpty()
  phone!: string;
}