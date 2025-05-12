import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ClinicalNote } from "../../clinical-notes/Models/clinical-note.model";

interface IPatientCreationAttr {
  full_name: string;
  birth_date: Date;
  gender: string;
  phone_number: string;
  treatment_status: string;
  password: string;
  address: string;
  email: string;
  activate_link?: string;
}

@Table({ tableName: "patient", timestamps: true })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Avtomatik oshib boradigan asosiy kalit",
    type: Number,
    readOnly: true,
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "John Doe",
    description: "Bemorning to‘liq ismi",
    required: true,
    type: String,
    maxLength: 50,
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "2000-01-01T00:00:00.000Z",
    description: "Tug‘ilgan sana (ISO formatda)",
    required: true,
    type: String,
    format: "date-time",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare birth_date: Date;

  @ApiProperty({
    enum: ["male", "female"],
    example: "male",
    description: "Bemorning jinsi",
    required: true,
    type: String,
  })
  @Column({
    type: DataType.ENUM("male", "female"),
    allowNull: false,
  })
  declare gender: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqam (+998 formatda)",
    required: true,
    type: String,
    pattern: "^\\+998\\d{9}$",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\+998\d{9}$/,
    },
  })
  declare phone_number: string;

  @ApiProperty({
    enum: ["active", "completed"],
    example: "active",
    description: "Hozirgi davolanish holati",
    required: true,
    type: String,
  })
  @Column({
    type: DataType.ENUM("active", "completed"),
    allowNull: false,
  })
  declare treatment_status: string;

  @ApiProperty({
    example: "strongPassword123",
    description: "Bemor uchun parol",
    required: false,
    type: String,
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    example: "Toshkent, Yunusobod 5-1",
    description: "Bemorning yashash manzili",
    required: false,
    type: String,
  })
  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Faollashtirish uchun UUID havola",
    required: false,
    type: String,
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activate_link: string;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description:
      "Foydalanuvchini autentifikatsiyalash uchun refresh token (UUID formatda)",
    required: false,
    type: String,
  })
  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;

  @ApiProperty({
    example: true,
    description:
      "Foydalanuvchining faollik holati (true — faol, false — nofaol)",
    required: false,
    type: Boolean,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: "user@example.com",
    description: "Foydalanuvchining elektron pochtasi",
    required: true,
    type: String,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @HasMany(() => ClinicalNote)
  clinicalNotes: ClinicalNote[];
}
