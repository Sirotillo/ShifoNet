import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsIn,
  Matches,
  MinLength,
  isEmail,
  IsEmail,
} from "class-validator";

export class CreatePatientDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Bemorning to‘liq ismi",
    required: true,
    type: String,
  })
  @IsString({ message: "To'liq ism satr bo'lishi kerak" })
  @IsNotEmpty({ message: "To'liq ism kiritilishi shart" })
  full_name: string;

  @ApiProperty({
    example: "2005-05-01",
    description: "Tug‘ilgan sana (ISO formatda)",
    required: true,
    type: String,
    format: "date-time",
  })
  @IsDateString({}, { message: "Tug'ilgan sana noto'g'ri formatda" })
  @IsNotEmpty({ message: "Tug'ilgan sana kiritilishi shart" })
  birth_date: Date;

  @ApiProperty({
    example: "male",
    enum: ["male", "female"],
    description: "Bemorning jinsi",
    required: true,
    type: String,
  })
  @IsIn(["male", "female"], {
    message: "Jins 'male' yoki 'female' bo'lishi kerak",
  })
  @IsNotEmpty({ message: "Jins kiritilishi shart" })
  gender: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqami (+998 formatda)",
    required: true,
    type: String,
    pattern: "^\\+?[0-9\\s()-]{7,}$",
  })
  @Matches(/^\+?[0-9\s()-]{7,}$/, {
    message: "Telefon raqami noto'g'ri formatda. Misol: +998901234567",
  })
  @IsNotEmpty({ message: "Telefon raqami kiritilishi shart" })
  phone_number: string;

  @ApiProperty({
    example: "active",
    enum: ["active", "completed"],
    description: "Davolanish holati",
    required: true,
    type: String,
  })
  @IsIn(["active", "completed"], {
    message: "Davolash holati 'active' yoki 'completed' bo'lishi kerak",
  })
  @IsNotEmpty({ message: "Davolash holati kiritilishi shart" })
  treatment_status: string;

  @ApiProperty({
    example: "mySecret123",
    description: "Bemor uchun parol (kamida 6 ta belgi)",
    required: true,
    minLength: 6,
    type: String,
  })
  @IsString({ message: "Parol satr bo'lishi kerak" })
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
  @IsNotEmpty({ message: "Parol kiritilishi shart" })
  password: string;

  @ApiProperty({
    example: "Toshkent shahri, Chilonzor 17-kvartal",
    description: "Bemor yashaydigan manzil",
    required: true,
    type: String,
  })
  @IsString({ message: "Manzil satr bo'lishi kerak" })
  @IsNotEmpty({ message: "Manzil kiritilishi shart" })
  address: string;

  @ApiProperty({
    example: "user@example.com",
    description: "Bemorning elektron pochtasi",
    required: true,
    type: String,
  })
  @IsEmail({}, { message: "Togri email kiriting" })
  @IsNotEmpty({ message: "Email kiritilishi shart" })
  email: string;
}
