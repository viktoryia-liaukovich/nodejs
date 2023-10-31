const fs = require('fs');
const path = require('path');
const { sendError } = require('../helpers');

module.exports = function createUser(req, res) {
    let body = '';

    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        let user;

        try {
            user = JSON.parse(body);
        } catch(err) {
            sendError(res, 400, 'User data must be a JSON');
            return;
        }

        if (!user.name || !user.email) {
            sendError(res, 400, 'User data must include name and email');
            return;
        }

        if (!user.hobbies) {
            user.hobbies = [];
        }

        let users;

        try {
            users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'));
        } catch(error) {
            if (error.toString().includes('no such file or directory')) {
                users = [];
            } else {
                sendError(res, 500, 'Backend failure');
                return;
            }
        }
        user.id = (users[users.length - 1]?.id || 0) + 1;
        users.push(user);
        fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), JSON.stringify(users), { encoding: 'utf-8' });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
    });
}