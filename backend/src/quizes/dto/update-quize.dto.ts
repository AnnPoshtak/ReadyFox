import { PartialType } from '@nestjs/swagger';
import { CreateQuizeDto } from './create-quize.dto';

export class UpdateQuizeDto extends PartialType(CreateQuizeDto) {}