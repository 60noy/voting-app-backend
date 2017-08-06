/* eslint-disable no-unused-vars, import/first */
process.env.NODE_ENV = 'test'

import mongoose from 'mongoose'
import chai from 'chai'
import chaiHttp from 'chai-http'
import mocha from 'mocha'
import Poll from '../models/polls'
import server from '../index'

const { expect } = chai
let db

chai.use(chaiHttp)

describe('Polls', () => {
  console.log(`env is ${process.env.NODE_ENV}`)
  after((done) => {
    Poll.remove().exec().then(() => done())
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

  describe('POST poll with author id and get it', () => {
    it('should post a poll', (done) => {
      chai.request(server)
        .post('/api/polls/59863ad25d81d72048daf71b')
        .send({ title: 'WOW' })
        .end((err, res) => {
          expect(res.status).to.eql(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('title')
          expect(res.body.title).to.eql('WOW')
          expect(res.body).to.have.property('author_id')
          expect(res.body).to.have.property('_id')
          done()
        })
    })

    it('should get a specific poll with author id', (done) => {
      chai.request(server)
        .get('/api/polls/59863ad25d81d72048daf71b')
        .end((err, res) => {
          expect(res.status).to.eql(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.be.an('object')
          expect(res.body[0]).to.have.property('title')
          expect(res.body[0].title).to.eql('WOW')
          expect(res.body[0]).to.have.property('author_id')
          expect(res.body[0]).to.have.property('_id')
          done()
        })
    })
  })

  describe('POST new poll and update title', () => {
    it('should create a new poll with title ttl', (done) => {
      chai.request(server)
        .post('/api/polls/59863ad25d81d72048daf71b')
        .send({ title: 'ttl' })
        .end((err, res) => {
          expect(res.status).to.eql(200)
          expect(res.body).to.have.an('object')
          expect(res.body).to.have.property('title')
          expect(res.body.title).to.eql('ttl')
          expect(res.body).to.have.property('author_id')
          expect(res.body.author_id).to.eql('59863ad25d81d72048daf71b')
          done()
        }
        )
    })
    // it('should update post title by id to the title new', (done) => {
    //   chai.request(server)
    //     .put('/api/polls/59863ad25d81d72048daf71b')
    //     .send({ title: 'new' })
    //     .end((err, res) => {
    //       expect(res.status).to.eql(200)
    //       expect(res.body).to.have.an('object')
    //       expect(res.body.title).to.eql('new')
    //       expect(res.body).to.have.property('_id')
    //       expect(res.body).to.have.property('author_id')
    //       expect(res.body.author_id).to.eql('59863ad25d81d72048daf71b')
    //     })
    // })
  })
})
