import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateClinicalNoteDto } from "./dto/create-clinical-note.dto";
import { UpdateClinicalNoteDto } from "./dto/update-clinical-note.dto";
import { ClinicalNote } from "./Models/clinical-note.model";

@Injectable()
export class ClinicalNotesService {
  constructor(
    @InjectModel(ClinicalNote) private clinicalNoteModel: typeof ClinicalNote
  ) {}

  async create(createClinicalNoteDto: CreateClinicalNoteDto) {
    const newClinicalNote = await this.clinicalNoteModel.create(
      createClinicalNoteDto
    );
    return newClinicalNote;
  }

  async findAll() {
    return this.clinicalNoteModel.findAll();
  }

  async findOne(id: number) {
    const clinicalNote = await this.clinicalNoteModel.findByPk(id);
    if (!clinicalNote) {
      throw new NotFoundException(`Clinical note with ID=${id} not found`);
    }
    return clinicalNote;
  }

  async update(id: number, updateClinicalNoteDto: UpdateClinicalNoteDto) {
    const clinicalNote = await this.clinicalNoteModel.findByPk(id);
    if (!clinicalNote) {
      throw new NotFoundException(`Clinical note with ID=${id} not found`);
    }
    return await clinicalNote.update(updateClinicalNoteDto);
  }

  async remove(id: number) {
    const clinicalNote = await this.clinicalNoteModel.findByPk(id);
    if (!clinicalNote) {
      throw new NotFoundException(`Clinical note with ID=${id} not found`);
    }
    await clinicalNote.destroy();
    return { message: "Clinical note deleted successfully" };
  }
}
