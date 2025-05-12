export class CreateClinicalNoteDto {
  patientId: number;
  doctorId: number;
  treatmentId: number;
  diagnosis: string;
  treatment_date: Date;
  note: string;
}
