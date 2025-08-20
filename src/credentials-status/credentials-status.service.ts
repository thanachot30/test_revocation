import { Injectable } from '@nestjs/common';

import { Bitstring } from '@digitalcredentials/bitstring';
import { gzipSync } from 'zlib';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class CredentialsStatusService {
  createEncodedList(): string {
    const bitstring = new Bitstring({ length: 131072 });

    bitstring.set(3, true);

    console.log('get 3:', bitstring.get(3)); // true

    console.log(bitstring, bitstring.bits);

    const compressedData = gzipSync(bitstring.bits);
    console.log('compressedData:', compressedData);

    const base64url = compressedData
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const encodedList = `u${base64url}`;
    return encodedList;
  }

  jwtEncode(vc_body: any) {
    try {
      const header = {
        alg: 'EdDSA',
        kid: 'did:key:z6MkjoRhq1jSNJdLiruSXrFFxagqrztZaXHqHGUTKJbcNywp#Vzx7l5fh56F3Pf9aR3DECU5BwfrY6ZJe05aiWYWzan8',
        typ: 'vc+json+jwt',
      };
      const payload = {
        exp: 1756885852,
        iat: 1725349852,
        iss: 'did:key:z6MkjoRhq1jSNJdLiruSXrFFxagqrztZaXHqHGUTKJbcNywp',

        vc: vc_body,
      };
      //   console.log(payload);
      const privateKey = 'your-private-key';
      //   console.log(payload, privateKey);

      const token = jwt.sign(payload, privateKey);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
}
