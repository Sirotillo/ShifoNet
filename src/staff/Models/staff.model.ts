import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Department } from "../../department/Models/department.model";

interface IStaffCreationAttr {
  full_name: string;
  position: string;
  departmentId: number;
  phone_number: string;
  employment_date: Date;
  password: string;
}

@Table({ tableName: "staff" })
export class Staff extends Model<Staff, IStaffCreationAttr> {
  @ApiProperty({ example: 1, description: "Staff ID raqami" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "Ali Valiyev", description: "To‘liq ism" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({ example: "bugalter", description: "Lavozim" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare position: string;

  @ForeignKey(() => Department)
  @ApiProperty({ example: 3, description: "Bo‘lim ID" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare departmentId: number;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare phone_number: string;

  @ApiProperty({ example: "2025-01-01", description: "Ishga kirgan sana" })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare employment_date: Date;

  @ApiProperty({ example: "parol123", description: "Parol" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({
    example: "refresh-token-abc123",
    description: "Refresh token",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string;
}
