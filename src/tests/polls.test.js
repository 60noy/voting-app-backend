/* eslint-disable no-unused-vars, import/first */
process.env.NODE_ENV = 'test'

import chai from 'chai'
import chaiHttp from 'chai-http'
import mocha from 'mocha'
import Poll from '../models/polls'
import server from '../index'

const { expect } = chai

chai.use(chaiHttp)

describe('Polls', () => {
  console.log(`env is ${process.env.NODE_ENV}`)
  beforeEach((done) => {
    Poll.remove({}, () => {
      done()
    })
  })
})


describe('GET polls', () => {
  it('should get all polls', (done) => {
    chai.request(server)
      .get('/api/polls')
      .end((err, res) => {
        // expect(res.status).to.eql(200)
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.eql(0)
        done()
      })
  })
})

describe('POST poll with author id', () => {
  it('should post a poll', (done) => {
    chai.request(server)
      .post('/api/polls/59863ad25d81d72048daf71b')
      .send({ title: 'WOW' })
      .end((err, res) => {
        expect(res.status).to.eql(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('title')
        expect(res.body).title.to.eql('WOW')
        expect(res.body).to.have.property('author_id')
        expect(res.body).to.have.property('_id')
        done()
      })
  })
})
