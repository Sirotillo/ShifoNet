import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { JwtSuperAdminGuard } from "../common/guards/jwt-self-superadmin.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";

@ApiTags("Patients")
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: "Yangi bemor qo'shish" })
  @ApiResponse({ status: 201, description: "Bemor muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz ma'lumotlar" })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @UseGuards(JwtAuthGuard, JwtSuperAdminGuard)
  @ApiOperation({ summary: "Barcha bemorlarni olish" })
  @ApiResponse({ status: 200, description: "Bemorlar ro'yxati" })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @UseGuards(JwtAuthGuard, JwtSelfGuard)
  @ApiOperation({ summary: "ID bo'yicha bitta bemorni olish" })
  @ApiResponse({ status: 200, description: "Bemor topildi" })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, JwtSelfGuard)
  @ApiOperation({ summary: "ID bo'yicha bemorni yangilash" })
  @ApiResponse({ status: 200, description: "Bemor yangilandi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz ma'lumotlar" })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: "ID bo'yicha bemorni o'chirish" })
  @ApiResponse({ status: 200, description: "Bemor o'chirildi" })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }

  @ApiOperation({ summary: "Bemorni faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Bemor muvaffaqiyatli faollashtirildi",
  })
  @ApiResponse({ status: 404, description: "Bunday havola topilmadi" })
  @Get("activate/:link")
  activatePatient(@Param("link") link: string) {
    return this.patientsService.activatePatient(link);
  }

  @Get("activePatients")
  getActivePatients() {
    return this.patientsService.sortByActive();
  }
}
