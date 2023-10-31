module.exports = {
    sendError: (res, statusCode, message ) => {
        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'text/plain');
        res.end(message);
    }
}