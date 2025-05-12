import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Department } from "../../department/Models/department.model";
import { ClinicalNote } from "../../clinical-notes/Models/clinical-note.model";
import { Appointment } from "../../appointments/Models/appointment.model";

interface IDoctorCreationAttr {
  full_name: string;
  specialty: string;
  departmentId: number;
  phone_number: string;
  email: string;
  password: string;
}

@Table({ tableName: "doctor" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @ApiProperty({ example: 1, description: "Doktor ID raqami" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Doktorning to‘liq ismi",
  })
  @Column({
    type: DataType.STRING(80),
  })
  declare full_name: string;

  @ApiProperty({
    example: "Nevrolog",
    description: "Doktorning mutaxassisligi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare specialty: string;

  @ApiProperty({
    example: 2,
    description: "Qaysi bo‘limga tegishli ekanligi (ID)",
  })
  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
  })
  declare departmentId: number;

  @BelongsTo(() => Department)
  department: Department;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @Column({
    type: DataType.STRING,
  })
  declare phone_number: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @ApiProperty({
    example: "strongpass123",
    description: "Foydalanuvchi paroli",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;

  @HasMany(() => ClinicalNote)
  clinicalNotes: ClinicalNote[];

  @HasMany(() => Appointment)
  appointments: Appointment[];
}
