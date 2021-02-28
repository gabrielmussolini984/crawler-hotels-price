import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PlaceService } from './place.service';
import { PlaceResponse } from '../api-doc/place.response';
import { PlacesDTO } from './dtos/places.dto';
import { Response } from 'express';
@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @HttpCode(200)
  @ApiOkResponse({ type: PlaceResponse })
  @Post()
  store(
    @Res({ passthrough: true }) res: Response,
    @Body(
      new ValidationPipe({
        transform: true,
        errorHttpStatusCode: 422,
      }),
    )
    body: PlacesDTO,
  ):
    | Promise<
        {
          title: string;
          description: string;
          images: string[];
          price: string;
        }[]
      >
    | string {
    const response = this.placeService.getOfferts(body);
    return response;
  }
}
