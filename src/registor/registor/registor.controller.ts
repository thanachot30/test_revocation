import { Controller, Get } from '@nestjs/common';
import { RegistorService } from './registor.service';

@Controller('registor')
export class RegistorController {
  constructor(private readonly registryService: RegistorService) {}

  @Get('/credentials/status/revocation')
  async testRegistry() {
    try {
      //https://mydomain5000.loca.lt/api/registry/credentials/status
      const revocationStatus = await this.registryService.testRevocation();
      return revocationStatus;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
