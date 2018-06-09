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

const constants = require('../../../config/constants');
const naString = 'n/a';

/**
 * Extracts useful information from the original search result object returned
 * by the Google Places API.
 * @param originalObject: The unaltered Google Places standard response
 * @return An array of objects containing only the required information
 */
module.exports.conditionData = function(originalObject) {

    let returnArr = [];

    let results = originalObject.json.results;
    for (result of results) {
        returnArr.push(
            {
                ID: {
                    google: result.place_id
                },
                Provider: 'Google',
                Name: result.name ? result.name : naString,
                Description: result.types ? result.types.join(', ') : naString,
                Location: result.geometry.location ? result.geometry.location  : naString,
                Address: result.formatted_address ? result.formatted_address : naString,
                DetailURI: `${constants.serverAddress}/${constants.latestApiVersion}/place/detail/google?id=${result.place_id}`
            }
        );
    }
    return returnArr;
}


/**
 * Extracts useful information from the original search result object returned
 * by the Google Places API for details of a place.
 * @param originalObject: The unaltered Google Places standard response for detail search
 * @return An object containing only the relevant information
 */
module.exports.conditionDetailData = function(originalObject) {
    return originalObject.json.result;
}