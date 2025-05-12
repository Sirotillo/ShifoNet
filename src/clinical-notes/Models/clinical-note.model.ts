import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/Models/patient.model";
import { Treatment } from "../../treatment/Models/treatment.model";
import { Doctor } from "../../doctors/Models/doctor.model";

interface IClinicalNoteCreationAttr {
  patientId: number;
  doctorId: number;
  treatmentId: number;
  diagnosis: string;
  treatment_date: Date;
  note: string;
}

@Table({ tableName: "clinicalNote" })
export class ClinicalNote extends Model<
  ClinicalNote,
  IClinicalNoteCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column
  patientId: number;

  @ForeignKey(() => Doctor)
  @Column
  doctorId: number;

  @ForeignKey(() => Treatment)
  @Column
  treatmentId: number;
  @Column({
    type: DataType.STRING,
  })
  declare diagnosis: string;

  @Column({
    type: DataType.DATE,
  })
  declare treatment_date: Date;

  @Column({
    type: DataType.STRING,
  })
  declare note: string;
}
