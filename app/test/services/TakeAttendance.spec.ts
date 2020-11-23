import { expect } from 'chai'
import { TakeAttendance } from '../../src/services/TakeAttendance'
import {
  StudentAttendance,
  StudentMap
} from '../../src/domain/StudentAttendance'

describe('Services::TakeAttendance', () => {
  let studentAttendance: StudentAttendance
  let studentList: StudentMap[]
  let meetNames: string[]

  beforeEach(() => {
    studentAttendance = new StudentAttendance()
    meetNames = ['angel', 'ricardo']
    studentList = [
      {
        meetName: meetNames[0],
        realName: 'Angel'
      },
      {
        meetName: meetNames[1],
        realName: 'Ricardo'
      }
    ]

    studentAttendance.addStudent(studentList[0])
    studentAttendance.addStudent(studentList[1])
  })

  it('Empty meet names list do not affect attendance', () => {
    meetNames = []
    const service = new TakeAttendance(studentAttendance, meetNames)
    service.invoke()

    expect(studentAttendance.getAttendanceList()[0]).to.deep.include({
      realName: 'Angel',
      hasAttendance: false
    })
    expect(studentAttendance.getAttendanceList()[1]).to.deep.include({
      realName: 'Ricardo',
      hasAttendance: false
    })
  })

  it('Take attendance on student list', () => {
    // Before Service Call
    expect(studentAttendance.getAttendanceList()[0]).to.deep.include({
      realName: 'Angel',
      hasAttendance: false
    })
    expect(studentAttendance.getAttendanceList()[1]).to.deep.include({
      realName: 'Ricardo',
      hasAttendance: false
    })

    const service = new TakeAttendance(studentAttendance, meetNames)
    service.invoke()

    // After Service Call
    expect(studentAttendance.getAttendanceList()[0]).to.deep.include({
      realName: 'Angel',
      hasAttendance: true
    })
    expect(studentAttendance.getAttendanceList()[1]).to.deep.include({
      realName: 'Ricardo',
      hasAttendance: true
    })
  })

  it('Do not take attendance on bad meet names list', () => {
    const attendanceList = studentAttendance.getAttendanceList()

    const error: any = {}
    let service = new TakeAttendance(studentAttendance, error)
    expect(() => service.invoke()).to.throw()

    expect(studentAttendance.getAttendanceList()).to.be.eql(attendanceList)
  })

  it('Do not take attendance on meet name error', () => {
    const attendanceList = studentAttendance.getAttendanceList()

    const meetNames: any = [1, 2]
    let service = new TakeAttendance(studentAttendance, meetNames)
    service.invoke()

    expect(studentAttendance.getAttendanceList()).to.be.eql(attendanceList)
  })
})
