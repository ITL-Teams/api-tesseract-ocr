import { expect } from 'chai'
import {
  StudentAttendance,
  Attendance
} from '../../src/domain/StudentAttendance'

describe('Domain::StudentAttendance', () => {
  let studentAttendance: StudentAttendance

  beforeEach(() => {
    studentAttendance = new StudentAttendance()
  })

  it('empty set', () => {
    expect(studentAttendance.getAttendanceList()).to.be.eql([])
  })

  it('add students to list', () => {
    studentAttendance.addStudent({
      meetName: 'angel ricardo',
      realName: 'Angel Ricardo'
    })
    expect(studentAttendance.getAttendanceList().length).to.be.equals(1)

    studentAttendance.addStudent({
      meetName: 'ricardo',
      realName: 'Angel R'
    })
    expect(studentAttendance.getAttendanceList().length).to.be.equals(2)

    const attendance_expected: Attendance[] = [
      {
        realName: 'Angel Ricardo',
        hasAttendance: false
      },
      {
        realName: 'Angel R',
        hasAttendance: false
      }
    ]

    expect(studentAttendance.getAttendanceList()[0]).to.deep.include(
      attendance_expected[0]
    )
    expect(studentAttendance.getAttendanceList()[1]).to.deep.include(
      attendance_expected[1]
    )
  })

  it('Take attendnace', () => {
    studentAttendance.addStudent({
      meetName: 'ricardo',
      realName: 'Angel R'
    })
    // without attendance
    expect(studentAttendance.getAttendanceList()[0]).to.deep.include({
      realName: 'Angel R',
      hasAttendance: false
    })

    // non-existent name
    studentAttendance.takeAttendance('non-existent name')
    expect(studentAttendance.getAttendanceList()[0]).to.deep.include({
      realName: 'Angel R',
      hasAttendance: false
    })

    // existing name
    studentAttendance.takeAttendance('ricardo')
    expect(studentAttendance.getAttendanceList()[0]).to.deep.include({
      realName: 'Angel R',
      hasAttendance: true
    })
  })

  it('clear list', () => {
    expect(studentAttendance.getAttendanceList()).to.be.eql([])

    studentAttendance.addStudent({
      meetName: 'ricardo',
      realName: 'Angel R'
    })

    expect(studentAttendance.getAttendanceList().length).to.be.equals(1)

    studentAttendance.cleanStudentList()

    expect(studentAttendance.getAttendanceList()).to.be.eql([])
  })
})
