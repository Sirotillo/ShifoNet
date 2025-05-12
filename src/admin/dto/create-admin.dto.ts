import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: "Adminning to‘liq ismi",
    example: "John Doe",
  })
  @IsString({ message: "To‘liq ism matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Ism bo‘sh bo‘lmasligi kerak" })
  full_name: string;

  @ApiProperty({
    description: "Adminning telefon raqami (masalan, +9989xxxxxxxx)",
    example: "+998901234567",
  })
  @IsString({ message: "Telefon raqam matn bo‘lishi kerak" })
  @Matches(/^\+998\d{9}$/, {
    message:
      "Telefon raqam +998 bilan boshlanib, 13 belgidan iborat bo‘lishi kerak",
  })
  phone_number: string;

  @ApiProperty({
    description: "Adminning email manzili",
    example: "admin@example.com",
  })
  @IsEmail({}, { message: "Email noto‘g‘ri formatda" })
  email: string;

  @ApiProperty({
    description: "Adminning paroli (kamida 6 belgidan iborat)",
    example: "strongPassword123",
  })
  @IsString({ message: "Parol matn bo‘lishi kerak" })
  @MinLength(6, { message: "Parol kamida 6 belgidan iborat bo‘lishi kerak" })
  password: string;

  @ApiProperty({
    description: "Adminning roli (faqat 'admin' yoki 'superadmin' bo‘lishi mumkin)",
    example: "admin",
  })
  @IsString({ message: "Rol matn bo‘lishi kerak" })
  @IsIn(["admin", "superadmin"], {
    message: "Role faqat [admin, superadmin] bo‘lishi mumkin",
  })
  role: string;
}
