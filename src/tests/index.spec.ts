import supertest from 'supertest'
import fs from 'fs'
import { response } from 'express'
import app from '..'
import resizing from '../utilities/resize'

// create a request object
const request = supertest(app)

// test endpoint
describe('Test endpoint response', () => {
  it('Test endpoint response with no data', async () => {
    const response1 = await request.get('/api/image')
    expect(response1.status).toBe(200)
  })
})

// test endpoint with data
describe('Test endpoint response', () => {
  it('end point with data', async () => {
    const response2 = await request.get('/api/image?filename=palmtunnel&width=1200&height=600')
    expect(response2.status).toBe(200)
  })
})

describe('test function of resize not exist image is defined', () => {
  it('test function of resize not exist image is defined', async () => {
    const resize = await resizing('fjord', 'fjord_666_666', 666, 666)
    expect(resize).toBeUndefined()
  })
})

describe('test if image is exist', () => {
  it('test if image is exist', async () => {
    const pathTest1 = `./src/images/santamonica.jpg`
    const chek = await fs.existsSync(pathTest1)
    expect(chek).toBe(true)
  })
})

describe('test if image is not exist yet in thumb folder', () => {
  it('test if image is not exist yet in thumb folder', async () => {
    const pathTest2 = `./src/thumb/santamonica_3333_3333.jpg`
    const chek = await fs.existsSync(pathTest2)
    expect(chek).toBe(false)
  })
})

// test send message to user if filename are wrong
describe('input data are wrong', () => {
  it('send message to user if any input data are wrong', async () => {
    await request.get('/api/image?filename=smsm&width=900&height=500')
    const message = response.send
    expect(message).toBeTruthy()
  })
})
