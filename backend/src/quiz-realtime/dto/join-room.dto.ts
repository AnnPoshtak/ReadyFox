import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class JoinRoomDto {
  @IsString({ message: 'pin має бути рядком' })
  @Length(6, 6, { message: 'PIN-код повинен складатися рівно з 6 символів' })
  @Matches(/^\d+$/, { message: 'PIN-код має містити лише цифри' })
  @IsNotEmpty({ message: 'pin є обов’язковим полем' })
  pin: string;

  @IsString({ message: 'Нікнейм має бути рядком' })
  @Length(2, 20, { message: 'Нікнейм має бути від 2 до 20 символів' })
  @IsNotEmpty({ message: 'Нікнейм є обов’язковим полем' })
  nickname: string;
}