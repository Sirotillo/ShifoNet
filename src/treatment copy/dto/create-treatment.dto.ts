import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  Max,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
  @ApiProperty({
    description: "Mashina nomi",
    example: "Model S",
    type: String,
  })
  @IsString({ message: "Nom matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Nom bo‘sh bo‘lmasligi kerak" })
  name: string;

  @ApiProperty({
    description: "Mashina narxi",
    example: 75000,
    type: Number,
  })
  @IsNumber({}, { message: "Narx raqam bo‘lishi kerak" })
  @IsPositive({ message: "Narx musbat bo‘lishi kerak" })
  @Min(1, { message: "Narx kamida 1 bo‘lishi kerak" })
  @Max(1000000000, { message: "Narx juda katta bo‘lishi mumkin emas" })
  price: number;

  @ApiProperty({
    description: "Mashina brendi",
    example: "Tesla",
    type: String,
  })
  @IsString({ message: "Brend matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Brend bo‘sh bo‘lmasligi kerak" })
  brand: string;

  @ApiProperty({
    description: "Mashina rangi",
    example: "Red",
    type: String,
  })
  @IsString({ message: "Rang matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Rang bo‘sh bo‘lmasligi kerak" })
  color: string;

  @ApiProperty({
    description: "Mashina chiqarilgan sana (YYYY-MM-DD)",
    example: "2025-05-12",
    type: String,
  })
  @IsString({ message: "Chiqarilgan sana matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Chiqarilgan sana bo‘sh bo‘lmasligi kerak" })
  releaseDate: string;

  @ApiProperty({
    description: "Mashina quvvati (ot kuchi)",
    example: 670,
    type: Number,
  })
  @IsNumber({}, { message: "Quvvat raqam bo‘lishi kerak" })
  @IsPositive({ message: "Quvvat musbat bo‘lishi kerak" })
  @Min(1, { message: "Quvvat kamida 1 bo‘lishi kerak" })
  @Max(2000, { message: "Quvvat juda katta bo‘lishi mumkin emas" })
  power: number;
}
