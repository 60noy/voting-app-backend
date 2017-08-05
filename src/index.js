import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import initializeDb from './db'
import middleware from './middleware'
import api from './api/routes'
import config from './config.json'

const app = express()
app.server = http.createServer(app)
// use native promises. I can change with whatever promises library I want
mongoose.Promise = global.Promise

// logger
app.use(morgan('dev'))

// homepage
app.get('/', (req, res) => {
  res.send('Voting App Server')
})

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
  limit: config.bodyLimit
}))

// api router
app.use('/api', api())

// connect to db
initializeDb((db) => {
  db.on('error', (err) => {
    console.error(`error connecting to db${err}`)
  })
  db.once('open', () => {
  // we're connected!
    console.log('db is connected')
    // internal middleware
    app.use(middleware({ config, db }))
  })
})

// error handler
// app.use('/api', (err, req, res) => {
//   // use the error's status or default to 500
//   res.status(err.status || 500)
//   console.log(`err handler${err}`)
//   // send back json data
//   res.send({
//     message: err.message
//   })
// })


app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})


export default app
