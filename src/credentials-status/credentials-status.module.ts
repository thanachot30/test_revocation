import { Module } from '@nestjs/common';
import { CredentialsStatusService } from './credentials-status.service';
import { CredentialsStatusController } from './credentials-status.controller';

@Module({
  controllers: [CredentialsStatusController],
  providers: [CredentialsStatusService],
})
export class CredentialsStatusModule {}
