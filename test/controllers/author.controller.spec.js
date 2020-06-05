var mongoose = require('mongoose');
let User = require('../../models/user');
let Event = require('../../models/event');
var userController =  require('../../controllers/user_controller');


var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();


describe('userController', function () {
//     // Below, we are going to test HTTP functions, so we need to create fake request and respond object!

//     const mockResponse = (fake) => {
//         return {
//             send: fake
//         };
//     }

//     // this is just example how you can design the fake request, you can also add header property if your website needs one!
//     // I'm not even going to use any of these stuff inside request
//     const mockRequest = (session, body) => ({
//         session,
//         body,
//     });

//     // I just want to remind that using chai is easier to read
//     describe('getAllUser', function() {

//         it("Author should have id, name, isVerified, EventCreatedArray, email, password", function(){
//             const fake = sinon.fake();
//             const req = mockRequest({},{});
//             const res = mockResponse(fake);

//             userController.getAllUser(req,res);
//             const result = fake.lastArg;
//             console.log(result);
//             result.forEach(element => {
//                 expect(element).to.have.property('_id');//check one with chai
//                 expect(element).to.have.keys(['id', 'name', 'verified', 'eventCreated', 'email', 'password']); //check everything with chai
//                 element.should.have.property('_id'); // different way of checking using should
//             });
//         })

//         it('should return all users', function(){
//             const fake = sinon.fake();
//             const req = mockRequest({},{});
//             const res = mockResponse(fake);

//             userController.getAllUser(req,res);
//             const result = fake.lastArg;
//             console.log(result);
//             expect(result).to.deep.equal(User); // Don't forget to use deep, you don't want to compare object id, you want to compare contents!
//         });
//   });
});