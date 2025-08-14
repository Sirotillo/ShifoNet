import { PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-treatment.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}
