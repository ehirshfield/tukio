const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./controllers/user_controller.js');
const searchController = require('./controllers/search_controller.js');
const eventController = require('./controllers/event_controller.js');
const creditCardController = require('./controllers/credit_card_controller.js');
const userCredController = require('./controllers/user_cred_controller.js');
const auth = require('./controllers/auth_controller.js');
const cors = require('cors');
const logger = require('morgan');
const db = require('./models');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));

app.use(cors());

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', searchController);
app.use('/api/save', eventController);
app.use('/api/save', userCredController);
app.use('/api/cc', creditCardController);


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("Server started at port " + PORT);
    });

});