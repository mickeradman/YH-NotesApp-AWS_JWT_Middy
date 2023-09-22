const { sendResponse, sendError } = require('../../../responses/index');
const { validateToken } = require("../../../middleware/auth");

const handler = middy()
    .handler(async (event) => {
        try {

        } catch (error) {

        }
    })
    .use(validateToken);

module.exports = { handler };