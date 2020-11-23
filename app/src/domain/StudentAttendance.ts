export type StudentMap = {
  meetName: string
  realName: string
}

export type Attendance = {
  realName: string
  hasAttendance: boolean
}

export class StudentAttendance {
  private studentsAttendance: Attendance[]

  public constructor() {
    this.studentsAttendance = []
  }

  public cleanStudentList(): void {
    this.studentsAttendance = []
  }

  public addStudent(student: StudentMap): void {
    this.studentsAttendance[student.meetName] = {
      realName: student.realName,
      hasAttendance: false
    }
  }

  public takeAttendance(meetName: string): void {
    if (this.studentsAttendance[meetName] === undefined) return
    this.studentsAttendance[meetName].hasAttendance = true
  }

  public getAttendanceList(): Attendance[] {
    let list: Attendance[] = []

    for (const key in this.studentsAttendance) {
      list.push(this.studentsAttendance[key])
    }

    return list
  }
}
