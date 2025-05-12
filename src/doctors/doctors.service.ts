import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Doctor } from "./Models/doctor.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { password } = createDoctorDto;
    const hashed_password = await bcrypt.hash(password, 7);
    const newPatient = await this.doctorModel.create({
      ...createDoctorDto,
      password: hashed_password,
    });

    return newPatient;
  }

  async findAll() {
    return this.doctorModel.findAll();
  }

  async findOne(id: number) {
    const doctor = await this.doctorModel.findByPk(id);
    if (!doctor) {
      throw new NotFoundException(`ID=${id} doctor topilmadi`);
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.doctorModel.findByPk(id);
    if (!doctor) {
      throw new NotFoundException(`ID=${id} doctor topilmadi`);
    }
    return await doctor.update(updateDoctorDto);
  }

  async remove(id: number) {
    const doctor = await this.doctorModel.findByPk(id);
    if (!doctor) {
      throw new NotFoundException(`ID=${id} doctor topilmadi`);
    }
    await doctor.destroy();
    return { message: "Doctor o‘chirildi" };
  }

  async findDoctorByPhone(phone_number: string) {
    return this.doctorModel.findOne({ where: { phone_number } });
  }

  async updateRefreshTokenDoctor(id: number, refresh_token: string) {
    const updatedDoctor = await this.doctorModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
  }
}
