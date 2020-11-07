import { v4 as uuid } from 'uuid'
const base64 = require('base64-img')
import { IService } from './IService'

export class ImageUploaderService implements IService<string> {
  private base64Img

  constructor(base64Img: string) {
    this.base64Img = base64Img
  }

  public invoke(): string {
    const imgName = this.decodeImage(this.base64Img)
    return imgName
  }

  private decodeImage(base64Image: string): string {
    const config = {
      fileName: uuid(),
      dest: ''
    }

    base64.imgSync(base64Image, config.dest, config.fileName)
    return `${config.fileName}.png`
  }
}
