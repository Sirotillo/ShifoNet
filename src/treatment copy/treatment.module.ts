import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Car } from "./Models/car.model";
import { CarController } from "./treatment.controller";
import { CarService } from "./treatment.service";

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
