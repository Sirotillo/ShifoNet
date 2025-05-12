import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";
import { Admin } from "./Models/admin.model";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, phone_number } = createAdminDto;

    const candidate = await this.adminModel.findOne({
      where: { phone_number },
    });
    if (candidate) {
      throw new BadRequestException(
        "Bu telefon raqam bilan admin allaqachon mavjud"
      );
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      password: hashed_password,
    });

    return newAdmin;
  }

  async findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`ID=${id} admin topilmadi`);
    }
    return admin;
  }

  async findAdminByPhone(phone_number: string) {
    return this.adminModel.findOne({ where: { phone_number } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`ID=${id} admin topilmadi`);
    }

    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 7);
    }

    return await admin.update(updateAdminDto);
  }

  async remove(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`ID=${id} admin topilmadi`);
    }

    await admin.destroy();
    return { message: "Admin o‘chirildi" };
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedPatient = await this.adminModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
  }
}
