import { Module } from "@nestjs/common";
import { TreatmentService } from "./treatment.service";
import { TreatmentController } from "./treatment.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Treatment } from "./Models/treatment.model";

@Module({
  imports: [SequelizeModule.forFeature([Treatment])],
  controllers: [TreatmentController],
  providers: [TreatmentService],
})
export class TreatmentModule {}
