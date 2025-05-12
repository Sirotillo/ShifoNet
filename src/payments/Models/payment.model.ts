import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from "sequelize-typescript";
  import { Patient } from "../../patients/Models/patient.model";
  import { ApiProperty } from "@nestjs/swagger";
  
  interface IPaymentCreationAttr {
    patientId: number;
    quantity: number;
    payment_date: Date;
    method: string;
    status: string;
  }
  
  @Table({ tableName: "payments" })
  export class Payment extends Model<Payment, IPaymentCreationAttr> {
    @ApiProperty({
      description: 'Unique identifier for the payment record.',
      example: 1,
    })
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    declare id: number;
  
    @ApiProperty({
      description: 'The quantity of items in the payment.',
      example: 2,
    })
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare quantity: number;
  
    @ApiProperty({
      description: 'The date of payment in ISO format (YYYY-MM-DD).',
      example: '2025-05-08',
    })
    @Column({
      type: DataType.DATE,
    })
    declare payment_date: Date;
  
    @ApiProperty({
      description: 'The method used for payment.',
      example: 'cash',
      enum: ['cash', 'card', 'click', 'payme'],
    })
    @Column({
      type: DataType.ENUM("cash", "card", "click", "payme"),
    })
    declare method: string;
  
    @ApiProperty({
      description: 'The status of the payment.',
      example: 'paid',
      enum: ['pending', 'paid', 'failed'],
    })
    @Column({
      type: DataType.ENUM("pending", "paid", "failed"),
    })
    declare status: string;
  
    @ApiProperty({
      description: 'The patient’s ID who made the payment.',
      example: 123,
    })
    @ForeignKey(() => Patient)
    @Column({ type: DataType.INTEGER })
    patientId: number;
  }
  