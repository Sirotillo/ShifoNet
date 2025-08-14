import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface ICarCreationAttr {
  name: string;
  price: number;
  brand: string;
  color: string;
  releaseDate: string;
  power: number;
}

@Table({ tableName: "car" })
export class Car extends Model<Car, ICarCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({
    description: "Unique identifier of the car",
    example: 1,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    description: "Name of the car",
    example: "Tesla Model S",
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ApiProperty({
    description: "Price of the car",
    example: 75000,
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    description: "Brand of the car",
    example: "Tesla",
  })
  declare brand: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    description: "Color of the car",
    example: "Red",
  })
  declare color: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    description: "Release date of the car (YYYY-MM-DD)",
    example: "2025-05-12",
  })
  declare releaseDate: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ApiProperty({
    description: "Engine power in horsepower",
    example: 670,
  })
  declare power: number;
}
