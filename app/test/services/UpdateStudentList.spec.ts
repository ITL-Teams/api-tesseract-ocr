import { expect } from 'chai'
import { UpdateStudentList } from '../../src/services/UpdateStudentList'
import {
  StudentAttendance,
  StudentMap
} from '../../src/domain/StudentAttendance'

describe('Services::UpdateStudentList', () => {
  let studentAttendance: StudentAttendance
  let studentList: StudentMap[]

  beforeEach(() => {
    studentAttendance = new StudentAttendance()
    studentList = [
      {
        meetName: 'angel',
        realName: 'Angel'
      },
      {
        meetName: 'ricardo',
        realName: 'Ricardo'
      }
    ]
  })

  it('Empty list', () => {
    studentList = []
    const service = new UpdateStudentList(studentAttendance, studentList)
    service.invoke()
    expect(studentAttendance.getAttendanceList()).to.be.eql([])
  })

  it('Load list', () => {
    const service = new UpdateStudentList(studentAttendance, studentList)
    expect(studentAttendance.getAttendanceList()).to.be.eql([])

    service.invoke()
    expect(studentAttendance.getAttendanceList().length).to.be.equals(2)

    expect(studentAttendance.getAttendanceList()[0]).to.be.eql({
      realName: studentList[0].realName,
      hasAttendance: false
    })
    expect(studentAttendance.getAttendanceList()[1]).to.be.eql({
      realName: studentList[1].realName,
      hasAttendance: false
    })
  })

  it('Throws exception on bad student list', () => {
    const badList: any = [
      {
        realName: 'Ricardo',
        meetName: 'ricardo'
      },
      {
        realName: 'Ricardo',
        name: 'ricardo'
      }
    ]
    const service = new UpdateStudentList(studentAttendance, badList)

    expect(() => service.invoke()).to.throw()
  })

  it('Exeption cause empty student list', () => {
    // Check before error
    expect(studentAttendance.getAttendanceList()).to.be.eql([])
    let service = new UpdateStudentList(studentAttendance, studentList)
    service.invoke()
    expect(studentAttendance.getAttendanceList().length).to.be.equals(2)
    expect(studentAttendance.getAttendanceList()[0]).to.be.eql({
      realName: studentList[0].realName,
      hasAttendance: false
    })
    expect(studentAttendance.getAttendanceList()[1]).to.be.eql({
      realName: studentList[1].realName,
      hasAttendance: false
    })

    // Try error
    const error: any = [
      {
        realName: 'Ricardo',
        meetName: 'ricardo'
      },
      {
        realName: 'Ricardo',
        name: 'ricardo'
      }
    ]
    service = new UpdateStudentList(studentAttendance, error)
    expect(() => service.invoke()).to.throw()

    // Check after error
    expect(studentAttendance.getAttendanceList()).to.be.eql([])
  })
})
