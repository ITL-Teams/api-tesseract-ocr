import { ImageDecoder } from '../../../src/model/domain/ImageDecoder'
import * as chai from 'chai'
import { unlinkSync } from 'fs'
const chaiFiles = require('chai-files')
const base64 = require('base64-img')

chai.use(chaiFiles)
const expect = chai.expect
const file = chaiFiles.file

// TEST CONFIG
const decoder = new ImageDecoder()
const IMG_PATH = 'app/test/chat-screenshot/test_1_ocr.png'  

// TEST COMPONENT
describe('Model::Domain::ImageDecoder', () => {
  it('valid base64 image', () => {
    const data = base64.base64Sync(IMG_PATH)
    const imgName = decoder.decodeImage(data)

    expect(imgName).to.be.a('string')
    expect(imgName.split('.')[1]).to.be.equals('png')
    expect(file(imgName)).to.exist

    unlinkSync(`./${imgName}`)
    expect(file(imgName)).to.not.exist
  })

  it('invalid base64 image', () => {    
    expect(() => decoder.decodeImage('invalid')).to.throw(
      'image base64 data error'
    )
  })
})
