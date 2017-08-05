import mongoose from 'mongoose'
import User from '../../models/users'


// list all users
export const listAll = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err)
    }
    res.json(users)
  })
}

// add new user
export const addOne = (req, res, next) => {
  const { name, email, password } = req.body
  const user = new User({
    name,
    email,
    password
  })
  user.save((err, newUser) => {
    if (err) {
      res.status(500)
      return next(err)
    } res.json({ error: false, user: newUser })
  })
}

export const findById = (req, res, next) => {
  const id = req.params.id
  if (mongoose.Types.ObjectId.isValid(id)) {
    User.findById(id, (err, user) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        res.status(404)
        return next('no user has been found')
      }
      res.json({ user })
    })
  } else { next('not a valid objectid find') }
}

export const deleteById = (req, res, next) => {
  console.log(next)
  const id = req.params.id
  if (mongoose.Types.ObjectId.isValid(id)) {
    User.findByIdAndRemove(id, (err) => {
      if (err) {
        return next(err)
      }
      res.json({ message: `user with id ${id} has been removed` })
    })
  } else {
    next('not a valid objectid delete')
  }
}
