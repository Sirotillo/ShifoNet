import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsInt, Length } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'Doktor to‘liq ismi' })
  @IsString()
  @Length(1, 80)
  full_name: string;

  @ApiProperty({ example: 'Kardiolog', description: 'Mutaxassislik' })
  @IsString()
  specialty: string;

  @ApiProperty({ example: 1, description: 'Bo‘lim ID raqami' })
  @IsInt()
  departmentId: number;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsString()
  @Length(7, 13)
  phone_number: string;

  @ApiProperty({ example: 'ali@example.com', description: 'Email manzili' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongpass123', description: 'Parol' })
  @IsString()
  password: string;
}
