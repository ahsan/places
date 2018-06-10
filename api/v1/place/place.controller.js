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

let winston = require('../../../config/winston.config');
let googleHelper = require('./google.helper');

let googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_PLACES_API_KEY,
    Promise: Promise
});

/**
 * Returns places search results for the provided query.
 * @param req: the request object
 * @param res: the response object
 * @return A JSON object containing response code, message and
 * search result.
 */
exports.searchPlaces = function (req, res) {

    // this array holds the promises of all requests made to different providers
    let allProvidersPromises = [];
    // result objects from all the providers will be pushed in this array
    let returnArr = [];

    /**
     * GOOGLE
     */
    const googleSearchQuery = {
        query: req.query.search_string,
        location: req.query.location,
        language: 'en'
    };
    let googlePromise = googleMapsClient.places(googleSearchQuery).asPromise();

    // push the google promise in the promises array
    allProvidersPromises.push(googlePromise);

    // make the call
    googlePromise.then((googleSearchResult) => {
        // condition the data and push to the return array
        Array.prototype.push.apply(returnArr, googleHelper.conditionData(googleSearchResult));
    });
    // no catch call here
    // all the errors are caught by the Promise.all


    /**
     * Yelp
     */
    // ToDo: Add Yelp
    // allProvidersPromises.push(yelpPromise)

    /**
     * Foursquare
     */
    // ToDo: Add Foursquare
    // allProvidersPromises.push(foursquarePromise)


    /**
     * Response
     */
    Promise.all(allProvidersPromises).then(() => {
        res.status(200).json({
            message: 'Search complete.',
            place: returnArr
        });
    }).catch( (err) => {
        winston.error(
            `Error:${JSON.stringify(req.query)}\nQuery: ${JSON.stringify(req.query)}\nResult:${JSON.stringify(returnArr)}`
        );
        res.status(500).json({
            message: 'Something went wrong.',
            err: JSON.stringify(err)
        });
    });

};



/**
 * Gets the detail about the provided place using the Google Places API
 * @param {*} req
 * @param {*} res
 */
exports.detailGoogle = function (req, res) {
    const googleSearchQuery = {
        placeid: req.query.id,
        language: 'en'
    };

    googleMapsClient.place(googleSearchQuery).asPromise().then((placeDetail) => {
        res.status(200).json({
            message: 'Search complete.',
            place: googleHelper.conditionDetailData(placeDetail)
        });
    }).catch((err) => {
        res.status(500).json({
            message: 'Something went wrong.',
            err: err
        });
    });
};