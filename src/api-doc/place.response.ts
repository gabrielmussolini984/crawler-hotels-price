import { ApiProperty } from '@nestjs/swagger';

export class PlaceResponse {
  @ApiProperty()
  price: string;
  @ApiProperty()
  images: string[];
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}
