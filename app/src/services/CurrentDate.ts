import { IService } from './IService'

export class CurrentDate implements IService<string> {
  private time: number

  public constructor(time?: number) {
    this.time = time || new Date().getTime()
  }

  public invoke(): string {
    const current = new Date(this.time)

    const day =
      current.getDate() < 10 ? `0${current.getDate()}` : current.getDate()
    let monthNumber = current.getMonth() + 1
    const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber
    const year = current.getFullYear()

    return `${day}/${month}/${year}`
  }
}
