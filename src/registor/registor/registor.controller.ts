import { Controller, Get, Post } from '@nestjs/common';
import { RegistorService } from './registor.service';

@Controller('registor')
export class RegistorController {
  constructor(private readonly registryService: RegistorService) {}

  @Post('/credentials/status/revocation')
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

  @Get('/test')
  playGround() {
    try {
      const buffer = Buffer.from([1, 0, 3, 4, 5, 6, 8, 0]);
      const valueToFind = 5;
      const index = buffer.indexOf(valueToFind); //return -1 is not found
      if (index === -1) {
        console.log('-1');
      }
      return index;
    } catch (error) {
      throw new Error(error);
    }
  }
}
