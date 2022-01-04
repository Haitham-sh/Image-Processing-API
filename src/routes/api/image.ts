import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import resizing from '../../utilities/resize'

const image = express.Router()

image.get('/', async (req: Request, res: Response): Promise<void> => {
  const width = parseInt(req.query.width as unknown as string, 10)
  console.log(width)
  const height = parseInt(req.query.height as unknown as string, 10)
  console.log(height)
  const filename: string = req.query.filename as string
  console.log(filename)
  const newName = `${filename}_${width}_${height}`
  console.log(newName)

  // paths to input and output images
  const path1 = `./src/images/${filename}.jpg`
  const path2 = `./src/thumb/${newName}.jpg`

  // validate the data
  if (width > 0 && height > 0 && fs.existsSync(path1) === true) {
    try {
      // send exist image
      if (fs.existsSync(path2)) {
        console.log('File exists. ')
        res.sendFile(path.resolve(`./src/thumb/${newName}.jpg`))
      } else {
        await resizing(filename, newName, width, height)
        console.log('File does not exist.')
        res.sendFile(path.resolve(`./src/thumb/${newName}.jpg`))
      }
    } catch (err) {
      console.error(err, 'send file')
    }
  } else {
    // send massege if data dot validte
    res.send(
      'Please write the name of the image you chose from the images, make sure that the name is correct, specify the width and height, and make sure that both are numbers as follows (http://localhost:3000/api/image?filename=fjord & width=400 & height=200 )'
    )
  }
})

export default image
