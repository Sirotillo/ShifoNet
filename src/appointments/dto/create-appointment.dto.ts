import { IsInt, IsDateString, IsString, IsIn, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
  @ApiProperty({
    example: 1,
    description: "Patient ID (1 dan katta butun son bo‘lishi kerak)",
  })
  @IsInt({ message: "patientId butun son bo‘lishi kerak" })
  @Min(1, { message: "patientId 1 dan katta bo‘lishi kerak" })
  patientId: number;

  @ApiProperty({
    example: 2,
    description: "Doctor ID (1 dan katta butun son bo‘lishi kerak)",
  })
  @IsInt({ message: "doctorId butun son bo‘lishi kerak" })
  @Min(1, { message: "doctorId 1 dan katta bo‘lishi kerak" })
  doctorId: number;

  @ApiProperty({
    example: "2025-05-10T09:30:00Z",
    description: "Qabul qilish sanasi (ISO 8601 formatda)",
  })
  @IsDateString({}, { message: "acceptance_date noto‘g‘ri sana formatida" })
  acceptance_date: Date;

  @ApiProperty({
    example: "pending",
    description:
      "Status ('pending', 'accepted', yoki 'cancelled') bo‘lishi mumkin",
  })
  @IsString({ message: "status matn bo‘lishi kerak" })
  @IsIn(["pending", "accepted", "cancelled"], {
    message:
      "status faqat 'pending', 'accepted', yoki 'cancelled' bo‘lishi mumkin",
  })
  status: string;
}
