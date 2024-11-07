import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistorController } from './registor/registor/registor.controller';
import { RegistorService } from './registor/registor/registor.service';

@Module({
  imports: [],
  controllers: [AppController, RegistorController],
  providers: [AppService, RegistorService],
})
export class AppModule {}
