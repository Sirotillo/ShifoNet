import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./Models/payment.model";

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentModel.create(createPaymentDto);
    return {
      message: "To‘lov muvaffaqiyatli yaratildi",
      payment,
    };
  }

  async findAll() {
    return await this.paymentModel.findAll();
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`To‘lov ID=${id} topilmadi`);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`To‘lov ID=${id} topilmadi`);
    }
    await payment.update(updatePaymentDto);
    return {
      message: "To‘lov yangilandi",
      payment,
    };
  }

  async remove(id: number) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`To‘lov ID=${id} topilmadi`);
    }
    await payment.destroy();
    return { message: "To‘lov o‘chirildi" };
  }
}
