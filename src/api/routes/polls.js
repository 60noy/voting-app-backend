import express from 'express'
import { findAll, addOneWithAuthorId, findById, deleteOneById, findAllByAuthorId, updateById } from '../controllers/polls'

const router = express.Router()

router.route('/')
// GET all polls
  .get(findAll)

router.route('/:author_id')
// GET all posts of a specific author by his id
  .get(findAllByAuthorId)
// POST new poll with author id
  .post(addOneWithAuthorId)

router.route('/:id')
// GET poll with specific id
  .get(findById)
// UPDATE poll with specific id
  .put(updateById)
// DELETE poll with specific id
  .delete(deleteOneById)

export default router
