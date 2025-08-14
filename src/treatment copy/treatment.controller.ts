import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CarService } from "./treatment.service";
import { CreateCarDto } from "./dto/create-treatment.dto";
import { UpdateCarDto } from "./dto/update-treatment.dto";

@ApiTags("Car")
@Controller("car")
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({ summary: "Create a new car" })
  @ApiResponse({
    status: 201,
    description: "The car has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all cars" })
  @ApiResponse({
    status: 200,
    description: "All cars retrieved successfully.",
  })
  findAll() {
    return this.carService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a car by id" })
  @ApiResponse({
    status: 200,
    description: "Car retrieved successfully.",
  })
  @ApiResponse({ status: 404, description: "Car not found" })
  findOne(@Param("id") id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a car by id" })
  @ApiResponse({
    status: 200,
    description: "The car has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Car not found" })
  update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a car by id" })
  @ApiResponse({
    status: 200,
    description: "The car has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Car not found" })
  remove(@Param("id") id: string) {
    return this.carService.remove(+id);
  }
}
