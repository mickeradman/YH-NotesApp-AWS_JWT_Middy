const postNoteBodyValidation = {
    before: async (request) => {
        try {
            const body = JSON.parse(request.event.body);

            if (body?.title && body?.text) {
                if (body.title.length < 51 && body.text.length < 301) {
                    return request.response;
                } else {
                    request.event.error = '400';
                    request.event.errormsg = "Title and/or text too long";
                    return request.response;
                }
            } else {
                request.event.error = '400';
                request.event.errormsg = "Title and/or text is either missing or too short";
                return request.response;
            }
        } catch (error) {
            request.event.error = '500';
            return request.response;
        }
    },
    onError: async (request) => {
        request.event.error = '401';
        request.event.errormsg = "Unknown error"
        return request.response;
    }
};

module.exports = { postNoteBodyValidation };