const sanitizeHtml = require('sanitize-html');

const sanitizeMiddleware = (req, res, next) => {
    for (const key in req.body) {
        if (typeof req.body[key] === 'string') {

            req.body[key] = sanitizeHtml(req.body[key], {
                allowedTags: [], // Не позволяваме никакви HTML тагове
                allowedAttributes: {}, // Не позволяваме никакви атрибути
                textFilter: function(text) {

                    return text.replace(/[<>]/g, '');
                }
            });
        }
    }
    next();
};


module.exports = sanitizeMiddleware;
