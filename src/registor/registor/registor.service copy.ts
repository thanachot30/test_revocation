import { Injectable } from '@nestjs/common';
import { gzip, ungzip } from 'node-gzip';
import * as jwt from 'jsonwebtoken';
// import base64url from 'base64url';
import * as base64 from 'base-64';
@Injectable()
export class RegistorService {
  async compressBitstring(data: Buffer) {
    try {
      return await gzip(data);
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
      //   const len = 131072; // Smaller size for debugging 131072
      //   const bitstring = Buffer.alloc(len);
      //   bitstring[5] = parseInt('0x1', 16);
      //   console.log(bitstring);
      ////...............................
      const len = 131072; // Buffer size in bytes
      const bitstring = Buffer.alloc(len);
      bitstring[5] = 1; // Set the bit at index 5 for demonstration

      // Convert buffer to a bit string array
      const bitList = [];

      for (let i = 0; i < bitstring.length; i++) {
        // Convert each byte to a binary string, padded to 8 bits (e.g., "00000001")
        const byteStr = bitstring[i].toString(2).padStart(8, '0');

        // Split the binary string into individual bits and push to the bit list
        bitList.push(...byteStr.split(''));
      }
      console.log(bitList);

      ////...............................

      const compressedBitstring = await this.compressBitstring(bitstring);
      console.log('compressedBitstring', compressedBitstring);
      const encodedBitstring = this.encodeBase64(compressedBitstring);
      console.log('encodedBitstring', encodedBitstring);

      //   const decodeBase64 = base64.decode(encodedBitstring);
      //   console.log('decodeBase64', decodeBase64);

      //   console.log(decodeBase64);
      //   const uncompress = await this.uncompress(decodeBase64);
      //   console.log('uncompresss', uncompress);

      const jwt = this.jwtEncode(encodedBitstring);

      return jwt;
    } catch (error) {
      throw new Error(error);
    }
  }
}
