import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Patient } from "../patients/Models/patient.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(patient: Patient) {
    const url = `${process.env.API_HOST}/api/patients/activate/${patient.activate_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: patient.email,
      subject: "Welcome to ShifoNet",
      template: "./confirmation",
      context: {
        full_name: patient.full_name,
        url,
      },
    });
  }
}
