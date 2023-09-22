const { sendResponse, sendError } = require('../../../responses/index');
const { validateToken } = require("../../../middleware/auth");

const handler = middy()
    .handler(async (event) => {
        try {
            if (!event?.id || (event?.error && event?.error === '401')) return sendError(401, { success: false, message: 'Invalid token' });

            const account = await getAccount(event.username);

            if (!account) return sendError(401, { success: false, message: 'No account found' });

            return sendResponse({ success: true, account: account });
        } catch (error) {
            return sendError(400, { success: false, message: 'Could not get account' });
        }
    })
    .use(validateToken);

module.exports = { handler };