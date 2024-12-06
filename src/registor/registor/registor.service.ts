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
      const bitArray = this.createBitArray(80);
      const byteArray = bitArray.map((hex) => parseInt(hex, 16));
      // console.log(bitArray);
      const buffer = Buffer.from(byteArray);
      //........ORG...........
      const compressedData = gzipSync(buffer);
      console.log('compressedBitstring', compressedData);
      const encodedBitstring = compressedData.toString('base64');
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

  messageRegistry_new(hexlist: string[]) {
    try {
      const byteArray = hexlist.map((hex) => parseInt(hex, 16));
      console.log(byteArray);
      const buffer = Buffer.from(byteArray);
      const compressedData = gzipSync(buffer);
      console.log('compressedData', compressedData);
      const encodedBitstring = compressedData.toString('base64');
      console.log('data_base64', encodedBitstring);

      const vc_body = {
        '@context': ['https://www.w3.org/ns/credentials/v2'],
        id: 'https://mydomain5000.loca.lt/api/registry/credentials/status/revocation',
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

  createBitArray(sizeInBits: number) {
    try {
      const arrayString = Array(sizeInBits / 8).fill('00000000');
      let arraySet = this.toggleBit(arrayString, 0, 2);
      arraySet = this.toggleBit(arraySet, 0, 3);
      arraySet = this.toggleBit(arraySet, 0, 4);
      arraySet = this.toggleBit(arraySet, 0, 5);
      arraySet = this.toggleBit(arraySet, 0, 6);

      arraySet = this.toggleBit(arraySet, 1, 1);
      arraySet = this.toggleBit(arraySet, 1, 2);
      arraySet = this.toggleBit(arraySet, 1, 4);

      arraySet = this.toggleBit(arraySet, 2, 0);
      arraySet = this.toggleBit(arraySet, 2, 1);
      arraySet = this.toggleBit(arraySet, 2, 5);
      console.log(arraySet);
      const byteArray = arraySet.map((bin) => parseInt(bin, 2));
      const hexArray = byteArray.map(
        (byte) => `0x${byte.toString(16).padStart(2, '0')}`,
      );
      return hexArray;
    } catch (error) {
      throw new Error(error);
    }
  }

  toggleBit(array: string[], index: number, position: number): string[] {
    const bitString = array[index];
    const toggledBitString = bitString
      .split('')
      .reverse()
      .map((bit, pos) => (pos === position ? (bit === '0' ? '1' : '0') : bit))
      .reverse()
      .join('');
    array[index] = toggledBitString;
    return array;
  }

  binaryToHexByte() {
    try {
      const binaryArray = ['00000100', '01000011', '11111111'];
      const byteArray = binaryArray.map((bin) => parseInt(bin, 2));
      const hexArray = byteArray.map(
        (byte) => `0x${byte.toString(16).padStart(2, '0')}`,
      );

      // console.log(byteArray); // Output: [201, 68, 249] (decimal representation)
      // console.log(hexArray); // Output: ['0xc9', '0x44', '0xf9'] (hexadecimal representation)
      return hexArray;
    } catch (error) {
      throw new Error(error);
    }
  }
}
