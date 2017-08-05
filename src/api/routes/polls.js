import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('polls yo')
})
// router.get/router.route methods
export default router
