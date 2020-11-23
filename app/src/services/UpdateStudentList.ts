import { IService } from './IService'
import { StudentAttendance, StudentMap } from '../domain/StudentAttendance'

export class UpdateStudentList implements IService<void> {
  private studentAttendance: StudentAttendance
  private students: StudentMap[]

  constructor(studentAttendance: StudentAttendance, students: StudentMap[]) {
    this.studentAttendance = studentAttendance
    this.students = students
  }

  public invoke(): void {
    this.studentAttendance.cleanStudentList()

    for (const student of this.students) {
      if (!this.isStudent(student)) {
        this.studentAttendance.cleanStudentList()
        throw new Error(
          `Invalid students array, items must contain realName, meetName`
        )
      }

      this.studentAttendance.addStudent(student)
    }
  }

  private isStudent(student: any): student is StudentMap {
    return (
      typeof student.meetName == 'string' && typeof student.realName == 'string'
    )
  }
}
