import { Module } from "@nestjs/common";
import { ClinicalNotesService } from "./clinical-notes.service";
import { ClinicalNotesController } from "./clinical-notes.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClinicalNote } from "./Models/clinical-note.model";

@Module({
  imports: [SequelizeModule.forFeature([ClinicalNote])],
  controllers: [ClinicalNotesController],
  providers: [ClinicalNotesService],
})
export class ClinicalNotesModule {}
