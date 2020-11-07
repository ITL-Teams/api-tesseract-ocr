import { v4 as uuid } from 'uuid'
const base64 = require('base64-img')

export class ImageDecoder {
  public decodeImage(base64Image: string): string {
    const config = {
      fileName: uuid(),
      dest: ''
    }

    base64.imgSync(base64Image, config.dest, config.fileName)
    return `${config.fileName}.png`
  }
}
