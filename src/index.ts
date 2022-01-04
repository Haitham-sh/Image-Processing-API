import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import routes from './routes/index'

dotenv.config()

// Set a port
const port = process.env.port || 3000

// Create the application object
const app = express()

// HTTP request middleware
app.use(morgan('short'))

app.use('/api', routes)

// start the server
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

export default app
