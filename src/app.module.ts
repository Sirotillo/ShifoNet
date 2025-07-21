import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { PatientsModule } from "./patients/patients.module";
import { Patient } from "./patients/Models/patient.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { PaymentsModule } from "./payments/payments.module";
import { Payment } from "./payments/Models/payment.model";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/Models/admin.model";
import { TreatmentModule } from "./treatment/treatment.module";
import { Treatment } from "./treatment/Models/treatment.model";
import { StaffModule } from "./staff/staff.module";
import { Staff } from "./staff/Models/staff.model";
import { DepartmentModule } from "./department/department.module";
import { Department } from "./department/Models/department.model";
import { ClinicalNotesModule } from "./clinical-notes/clinical-notes.module";
import { ClinicalNote } from "./clinical-notes/Models/clinical-note.model";
import { AppointmentsModule } from "./appointments/appointments.module";
import { Appointment } from "./appointments/Models/appointment.model";
import { DoctorsModule } from "./doctors/doctors.module";
import { Doctor } from "./doctors/Models/doctor.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      uri: process.env.DATABASE_URL,
      models: [
        Patient,
        Payment,
        Admin,
        Treatment,
        Staff,
        Department,
        ClinicalNote,
        Appointment,
        Doctor,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    PatientsModule,
    AuthModule,
    MailModule,
    PaymentsModule,
    AdminModule,
    TreatmentModule,
    StaffModule,
    DepartmentModule,
    ClinicalNotesModule,
    AppointmentsModule,
    DoctorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
