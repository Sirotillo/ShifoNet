import { Module } from "@nestjs/common";
import { DoctorsService } from "./doctors.service";
import { DoctorsController } from "./doctors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Doctor } from "./Models/doctor.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    SequelizeModule.forFeature([Doctor]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("ACCESS_TOKEN_KEY"),
        signOptions: { expiresIn: config.get<string>("ACCESS_TOKEN_TIME") },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
