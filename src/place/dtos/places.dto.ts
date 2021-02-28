import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class PlacesDTO {
  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  checkIn: Date;

  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  checkOut: Date;
}
