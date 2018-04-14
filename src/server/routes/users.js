const express = require('express');
const fs      = require('fs');
const path    = require('path');

const router  = express.Router();

router.get('/', (req, res) => {
    const usersJson = fs.readFileSync(path.join(__dirname, '../resources/users_coding_test.json'));
    return res.json(JSON.parse(usersJson));
});

module.exports = router;