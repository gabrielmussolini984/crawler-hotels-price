import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlaceModule } from './place/place.module';
@Module({
  imports: [ConfigModule.forRoot(), PlaceModule],
})
export class AppModule {}
