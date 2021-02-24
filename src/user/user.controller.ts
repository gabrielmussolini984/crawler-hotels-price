import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponse } from 'src/api-doc/user.response';
import { UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/models/User';
import { Repository } from 'typeorm';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Get()
  async index(): Promise<User[]> {
    return this.userRepository.find();
  }

  @ApiOkResponse({ type: UserResponse })
  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  @ApiCreatedResponse({ type: UserResponse })
  @Post()
  async store(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: UserDTO,
  ): Promise<User> {
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: User): Promise<User> {
    await this.userRepository.findOneOrFail(id);
    await this.userRepository.update({ id: parseInt(id) }, body);
    return this.userRepository.findOneOrFail(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string) {
    await this.userRepository.findOneOrFail(id);
    return this.userRepository.delete(id);
  }
}
