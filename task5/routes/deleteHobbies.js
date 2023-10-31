const fs = require('fs');
const path = require('path');
const { sendError } = require('../helpers');

module.exports = function deleteHobbies(req, res) {

    let body = '';

    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        const userId = Number(req.id);

        if (!userId || isNaN(userId)) {
            sendError(res, 400, 'User id must be a number more than 0');
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

        const userToUpdate = users.find((user) => user.id === userId);

        if (!userToUpdate) {
            sendError(res, 404, `User with id '${userId}' not found`);
            return;
        }

        try {
            const hobbiesToDelete = JSON.parse(body);
            if (Array.isArray(hobbiesToDelete)) {
                userToUpdate.hobbies = userToUpdate.hobbies.filter(hobby => !hobbiesToDelete.includes(hobby))
            } else {
                throw new Error();
            }
        } catch {
            sendError(res, 400, `Bad request: hobbies should be an array`);
            return;
        }

        fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), JSON.stringify(users), { encoding: 'utf-8' });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(userToUpdate));
    });

}