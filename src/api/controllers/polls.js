import Poll from '../../models/polls'

// adds one poll with id
export const addOneWithAuthorId = (req, res, next) => {
  const { title, author_id } = req.body
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
    if (!poll) {
      return next('No poll has been found')
    }
    res.json({ poll })
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
    if (!polls) {
      return next('No polls found')
    }
    res.json({ polls })
  })
}
