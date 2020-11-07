import { unlinkSync } from 'fs'
import { IService } from './IService'

export class ImageDeleterService implements IService<void> {
  private path

  constructor(imagePath: string) {
    this.path = imagePath
  }

  public invoke(): void {
    unlinkSync(this.path)
  }
}
