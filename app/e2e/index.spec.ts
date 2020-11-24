import { expect } from 'chai'
const base64 = require('base64-img')
const fetch = require('node-fetch')

type HttpRequest = {
  url: string
  method: string
  headers?: object
  body?: string
}

async function getData(request: HttpRequest) {
  const fetch_response = await fetch(request.url, request)

  try {
    const data = await fetch_response.json()
    return data
  } catch (error) {
    return {}
  }
}

describe('Attendance API E2E Tests', () => {
  before(async () => {
    // CLEAN STUDENT LIST
    let request: HttpRequest = {
      url: 'http://localhost/api/clean-student-list',
      method: 'delete'
    }
    await getData(request)
  })

  it('/attendance-list returns empty list', async () => {
    const request: HttpRequest = {
      url: 'http://localhost/api/attendance-list',
      method: 'get'
    }
    const response = await getData(request)

    expect(response).not.to.be.empty
    expect(response).to.deep.include({
      success: {
        date: response.success.date,
        attendance: []
      }
    })
  })

  it('/update-student-list returns error', async () => {
    const request: HttpRequest = {
      url: 'http://localhost/api/update-student-list',
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // REQUEST ERROR
    request.body = JSON.stringify({})
    let response = await getData(request)

    expect(response).not.to.be.empty
    expect(response).to.have.property('error')
    expect(response.error).to.have.property('message')
    expect(response.error.message).to.include('RequestError')

    // LIST ERROR
    request.body = JSON.stringify({
      students: [
        {
          realName: 'María José Campos Granados',
          meetName: 'María José Campos Granados'
        },
        {
          realName1: 'Ana Elizabeth Landeros', // Non-exist property
          meetName: 'Ana Elizabeth Landeros'
        }
      ]
    })
    response = await getData(request)

    expect(response).not.to.be.empty
    expect(response).to.have.property('error')
    expect(response.error).to.have.property('message')
    expect(response.error.message).to.include('Invalid students array')
  })

  it('/update-student-list returns success', async () => {
    const request: HttpRequest = {
      url: 'http://localhost/api/update-student-list',
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        students: [
          {
            realName: 'Angel Ricardo Ramírez de la Torre',
            meetName: 'Angel Ricardo Ramírez de la Torre'
          },
          {
            realName: 'Cristofer Gerardo Tostado Lopez',
            meetName: 'CRISTOFER GERARDO TOSTADO LOPEZ'
          }
        ]
      })
    }

    let response = await getData(request)

    expect(response).not.to.be.empty
    expect(response).to.have.property('success')
    expect(response.success).to.be.true
  })

  it('/attendance-list return student list', async () => {
    const request: HttpRequest = {
      url: 'http://localhost/api/attendance-list',
      method: 'get'
    }
    const response = await getData(request)

    expect(response).not.to.be.empty
    expect(response).to.deep.include({
      success: {
        date: response.success.date,
        attendance: [
          {
            realName: 'Angel Ricardo Ramírez de la Torre',
            hasAttendance: false
          },
          {
            realName: 'Cristofer Gerardo Tostado Lopez',
            hasAttendance: false
          }
        ]
      }
    })
  })

  it('/take-attendance returns success', async () => {
    const request: HttpRequest = {
      url: 'http://localhost/api/take-attendance',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        img: base64.base64Sync('app/test/chat-screenshot/test_1_ocr.png')
      })
    }
    const response = await getData(request)

    expect(response).not.to.be.empty
    expect(response).to.have.property('success')
    expect(response.success).to.be.true
  })

  it('/attendance-list verify that student has attendance', async () => {
    const request: HttpRequest = {
      url: 'http://localhost/api/attendance-list',
      method: 'get'
    }
    const response = await getData(request)

    expect(response).not.to.be.empty
    expect(response).to.deep.include({
      success: {
        date: response.success.date,
        attendance: [
          {
            realName: 'Angel Ricardo Ramírez de la Torre',
            hasAttendance: true
          },
          {
            realName: 'Cristofer Gerardo Tostado Lopez',
            hasAttendance: false
          }
        ]
      }
    })
  })

  it('/clean-student-list returns success', async () => {
    // CLEAN STUDENT LIST
    let request: HttpRequest = {
      url: 'http://localhost/api/clean-student-list',
      method: 'delete'
    }
    let response = await getData(request)

    expect(response).not.to.be.empty
    expect(response).to.have.property('success')
    expect(response.success).to.be.true

    // CHECK EMPTY LIST
    request.url = 'http://localhost/api/attendance-list'
    request.method = 'get'
    response = await getData(request)

    expect(response).not.to.be.empty
    expect(response).to.deep.include({
      success: {
        date: response.success.date,
        attendance: []
      }
    })
  })
})
