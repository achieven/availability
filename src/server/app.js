const express    = require('express');
const app        = express();

const usersRoute = require('./routes/users');

const port    = process.env.PORT || 8000;
app.listen(port, () => {
   console.log('listening on port', port);
});

app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:8081");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
);

app.use('/users', usersRoute);
