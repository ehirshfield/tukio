import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import users from './controllers/user_controller.js';
import searchController from './controllers/search_controller.js';
import saveController from './controllers/save_controller.js';
import creditCardController from './controllers/credit_card_controller.js'
import auth from './controllers/auth_controller.js';
import cors from 'cors';
import logger from 'morgan';
import db from './models';

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
app.use('/api/save', saveController);
app.use('/api/cc', creditCardController);


db.sequelize.sync({force: true}).then(function(){
  app.listen(PORT, function(){
    console.log("Server started at port " + PORT);
  });

});
