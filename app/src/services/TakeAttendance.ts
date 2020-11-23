import { IService } from './IService'
import { StudentAttendance } from '../domain/StudentAttendance'

export class TakeAttendance implements IService<void> {
  private studentAttendance: StudentAttendance
  private meetNames: string[]

  constructor(studentAttendance: StudentAttendance, meetNames: string[]) {
    this.studentAttendance = studentAttendance
    this.meetNames = meetNames
  }

  public invoke(): void {
    for (const meetName of this.meetNames) {
      this.studentAttendance.takeAttendance(meetName)
    }
  }
}
