import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ClinicalNote } from "../../clinical-notes/Models/clinical-note.model";

interface ITreatmentCreationAttr {
  name: string;
  description: string;
  price: number;
}

@Table({ tableName: "treatment" })
export class Treatment extends Model<Treatment, ITreatmentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({
    description: "Unique identifier of the treatment",
    example: 1,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    description: "Name of the treatment",
    example: "Physiotherapy",
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    description: "Description of the treatment",
    example: "A therapy that restores movement and function",
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ApiProperty({
    description: "Price of the treatment",
    example: 100,
  })
  declare price: number;
  @HasMany(() => ClinicalNote)
  clinicalNotes: ClinicalNote[];
}
