import { Controller, Get } from '@nestjs/common';
import { CredentialsStatusService } from './credentials-status.service';

@Controller('credentials-status')
export class CredentialsStatusController {
  constructor(
    private readonly credentialsStatusService: CredentialsStatusService,
  ) {}

  @Get('/')
  getCredentialsStatus() {
    const encodedList = this.credentialsStatusService.createEncodedList();
    const Status_List_Credential = {
      '@context': ['https://www.w3.org/ns/credentials/v2'],
      id: 'https://example.com/credentials/status/3',
      type: ['VerifiableCredential', 'BitstringStatusListCredential'],
      issuer: 'did:example:12345',
      validFrom: '2024-10-25T15:52:58+07:00',
      credentialSubject: {
        id: 'https://example.com/status/3#list',
        type: 'BitstringStatusList',
        statusPurpose: 'revocation',
        encodedList: encodedList,
      },
    };
    console.log('Encoded List:', encodedList);

    const jwt = this.credentialsStatusService.jwtEncode(Status_List_Credential);

    return jwt;
  }
}
