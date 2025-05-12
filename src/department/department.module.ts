import { Module } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { DepartmentController } from "./department.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Department } from "./Models/department.model";

@Module({
  imports: [SequelizeModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
