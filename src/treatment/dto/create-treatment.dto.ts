import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsPositive,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTreatmentDto {
  @ApiProperty({
    description: "Davolash nomi",
    example: "Tish davolash",
    type: String,
  })
  @IsString({ message: "Ism matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Ism bo‘sh bo‘lmasligi kerak" })
  name: string;

  @ApiProperty({
    description: "Davolash tavsifi",
    example: "Tishlarni tozalash va davolash xizmatlari.",
    type: String,
  })
  @IsString({ message: "Tavsif matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Tavsif bo‘sh bo‘lmasligi kerak" })
  description: string;

  @ApiProperty({
    description: "Davolash narxi",
    example: 25000,
    type: Number,
  })
  @IsNumber({}, { message: "Narx raqam bo‘lishi kerak" })
  @IsPositive({ message: "Narx musbat raqam bo‘lishi kerak" })
  @Min(1, { message: "Narx kamida 1 bo‘lishi kerak" })
  @Max(1000000, { message: "Narx juda katta bo‘lishi mumkin emas" })
  price: number;
}
