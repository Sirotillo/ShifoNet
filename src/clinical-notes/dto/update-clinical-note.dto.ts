import { PartialType } from '@nestjs/swagger';
import { CreateClinicalNoteDto } from './create-clinical-note.dto';

export class UpdateClinicalNoteDto extends PartialType(CreateClinicalNoteDto) {}
