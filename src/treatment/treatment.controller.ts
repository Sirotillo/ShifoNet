import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TreatmentService } from "./treatment.service";
import { CreateTreatmentDto } from "./dto/create-treatment.dto";
import { UpdateTreatmentDto } from "./dto/update-treatment.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Treatment")
@Controller("treatment")
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Post()
  @ApiOperation({ summary: "Create a new treatment" })
  @ApiResponse({
    status: 201,
    description: "The treatment has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentService.create(createTreatmentDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all treatments" })
  @ApiResponse({
    status: 200,
    description: "All treatments retrieved successfully.",
  })
  findAll() {
    return this.treatmentService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a treatment by id" })
  @ApiResponse({
    status: 200,
    description: "Treatment retrieved successfully.",
  })
  @ApiResponse({ status: 404, description: "Treatment not found" })
  findOne(@Param("id") id: string) {
    return this.treatmentService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a treatment by id" })
  @ApiResponse({
    status: 200,
    description: "The treatment has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Treatment not found" })
  update(
    @Param("id") id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto
  ) {
    return this.treatmentService.update(+id, updateTreatmentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a treatment by id" })
  @ApiResponse({
    status: 200,
    description: "The treatment has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Treatment not found" })
  remove(@Param("id") id: string) {
    return this.treatmentService.remove(+id);
  }
}
