import { Controller, Get, Post } from '@nestjs/common';
import { RegistorService } from './registor.service';

@Controller('registor')
export class RegistorController {
  constructor(private readonly registryService: RegistorService) {}

  @Get('/credentials/status/revocation')
  async testRegistry() {
    try {
      const revocationStatus = await this.registryService.testRevocation();
      return revocationStatus;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Get('/credentials/status/suspension')
  async testRegistry_suspension() {
    try {
      const revocationStatus = await this.registryService.testRevocation();
      return revocationStatus;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Get('/credentials/status/message')
  message2() {
    try {
      const hexList = this.registryService.binaryToHexByte(); //mock
      const jwt = this.registryService.messageRegistry_new(hexList);
      return jwt;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/binaryToHex')
  binaryToHex() {
    try {
      const data = this.registryService.binaryToHexByte(); //mock
      return data;
    } catch (error) {
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
