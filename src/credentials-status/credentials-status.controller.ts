import { Body, Controller, Get, Post } from '@nestjs/common';
import { CredentialsStatusService } from './credentials-status.service';
import { Bitstring } from '@digitalcredentials/bitstring';
import { log } from 'console';
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
      type: ['VerifiableCredential', 'StatusList2021Credential'],
      issuer: 'did:example:12345',
      validFrom: '2021-04-05T14:27:40Z',
      credentialSubject: {
        id: 'https://example.com/status/3#list',
        type: 'StatusList2021',
        statusPurpose: 'revocation',
        encodedList: encodedList,
      },
    };
    console.log('Status List Credential:', Status_List_Credential);

    console.log('Encoded List:', encodedList);

    const jwt = this.credentialsStatusService.jwtEncode(Status_List_Credential);

    console.log(jwt);

    return jwt;
  }

  @Post('/decrypt-encodedList')
  async decryptEncodedList(@Body() body: { encodedList: string }) {
    const { encodedList } = body;
    const decodeBits = await Bitstring.decodeBits({ encoded: encodedList });
    console.log('Decoded Bitstring:', decodeBits);

    const bs = new Bitstring({
      buffer: decodeBits,
    });

    console.log(bs);
    console.log(bs.get(1));
    console.log(bs.get(8));
    // Decrypt the encoded list here
    // For now, it just returns the encoded list
    return encodedList;
  }
}
