const fs = require('fs');
const path = require('path');

module.exports = function deleteUser(req, res) {
    const userId = Number(req.id);

    if (!userId || isNaN(userId)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('User id must be a number more than 0');
        return;
    }

    let users;

    try {
        users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'));
    } catch(error) {
        if (error.toString().includes('no such file or directory')) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Backend failure');

            return;
        }
    }

    const userToDelete = users.find((user) => user.id === userId);

    if (!userToDelete) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`User with id '${userId}' not found`);
        return;
    }

    const filteredUsers = users.filter((user) => user.id !== userId);
    fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), JSON.stringify(filteredUsers), { encoding: 'utf-8' });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(userToDelete));
}