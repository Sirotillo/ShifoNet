import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Doctor } from "../../doctors/Models/doctor.model";
import { Staff } from "../../staff/Models/staff.model";

interface IDepartmentCreationAttr {
  name: string;
  floor: number;
  chief_doctor_id: number;
}

@Table({ tableName: "department" })
export class Department extends Model<Department, IDepartmentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare floor: number;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
  })
  declare chief_doctor_id: number;

  @HasOne(() => Doctor)
  chief_doctor: Doctor;

  @HasMany(() => Staff)
  staff: Staff[];
}
