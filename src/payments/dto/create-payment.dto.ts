import {
    IsInt,
    IsPositive,
    IsDateString,
    IsIn,
    IsString,
    IsNotEmpty,
  } from "class-validator";
  import { ApiProperty } from "@nestjs/swagger";
  
  export class CreatePaymentDto {
    @ApiProperty({
      description: 'The unique ID of the patient.',
      example: 123,
    })
    @IsInt({ message: "patientId butun son bo‘lishi kerak" })
    @IsPositive({ message: "patientId musbat bo‘lishi kerak" })
    patientId: number;
  
    @ApiProperty({
      description: 'The quantity of the payment item.',
      example: 2,
    })
    @IsInt({ message: "quantity butun son bolishi kerak" })
    @IsPositive({ message: "quantity musbat bo‘lishi kerak" })
    quantity: number;
  
    @ApiProperty({
      description: 'The date of the payment in ISO format (YYYY-MM-DD).',
      example: '2025-05-08',
    })
    @IsDateString({}, { message: "payment_date ISO formatda bo‘lishi kerak (YYYY-MM-DD)" })
    payment_date: Date;
  
    @ApiProperty({
      description: 'The method of payment.',
      example: 'cash',
      enum: ['cash', 'card', 'click', 'payme'],
    })
    @IsString({ message: "method matn bo‘lishi kerak" })
    @IsIn(["cash", "card", "click", "payme"], {
      message: "method faqat [cash, card, click, payme] bo‘lishi mumkin",
    })
    method: string;
  
    @ApiProperty({
      description: 'The status of the payment.',
      example: 'pending',
      enum: ['pending', 'paid', 'failed'],
    })
    @IsString({ message: "status matn bo‘lishi kerak" })
    @IsIn(["pending", "paid", "failed"], {
      message: "status faqat [pending, paid, failed] bo‘lishi mumkin",
    })
    status: string;
  }
  