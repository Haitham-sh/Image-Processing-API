import sharp from 'sharp'

// resize not exist image and save it
const resizing = async (
  filename: string,
  newName: string,
  width: number,
  height: number
): Promise<void> => {
  try {
    await sharp(`src/images/${filename}.jpg`)
      .resize(width, height)
      .toFile(`src/thumb/${newName}.jpg`)
  } catch (error) {
    console.log(error, 'resizing')
  }
}
export default resizing
