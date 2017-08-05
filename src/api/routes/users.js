import express from 'express'
import { listAll, addOne, findById, deleteById } from '../controllers/users'

const router = express.Router()

router.route('/')
  // GET request to find all users
  .get(listAll)
  // POST request to add new user
  .post(addOne)

router.route('/:id')
  // GET request to find a user by his id
  .get(findById)
  // DELETE user by id
  .delete(deleteById)

  // router.get/router.route methods
export default router
