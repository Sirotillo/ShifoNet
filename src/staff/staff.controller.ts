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
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";
import { JwtSuperAdminGuard } from "../common/guards/jwt-self-superadmin.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Staff } from "./Models/staff.model";

@ApiTags("Staff")
@ApiBearerAuth()
@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @ApiOperation({ summary: "Yangi hodim qo‘shish" })
  @ApiResponse({ status: 201, type: Staff })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  @ApiOperation({ summary: "Barcha hodimlarni olish" })
  @ApiResponse({ status: 200, type: [Staff] })
  findAll() {
    return this.staffService.findAll();
  }

  @UseGuards(JwtAuthGuard, JwtSuperAdminGuard)
  @Get(":id")
  @ApiOperation({ summary: "Hodimni ID orqali topish" })
  @ApiResponse({ status: 200, type: Staff })
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, JwtSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Hodim ma’lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Hodim muvaffaqiyatli yangilandi" })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Hodimni o‘chirish" })
  @ApiResponse({ status: 200, description: "Hodim muvaffaqiyatli o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.staffService.remove(+id);
  }
}
