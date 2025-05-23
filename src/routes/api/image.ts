import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import sanitizeFilename from 'sanitize-filename'
import resizing from '../../utilities/resize'
import rateLimit from 'express-rate-limit'

const image = express.Router()

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

image.use(limiter);

image.get('/', async (req: Request, res: Response): Promise<void> => {
  const width = parseInt(req.query.width as unknown as string, 10)
  console.log(width)
  const height = parseInt(req.query.height as unknown as string, 10)
  console.log(height)
  let filename: string = req.query.filename as string
  filename = sanitizeFilename(filename) || 'default'
  console.log(filename)
  const newName = `${filename}_${width}_${height}`
  console.log(newName)

  // paths to input and output images
  const rootImages = path.resolve('./src/images');
  const rootThumb = path.resolve('./src/thumb');
  const path1 = path.resolve(rootImages, `${filename}.jpg`);
  const path2 = path.resolve(rootThumb, `${newName}.jpg`);

  // validate the data
  if (
    width > 0 &&
    height > 0 &&
    path1.startsWith(rootImages) &&
    path2.startsWith(rootThumb) &&
    fs.existsSync(path1)
  ) {
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
