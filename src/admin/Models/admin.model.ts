import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    description: "Adminning unikal identifikatori",
    example: 1,
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    description: "Adminning to‘liq ismi",
    example: "John Doe",
  })
  @Column({
    type: DataType.STRING,
  })
  declare full_name: string;

  @ApiProperty({
    description: "Adminning telefon raqami",
    example: "+998901234567",
  })
  @Column({
    type: DataType.STRING(15),
  })
  declare phone_number: string;

  @ApiProperty({
    description: "Adminning email manzili",
    example: "admin@example.com",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @ApiProperty({
    description: "Adminning paroli",
    example: "strongPassword123",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    description:
      "Adminning roli (faqat 'admin' yoki 'superadmin' bo‘lishi mumkin)",
    example: "admin",
  })
  @Column({
    type: DataType.ENUM("admin", "superadmin"),
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;
}
