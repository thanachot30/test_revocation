import { Injectable } from '@nestjs/common';
import { ungzip } from 'node-gzip';
import { gzip, gzipSync } from 'zlib';
import * as jwt from 'jsonwebtoken';
// import base64url from 'base64url';
import * as base64 from 'base-64';
@Injectable()
export class RegistorService {
  async compressBitstring(data: Buffer) {
    try {
      const compressedData = gzipSync(data);
      return compressedData;
      // return await gzip(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  encodeBase64(data: Buffer) {
    try {
      //   return base64url.encode(data);
      //   var encoded = base64.encode(data);
      const _data = data.toString('base64');
      return _data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async uncompress(data: string) {
    try {
      console.log('data', data);

      return await ungzip(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  jwtEncode(_encodedList: string) {
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

        vc: {
          '@context': ['https://www.w3.org/ns/credentials/v2'],
          id: 'https://mydomain5000.loca.lt/api/registry/credentials/status/revocation',
          type: ['VerifiableCredential', 'BitStringStatusListCredential'],
          issuer: 'did:example:12345',
          validFrom: '2024-10-25T15:52:58+07:00',
          credentialSubject: {
            id: 'f709cf3b-ad03-4291-8675-5b01c9fd0662',
            type: 'BitstringStatusList',
            statusPurpose: 'revocation',
            encodedList: _encodedList,
          },
        },
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

  async testRevocation() {
    try {
      //   const bitArray = bitstring.split('');
      //   console.log(bitArray);
      //   const bitstring_string_test = Buffer.from(bitstring);
      //   console.log('bitstring_string_test', bitstring_string_test);

      //   const byteArray = new Array(80); // Automatically initialized to 0s
      //   console.log(byteArray);

      // const binaryString = '00000000000000100000000000';

      // const nullArray: null[] = Array(50).fill(null);
      // const testArrayString = nullArray.toString();

      // const bitString = '0'.repeat(131072);
      // console.log(bitString.length); // Output: 131072 (each '0' represents a bit)

      // const len = 131072; // Smaller size for debugging 131072
      // const bitstring = Buffer.alloc(len, null);
      // console.log(bitstring.slice(0, 20));
      // bitstring[5] = 1;

      // const byteArray = new Uint8Array(131072);
      // console.log(byteArray);

      //........ORG...........
      const len = 131072; // Smaller size for debugging 131072
      const bitstring = Buffer.alloc(len);
      bitstring[5] = 1;
      bitstring[20] = 1;
      console.log(bitstring);
      //........ORG...........
      const compressedBitstring = await this.compressBitstring(bitstring);
      console.log('compressedBitstring', compressedBitstring);
      const encodedBitstring = this.encodeBase64(compressedBitstring);
      console.log('encodedBitstring', encodedBitstring);

      // const decodeBase64 = Buffer.from(encodedBitstring, 'base64').toString(
      //   'utf8',
      // );
      // console.log('decodeBase64', decodeBase64);
      // const uncompress = await this.uncompress(decodeBase64);
      // console.log('uncompresss', uncompress);

      const jwt = this.jwtEncode(encodedBitstring);

      return jwt;
    } catch (error) {
      throw new Error(error);
    }
  }
}
