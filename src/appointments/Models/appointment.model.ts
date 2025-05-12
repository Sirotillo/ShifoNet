import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/Models/patient.model";
import { Doctor } from "../../doctors/Models/doctor.model";

interface IAppoinmentCreationAttr {
  patientId: number;
  doctorId: number;
  acceptance_date: Date;
  status: string;
}

@Table({ tableName: "appointment" })
export class Appointment extends Model<Appointment, IAppoinmentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  patientId: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  doctorId: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @Column({
    type: DataType.DATE,
  })
  declare acceptance_date: Date;

  @Column({
    type: DataType.ENUM("pending", "accepted", "cancelled"),
  })
  declare status: string;
}
