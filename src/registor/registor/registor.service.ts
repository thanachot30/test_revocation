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

  async testRevocation() {
    try {
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

      const vc_body = {
        '@context': ['https://www.w3.org/ns/credentials/v2'],
        id: 'https://mydomain5000.loca.lt/api/registry/credentials/status/revocation',
        type: ['VerifiableCredential', 'BitStringStatusListCredential'],
        issuer: 'did:example:12345',
        validFrom: '2024-10-25T15:52:58+07:00',
        credentialSubject: {
          id: 'f709cf3b-ad03-4291-8675-5b01c9fd0662',
          type: 'BitstringStatusList',
          statusPurpose: 'revocation',
          encodedList: encodedBitstring,
        },
      };

      const jwt = this.jwtEncode(vc_body);

      return jwt;
    } catch (error) {
      throw new Error(error);
    }
  }

  async messageRegistry() {
    try {
      const len = 131072; // Smaller size for debugging 131072
      const bitstring = Buffer.alloc(len);
      bitstring[5] = 1;
      bitstring[10] = 1;
      bitstring[20] = 2;
      bitstring[30] = 3;
      bitstring[40] = 4;
      console.log(bitstring);

      const compressedBitstring = await this.compressBitstring(bitstring);
      console.log('compressedBitstring', compressedBitstring);
      const encodedBitstring = this.encodeBase64(compressedBitstring);
      console.log('encodedBitstring', encodedBitstring);

      const vc_body = {
        '@context': ['https://www.w3.org/ns/credentials/v2'],
        id: 'https://mydomain5000.loca.lt/api/registry/credentials/status/revocation/message',
        type: ['VerifiableCredential', 'BitStringStatusListCredential'],
        issuer: 'did:example:12345',
        validFrom: '2024-10-25T15:52:58+07:00',
        credentialSubject: {
          id: 'f709cf3b-ad03-4291-8675-5b01c9fd0662',
          type: 'BitstringStatusList',
          statusPurpose: 'message',
          encodedList: encodedBitstring,
        },
      };

      const jwt = this.jwtEncode(vc_body);
      return jwt;
    } catch (error) {
      throw new Error(error);
    }
  }
}
