import mongoose from 'mongoose'

export default (callback) => {
  const mongoPromise = mongoose.connect('mongodb://admin:admin@ds051903.mlab.com:51903/voting-app', {
    useMongoClient: true
  })
  callback(mongoPromise)

  // connect to a database if needed, then pass it to `callback`:
}
