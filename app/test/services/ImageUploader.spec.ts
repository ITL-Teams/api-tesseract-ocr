import { ImageUploaderService } from '../../src/services/ImageUploader'
import * as chai from 'chai'
import { unlinkSync } from 'fs'
const chaiFiles = require('chai-files')
const base64 = require('base64-img')

chai.use(chaiFiles)
const expect = chai.expect
const file = chaiFiles.file

// TEST CONFIG
const IMG_PATH = 'app/test/chat-screenshot/test_1_ocr.png'

// TEST COMPONENT
describe('Services::ImageUploader', () => {
  it('valid base64 image', () => {
    const base64Img = base64.base64Sync(IMG_PATH)
    const service = new ImageUploaderService(base64Img)
    const imgName = service.invoke()

    expect(imgName).to.be.a('string')
    expect(imgName.split('.')[1]).to.be.equals('png')
    expect(file(imgName)).to.exist

    unlinkSync(`./${imgName}`)
    expect(file(imgName)).to.not.exist
  })

  it('invalid base64 image', () => { 
    const service = new ImageUploaderService('invalid')
    expect(() => service.invoke()).to.throw(
      'image base64 data error'
    )
  })
})
