import { ImageDeleterService } from '../../src/services/ImageDeleter'
import * as chai from 'chai'
import { appendFileSync, unlinkSync } from 'fs'
const chaiFiles = require('chai-files')
const base64 = require('base64-img')

chai.use(chaiFiles)
const expect = chai.expect
const file = chaiFiles.file

// TEST CONFIG
const filePath = './testFile.png'

// TEST COMPONENT
describe('Services::ImageDeleter', () => {
  it('valid image path', () => {
    appendFileSync(filePath, '')
    expect(file(filePath)).to.exist

    const service = new ImageDeleterService(filePath)
    service.invoke()

    expect(file(filePath)).to.not.exist
  })

  it('invalid image path or not existing', () => {
    const service = new ImageDeleterService('invalid')
    expect(() => service.invoke()).to.throw(
      `ENOENT: no such file or directory, unlink 'invalid'`
    )
  })
})
