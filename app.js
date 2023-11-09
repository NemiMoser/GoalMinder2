const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const eventController = require('./controllers/eventController');
const goalController = require('./controllers/goalController');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const User = require('./models/User');

const app = express();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session.
  }),
};
app.use(session(sess));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));


app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Routes for events and goals (you can define these routes)
const eventRoutes = require('./routes/event');
const goalRoutes = require('./routes/goal');
app.use('/event', eventRoutes); // Prefix for event routes
app.use('/goal', goalRoutes);  // Prefix for goal routes


app.post('/event/create', eventController.createEvent);
app.post('/goal/create', goalController.createGoal);


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize.sync({ force: false }).then(() => {

});