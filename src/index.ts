import express from 'express'
import { router } from './routes/route'
import { connect } from 'mongoose'

const app = express()

connect(process.env.CON!)

app.use(express.json())

app.use('/reschedule', router)

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`)
})
