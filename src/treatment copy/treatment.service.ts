import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";import { Car } from "./Models/car.model";
import { CreateCarDto } from "./dto/create-treatment.dto";
import { UpdateCarDto } from "./dto/update-treatment.dto";
;

@Injectable()
export class CarService {
  constructor(@InjectModel(Car) private carModel: typeof Car) {}

  async create(createCarDto: CreateCarDto) {
    const newCar = await this.carModel.create(createCarDto);
    return newCar;
  }

  async findAll() {
    return this.carModel.findAll();
  }

  async findOne(id: number) {
    const car = await this.carModel.findByPk(id);
    if (!car) {
      throw new NotFoundException(`ID=${id} mashina topilmadi`);
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carModel.findByPk(id);
    if (!car) {
      throw new NotFoundException(`ID=${id} mashina topilmadi`);
    }
    return await car.update(updateCarDto);
  }

  async remove(id: number) {
    const car = await this.carModel.findByPk(id);
    if (!car) {
      throw new NotFoundException(`ID=${id} mashina topilmadi`);
    }
    await car.destroy();
    return { message: "Mashina o‘chirildi" };
  }
}
