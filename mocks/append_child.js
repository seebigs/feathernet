const createResponse = require('./create_response.js');

function createMockAppendChild (origAppendChild, mocks) {
    let featherMockRequest = this;

    function mockAppendChild (elem) {
        if (!elem) { return; }
        let url = elem.src;

        if (url) {
            mockAppendChild.calls.push({
                url: url,
            });

            let targetElem = this;

            let mockResponse = createResponse(featherMockRequest, 'file', url, mocks);
            if (mockResponse.success) {
                elem.src = mockResponse.success.newSrc;
                origAppendChild.call(targetElem, elem);
            } else {
                if (typeof elem.onerror === 'function') {
                    elem.onerror();
                }
            }

            console.log('I am going to append something!');

        } else {
            console.error('No URL!!!');
        }
    }

    mockAppendChild.calls = [];

    return mockAppendChild;
}



module.exports = createMockAppendChild;
