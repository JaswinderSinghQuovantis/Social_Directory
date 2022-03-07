import chai from 'chai'
import chaiHttp from 'chai-http';
import server from '../index.js';
import faker from '@faker-js/faker';
chai.use(chaiHttp);

chai.should();
describe('registartion', () => {  
    it('checking response from controller layer', (done) => {
      chai.request(server)
        .post('/register')
        .end((err, res) => {
          res.should.have.status(201);
        //   res.body.should.have.property('success').eql(true);
        //   res.body.should.have.property('message').eql('checking response from Controller Layer');
          done()
        });
    });
    it('checking response from controller layer', (done) => {
        chai.request(server)
          .post('/register')
          .send({
              'email' : 'Jaswinder,sungh#123.com',
              'password':'233444',
              'phoneNo':'21111111'
        })
          .end((err, res) => {
            res.should.have.status(422);
            // res.body.should.have.property('success').eql(false);
            // res.body.should.have.property('message').eql('Failed To Validated Input');
            done()
          });
      });
    it('checking response from controller layer', (done) => {
        chai.request(server)
          .post('/register')
          .end((err, res) => {
            res.should.have.status(500);
            // res.body.should.have.property('success').eql(true);
            // res.body.should.have.property('message').eql('Internal Server Error');
            done()
          });
      });

      it('checking response from true credential ', (done) => {
        chai.request(server)
          .post('/register')
          .send({
            'email' : "findjassi121212@gmail.com",
            'password':"1232456@Aa",
            'phoneNo':'8878367072'

          })
          .end((err, res) => {
            res.should.have.status(201);
            // res.body.should.have.property('success').eql(true);
            // res.body.should.have.property('message').eql('Internal Server Error');
            done()
          });
      });
      it('checking response from Service layer', (done) => {
        chai.request(server)
          .post('/register')
          .send({
            'email' : "findjassi121212@gmail.com",
            'password':"1232456@Aa",
            'phoneNo':'8878367072'
          })
          .end((err, res) => {
            res.should.have.status(201);
            // res.body.should.have.property('success').eql(true);
            // res.body.should.have.property('message').eql('Internal Server Error');
            done()
          });
      });
      it('should give true when user is register', (done) => {
        chai.request(server)
          .post('/register')
          .send({
            'email' : faker.internet.email(),
            'password':"1232456@Aa",
            'phoneNo':'8878367072'
          })
          .end((err, res) => {
            res.should.have.status(201);
            // res.body.should.have.property('success').eql(true);
            // res.body.should.have.property('message').eql('Internal Server Error');
            done()
          });
      });
  
  });
  