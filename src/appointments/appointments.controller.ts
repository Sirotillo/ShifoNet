import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Appointment } from "./Models/appointment.model";

@ApiTags("Appointments")
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new appointment" })
  @ApiResponse({
    status: 201,
    description: "Appointment successfully created",
    type: Appointment,
  })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all appointments" })
  @ApiResponse({
    status: 200,
    description: "List of all appointments",
    type: [Appointment],
  })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get appointment by ID" })
  @ApiResponse({
    status: 200,
    description: "The appointment details",
    type: Appointment,
  })
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update appointment by ID" })
  @ApiResponse({
    status: 200,
    description: "Appointment successfully updated",
    type: Appointment,
  })
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete appointment by ID" })
  @ApiResponse({
    status: 200,
    description: "Appointment successfully deleted",
  })
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(+id);
  }
}
