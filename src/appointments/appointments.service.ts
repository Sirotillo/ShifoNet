import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { Appointment } from "./Models/appointment.model";

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment) private appointmentModel: typeof Appointment
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const newAppointment =
      await this.appointmentModel.create(createAppointmentDto);
    return newAppointment;
  }

  async findAll() {
    return this.appointmentModel.findAll();
  }

  async findOne(id: number) {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`ID=${id} appointment topilmadi`);
    }
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`ID=${id} appointment topilmadi`);
    }
    return await appointment.update(updateAppointmentDto);
  }

  async remove(id: number) {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`ID=${id} appointment topilmadi`);
    }
    await appointment.destroy();
    return { message: "Appointment o‘chirildi" };
  }
}
