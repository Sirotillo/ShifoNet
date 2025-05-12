import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './Models/department.model';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department)
    private departmentModel: typeof Department,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentModel.create(createDepartmentDto);
    return department;
  }

  async findAll() {
    return this.departmentModel.findAll();
  }

  async findOne(id: number) {
    const department = await this.departmentModel.findByPk(id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.departmentModel.findByPk(id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department.update(updateDepartmentDto);
  }

  async remove(id: number) {
    const department = await this.departmentModel.findByPk(id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    await department.destroy();
    return { message: `Department with ID ${id} removed` };
  }
}
