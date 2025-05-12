import { Module } from "@nestjs/common";
import { AuthPatientService } from "./patients/auth-patient.service";
import { AuthPatientController } from "./patients/auth-patient.controller";
import { JwtModule } from "@nestjs/jwt";
import { PatientsModule } from "../patients/patients.module";
import { AdminModule } from "../admin/admin.module";
import { AuthAdminController } from "./admins/auth-admin.controller";
import { AuthAdminService } from "./admins/auth-admin.service";
import { StaffModule } from "../staff/staff.module";
import { StaffController } from "../staff/staff.controller";
import { StaffService } from "../staff/staff.service";
import { AuthStaffService } from "./staff/auth-staff.service";
import { AuthStaffController } from "./staff/auth-staff.controller";
import { DoctorsModule } from "../doctors/doctors.module";
import { AuthDoctorController } from "./doctors/auth-doctor.controller";
import { AuthDoctorService } from "./doctors/auth-doctor.service";

@Module({
  imports: [
    JwtModule.register({}),
    PatientsModule,
    AdminModule,
    StaffModule,
    DoctorsModule,
  ],
  controllers: [
    AuthPatientController,
    AuthAdminController,
    AuthStaffController,
    AuthDoctorController,
  ],
  providers: [
    AuthPatientService,
    AuthAdminService,
    AuthStaffService,
    AuthDoctorService,
  ],
})
export class AuthModule {}
