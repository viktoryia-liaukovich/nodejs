const fs = require('fs');
const path = require('path');
const { sendError } = require('../helpers');

module.exports = function getUserById(req, res) {
    const userId = Number(req.id);

    if (!userId || isNaN(userId)) {
        sendError(res, 400, 'User id must be a number more than 0')
        return;
    }

    let users;

    try {
        users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'));
    } catch(error) {
        if (error.toString().includes('no such file or directory')) {
            sendError(res, 500, 'Backend failure');
            return;
        }
    }

    const user = users.find((user) => user.id === userId);

    if (!user) {
        sendError(res, 404, `User with id '${userId}' not found`);
        return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=86400');
    res.end(JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        links: [
            {
                rel: 'hobbies',
                href: `/user/hobbies/${user.id}`,
            }
        ]
    }));

}