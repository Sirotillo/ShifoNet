import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTreatmentDto } from "./dto/create-treatment.dto";
import { UpdateTreatmentDto } from "./dto/update-treatment.dto";
import { Treatment } from "./Models/treatment.model";

@Injectable()
export class TreatmentService {
  constructor(
    @InjectModel(Treatment) private treatmentModel: typeof Treatment
  ) {}

  async create(createTreatmentDto: CreateTreatmentDto) {
    const newTreatment = await this.treatmentModel.create(createTreatmentDto);
    return newTreatment;
  }

  async findAll() {
    return this.treatmentModel.findAll();
  }

  async findOne(id: number) {
    const treatment = await this.treatmentModel.findByPk(id);
    if (!treatment) {
      throw new NotFoundException(`ID=${id} davolash topilmadi`);
    }
    return treatment;
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    const treatment = await this.treatmentModel.findByPk(id);
    if (!treatment) {
      throw new NotFoundException(`ID=${id} davolash topilmadi`);
    }
    return await treatment.update(updateTreatmentDto);
  }

  async remove(id: number) {
    const treatment = await this.treatmentModel.findByPk(id);
    if (!treatment) {
      throw new NotFoundException(`ID=${id} davolash topilmadi`);
    }
    await treatment.destroy();
    return { message: "Davolash o‘chirildi" };
  }
}
