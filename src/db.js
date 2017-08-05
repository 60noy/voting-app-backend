import mongoose from 'mongoose'

const dbUrl = process.env.NODE_ENV === 'test' ?
  'mongodb://admin:admin@ds015325.mlab.com:15325/voting-app-test' :
  'mongodb://admin:admin@ds051903.mlab.com:51903/voting-app'

export default (callback) => {
  const mongoPromise = mongoose.connect(dbUrl, {
    useMongoClient: true
  })
  callback(mongoPromise)
}
