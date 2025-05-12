import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
  IsNumber,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStaffDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'To‘liq ism' })
  @IsString({ message: 'To‘liq ism matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'To‘liq ism bo‘sh bo‘lmasligi kerak' })
  full_name: string;

  @ApiProperty({ example: 'Boshqaruvchi', description: 'Lavozim' })
  @IsString({ message: 'Lavozim matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Lavozim bo‘sh bo‘lmasligi kerak' })
  position: string;

  @ApiProperty({ example: 3, description: 'Bo‘lim ID raqami' })
  @IsNumber({}, { message: 'Bo‘lim ID raqam bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Bo‘lim ID bo‘sh bo‘lmasligi kerak' })
  departmentId: number;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsPhoneNumber('UZ', { message: 'Telefon raqam noto‘g‘ri' })
  phone_number: string;

  @ApiProperty({ example: '2025-01-01', description: 'Ishga kirgan sana (YYYY-MM-DD)' })
  @IsDateString({}, { message: 'Ishga kirgan sana noto‘g‘ri formatda' })
  employment_date: Date;

  @ApiProperty({ example: 'parol123', description: 'Parol (kamida 6 ta belgi)' })
  @IsString({ message: 'Parol matn bo‘lishi kerak' })
  @MinLength(6, { message: 'Parol kamida 6 belgidan iborat bo‘lishi kerak' })
  password: string;
}
