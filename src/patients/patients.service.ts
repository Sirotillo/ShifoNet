import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { Patient } from "./Models/patient.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { v4 as UUIDV4 } from "uuid";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private patientModel: typeof Patient,
    private readonly mailService: MailService
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { password } = createPatientDto;

    const hashed_password = await bcrypt.hash(password, 7);
    const newPatient = await this.patientModel.create({
      ...createPatientDto,
      activate_link: UUIDV4(),
      password: hashed_password,
    });

    console.log(newPatient);
    try {
      await this.mailService.sendMail(newPatient);
    } catch (error) {
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    return newPatient;
  }

  async findAll() {
    return await this.patientModel.findAll();
  }

  async findOne(id: number) {
    const patient = await this.patientModel.findByPk(id);
    if (!patient) {
      throw new NotFoundException(`Bemor ID=${id} topilmadi`);
    }
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientModel.findByPk(id);
    if (!patient) {
      return { message: `Patient with ID ${id} not found` };
    }
    return await patient.update(updatePatientDto);
  }

  async remove(id: number) {
    const patient = await this.patientModel.findByPk(id);
    if (!patient) {
      return { message: `Patient with ID ${id} not found` };
    }
    await patient.destroy();
    return { message: "Patient deleted successfully" };
  }

  async findPatientByPhone(phone_number: string) {
    return this.patientModel.findOne({ where: { phone_number } });
  }

  async activatePatient(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const updatedPatient = await this.patientModel.update(
      { is_active: true },
      {
        where: {
          activate_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updatedPatient[1][0]) {
      throw new BadRequestException("Patient already activated");
    }

    return {
      message: "Patieant sucsefully",
      is_active: updatedPatient[1][0].is_active,
    };
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedPatient = await this.patientModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
  }

  async sortByActive() {
    try {
      const result = `SELECT * FROM patient WHERE is_active = true`;

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
