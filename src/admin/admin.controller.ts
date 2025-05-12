import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./Models/admin.model";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli yaratildi",
    type: Admin,
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha adminlarni ko‘rish" })
  @ApiResponse({
    status: 200,
    description: "Barcha adminlar muvaffaqiyatli ko‘rildi",
    type: [Admin],
  })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Adminni ID orqali ko‘rish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli ko‘rildi",
    type: Admin,
  })
  @ApiResponse({
    status: 404,
    description: "Admin topilmadi",
  })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Adminni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli yangilandi",
    type: Admin,
  })
  @ApiResponse({
    status: 404,
    description: "Admin topilmadi",
  })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Adminni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Admin topilmadi",
  })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
