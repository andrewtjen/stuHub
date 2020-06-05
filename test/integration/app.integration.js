var mongoose = require('mongoose');
let User = require('../../models/user');
let Event = require('../../models/event');
var userController =  require('../../controllers/user_controller');


var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();

var expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../../app');

// This section of simulate a test when your application IS RUNNING, we are testing by DECLARING ROUTES, and see if it returns the correct data
describe('integration test', function() {



    describe('getAllEvents', function(){

        describe('setTimeout', function(){
            this.timeout(15000);
          
            it('setTimeout', function(done){
              this.timeout(15000);
              setTimeout(done, 15000);
            });
        });

        context('check if we can get all event', function(){
            it('get all events', function(done){
                supertest(app)
                .get('/getAllEvents')
                .send({})
                .end(function(err, res) {
                    console.log(res.body);
                    // if you don't understand or unsure where does res.body or res.statusCode come form, read more regarding HTTP response
                    // // or even better read the whole Hypertext Transfer Protocol (HTTP) request-respond protocol
                    expect(res.statusCode).to.equal(200);
                    // expect(res.body).to.deep.equal(Event);
                    res.body.forEach(element=>{
                        console.log(element);
                        expect(element).to.have.property('_id');
                        expect(element).to.have.keys(['_id', 'isActive', 'createdAt', 'name', 'category', 'location', 'datetime', 'description', 'creatorID', 'capacity', 'current_attendees']);
                    })
                    done();
                })
            })
        })
    });

    // describe('addAuthor', function(){
    //     context('check if we can add an author', function(){
    //         it('post an author', async function(){
    //             let newAuthor = {id:'10003', first_name:'Candy', last_name:'Crystal'};
    //             let newAuthors = [...authors, newAuthor];
    //             const res = await supertest(app)
    //                 .post('/author-management')
    //                 .send(newAuthor);

    //             expect(res.statusCode).to.equal(200);
    //             expect(res.type).to.equal('application/json');
    //             expect(res.body).to.deep.equal(newAuthors);
    //         })
    //     })
    // })
})