import mongoose, { Schema } from 'mongoose'

const { ObjectId } = mongoose.types

const pollsSchema = Schema({
  title: { type: String, required: true },
  author_id: { type: ObjectId, required: true },
  created_date: { type: Date, default: Date.now() },
  status: [
    {
      title: String,
      score: Number
    }
  ]
})

mongoose.model('Poll', pollsSchema)
