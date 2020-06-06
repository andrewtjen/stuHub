var mongoose = require('mongoose');
let User = require('../models/user');
let Event = require('../models/event');
var userController =  require('../controllers/user_controller');


var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();

var expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('integration test', function() {

    //check to get all event
    describe('getAllEvents', function(){

        context('check if we can get all event', function(){
            it('get all events', function(done){
                this.enableTimeouts(false);
                supertest(app)
                .get('/getAllEvents')
                .send({})
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    res.body.forEach(element=>{
                        //check if each event have the intended id
                        expect(element).to.have.property('_id');
                        expect(element).to.have.keys(['__v', '_id', 'isActive', 'createdAt', 'name', 'category', 'location', 'datetime', 'description', 'creatorID', 'capacity', 'current_attendees']);
                    })
                    done();
                })
            })
        })
    });
})