const path = require('path');
const helpers = require('./utils/helpers')
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const sequelize = require('./config/connection');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/'));


sequelize.sync({ force: false })
.then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});