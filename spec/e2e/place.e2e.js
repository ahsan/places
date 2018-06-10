/** This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/> **/

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const winston = require('../../config/winston.config');

const app = require('../../app');
const constants = require('../../config/constants')
const apiVerPrefix = constants.latestApiVersion;

chai.use(chaiHttp);

/**
 * Unit Tests for /place endpoint
 */
describe('Place', function () {

    /**
     * Search for places
     */

    it('should get a list of places', function (done) {
        chai.request(app)
            .get(`/${apiVerPrefix}/place?search_string=mcdonalds&location[0]=31&location[1]=74`)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.message.should.be.a('string');
                res.body.place.should.be.a('array');
                res.body.place[0].ID.should.be.a('object');
                res.body.place[0].Provider.should.be.a('string');
                res.body.place[0].Name.should.be.a('string');
                res.body.place[0].Description.should.be.a('string');
                res.body.place[0].Location.should.be.a('object');
                res.body.place[0].Address.should.be.a('string');
                res.body.place[0].DetailURI.should.be.a('string');
                detailUri = res.body.place[0].DetailURI;
                done();
            });
    });


    it('should not get a list of places without specifying search_string', function (done) {
        chai.request(app)
            .get(`/${apiVerPrefix}/place?location[0]=31&location[1]=74`)
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.error.should.be.a('string');
                done();
            });
    });


    it('should not get a list of places without specifying location array', function (done) {
        chai.request(app)
            .get(`/${apiVerPrefix}/place?search_string=mcdonalds`)
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.error.should.be.a('string');
                done();
            });
    });


    /**
     * Get details about one particular place
     */
    it('should get details about a place', function (done) {
        chai.request(app)
            .get(`/${apiVerPrefix}/place/detail/google/?id=ChIJPxUm0oIcGTkReQ04EIwf8I8`)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.message.should.be.a('string');
                res.body.place.should.be.a('object');
                done();
            });
    });


    it('should not get details about a place without specifying id', function (done) {
        chai.request(app)
            .get(`/${apiVerPrefix}/place/detail/google`)
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.error.should.be.a('string');
                done();
            });
    });


});