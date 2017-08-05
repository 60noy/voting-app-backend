import Poll from '../../models/polls'

// lists all polls
export const findAll = (req, res, next) => {
  Poll.find({}, (err, polls) => {
    if (err) {
      return next(err)
    }
    res.json(polls)
  })
}

// adds one poll with id
export const addOneWithAuthorId = (req, res, next) => {
  const { title } = req.body
  const { author_id } = req.params
  const poll = new Poll({
    title,
    author_id
  })
  poll.save((err, newPoll) => {
    if (err) {
      return next(err)
    }
    res.json({ message: `new poll with id ${newPoll._id} has been created` })
  })
}
// finds poll with specific id
export const findById = (req, res, next) => {
  const { id } = req.params
  Poll.findById(id, (err, poll) => {
    if (err) {
      return next(err)
    }
    res.json(poll)
  })
}
// delete a poll by id
export const deleteOneById = (req, res, next) => {
  const { id } = req.params
  Poll.findByIdAndRemove(id, (err) => {
    if (err) {
      return next(err)
    }
    res.json(`Poll with id ${id} has been deleted`)
  })
}
// find all polls by author id
export const findAllByAuthorId = (req, res, next) => {
  const { author_id } = req.params
  Poll.find({ author_id }, (err, polls) => {
    if (err) {
      return next(err)
    }
    res.json(polls)
  })
}

export const updateById = (req, res, next) => {
  const { id } = req.params
  Poll.findByIdAndUpdate(id, { $set: res.body }, (err, poll) => {
    if (err) {
      return next(err)
    }
    res.json(`updated. result: ${poll}`)
  })
}
