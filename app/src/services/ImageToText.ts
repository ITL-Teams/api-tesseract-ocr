import { IService } from './IService'
const tesseract = require('node-tesseract-ocr')

export class ImageToTextService implements IService<Promise<string>> {
  private readonly path
  private config

  constructor(imagePath: string) {
    this.path = imagePath
    this.config = {
      lang: 'spa'
    }
  }

  public async invoke(): Promise<string> {
    return await tesseract.recognize(this.path, this.config)
  }
}
