const fs = require('fs');
const path = require('path');
const { sendError } = require('../helpers');

module.exports = function getUserById(req, res) {
    let users;

    try {
        users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'));
    } catch(error) {
        if (error.toString().includes('no such file or directory')) {
            sendError(res, 500, 'Backend failure');
            return;
        }
    }
    console.log(users)

    const listOfUsers = users.map((user) => {
        const { id, name, email } = user;
        return { id, name, email };
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=86400');
    res.end(JSON.stringify(listOfUsers));

}