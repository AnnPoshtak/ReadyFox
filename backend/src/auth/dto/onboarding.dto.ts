import { IsString, IsNotEmpty } from 'class-validator';

export class OnboardingDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
}