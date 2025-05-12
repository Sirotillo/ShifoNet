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
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Payment } from "./Models/payment.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @ApiOperation({ summary: "Yangi to‘lov yaratish" })
  @ApiResponse({
    status: 201,
    description: "To‘lov muvaffaqiyatli yaratildi",
    type: Payment,
  })
  @ApiResponse({ status: 400, description: "Xato so‘rov (Bad Request)" })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  @ApiOperation({ summary: "Barcha to‘lovlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha to‘lovlar ro‘yxati",
    type: [Payment],
  })
  @ApiResponse({ status: 400, description: "Xato so‘rov (Bad Request)" })
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(JwtAuthGuard, JwtSelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha to‘lovni olish" })
  @ApiResponse({ status: 200, description: "To‘lov topildi", type: Payment })
  @ApiResponse({ status: 404, description: "To‘lov topilmadi" })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, JwtSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha to‘lovni yangilash" })
  @ApiResponse({
    status: 200,
    description: "To‘lov muvaffaqiyatli yangilandi",
    type: Payment,
  })
  @ApiResponse({ status: 404, description: "To‘lov topilmadi" })
  @ApiResponse({ status: 400, description: "Xato so‘rov (Bad Request)" })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha to‘lovni o‘chirish" })
  @ApiResponse({ status: 200, description: "To‘lov muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "To‘lov topilmadi" })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
