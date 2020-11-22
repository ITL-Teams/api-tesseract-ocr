import { Router } from 'express'
import { ImageUploaderService } from '../services/ImageUploader'
import { ImageToTextService } from '../services/ImageToText'
import { StudentNameParserService } from '../services/StudentNameParserService'
import { ImageDeleterService } from '../services/ImageDeleter'
import { validateRequest } from './utils'
export const router = Router()

router.post('/take-attendance', async (request, response) => {
  const image = request.body.img

  try {
    validateRequest([
      {
        value_name: 'img',
        value: image,
        expected: 'string'
      }
    ])

    const imageName = new ImageUploaderService(image).invoke()
    const imageToTextService = new ImageToTextService(imageName)

    const imageText = await imageToTextService.invoke()

    const parserOutput = new StudentNameParserService(imageText).invoke()
    new ImageDeleterService(`./${imageName}`).invoke()

    response.json({
      success: {
        names: parserOutput.names
      }
    })
  } catch (error) {
    response.json({
      error: {
        message: new String(error).toString()
      }
    })
  }
})
