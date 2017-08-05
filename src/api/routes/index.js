import { Router } from 'express'
import users from './users'
import polls from './polls'

export default () => {
  const api = Router()

  api.use('/users', users)
  api.use('/polls', polls)
  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.send('api')
  })

  return api
}
