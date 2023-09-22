const middy = require("@middy/core");
const { nanoid } = require("nanoid");
const { DateTime } = require("luxon");
const { sendResponse, sendError } = require("../../../responses/index");
const { validateToken } = require("../../../middleware/auth");
const { postNoteBodyValidation } = require("../../../middleware/notesBodyValidation");
const { db } = require('../../../services/db');
const { errorHandler } = require('../../../services/errorHandler');

async function createNote(event) {
    try {
        const body = JSON.parse(event.body);

        const noteObj = {
            id: nanoid(),
            username: event.username,
            title: body.title,
            text: body.text,
            createdAt: DateTime.local().setZone("Europe/Stockholm").toFormat("yyyy-MM-dd HH:mm:ss")
        }

        // await db.put({
        //     TableName: 'notesDb',
        //     Item: {
        //         'username': body.username,
        //         'pwd': body.pwd
        //     }
        // }).promise();

        return noteObj;
    } catch (error) {
        return { success: false };
    }
}

const handler = middy()
    .handler(async (event) => {
        if (event?.error) {
            return errorHandler(event.error, event.errormsg);
        }

        const result = await createNote(event);
        if (!result?.id) {
            return sendError(401, { success: false, message: "Fel i systemä" });
        } else {
            return sendResponse({ success: true, message: "Note saved", noteObj: result });
        }
    })
    .use(validateToken)
    .use(postNoteBodyValidation);

module.exports = { handler };