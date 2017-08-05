import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const pollsSchema = Schema({
  title: { type: String, required: true },
  author_id: { type: ObjectId, required: true, ref: 'User' },
  created_date: { type: Date, default: Date.now },
  status: [
    {
      title: String,
      score: Number
    }
  ]
})

export default mongoose.model('Poll', pollsSchema)
