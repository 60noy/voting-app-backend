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

process.env.NODE_ENV = 'development'

// logger
app.use(morgan('dev'))

// use auth0

// homepage
app.get('/', (req, res) => {
  res.send('Voting App Server')
})

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}))

// TODO: uncomment in production
app.use(bodyParser.json({
  limit: config.bodyLimit
}))
app.use(bodyParser.urlencoded({ extended: true }))


// api router
app.use('/api', api)

// const jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://noy.auth0.com/.well-known/jwks.json'
//   }),
//   audience: 'voting-app',
//   issuer: 'https://noy.auth0.com/',
//   algorithms: ['RS256']
// })
//
// // Enable the use of the jwtCheck middleware in all of our routes
// app.use(jwtCheck)

// If we do not get the correct credentials, we’ll return an appropriate message

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Missing or invalid token' })
  }
  next(err)
})


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

app.use('*', (err, req, res, next) => {
  if (err) {
    res.json({ message: 'error', err })
  }
  next()
})


app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port} status is ${process.env.NODE_ENV}`)
})


export default app
