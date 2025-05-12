import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { Staff } from "./Models/staff.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff)
    private staff: typeof Staff
  ) {}

  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const { password } = createStaffDto;

    const hashed_password = await bcrypt.hash(password, 7);
    const newStaff = await this.staff.create({
      ...createStaffDto,
      password: hashed_password,
    });

    return newStaff;
  }

  async findAll(): Promise<Staff[]> {
    return this.staff.findAll();
  }

  async findOne(id: number): Promise<Staff | null> {
    return this.staff.findOne({ where: { id } });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto): Promise<[number]> {
    return this.staff.update(updateStaffDto, { where: { id } });
  }

  async remove(id: number): Promise<number> {
    return this.staff.destroy({ where: { id } });
  }

  async findStaffByPhone(phone_number: string) {
    return this.staff.findOne({ where: { phone_number } });
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedPatient = await this.staff.update(
      { refresh_token },
      {
        where: { id },
      }
    );
  }
}
