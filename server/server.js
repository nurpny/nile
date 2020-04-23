const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { db } = require('./db/index')
const sessionStore = new SequelizeStore({db})


// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

// .env file used to keep secrets
if (process.env.NODE_ENV !== 'production') require('dotenv').config()


// passport registration: only the user ID is serialized to the session, keeping the amount of data stored within the session small. When subsequent requests are received, this ID is used to find the user, which will be restored to req.user

// serializeUser: determines which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}

// deseserializeUser: makes a request to the DB to find the full profile information for the user then calls done(null, user) where the user profile is attached to the req handler at req.user

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch(err) {
    done(err)
  }
})

// logging middleware
app.use(morgan('dev'))

// bodyparsing middleware - parses req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// compression middleware
app.use(compression())

// session middleware and passport initiation
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passport.initialize());
app.use(passport.session());

// serving static files in public folder
app.use(express.static(path.join(__dirname,'..','public')))

// routes
app.use('/api', require('./routes/api'))
app.use('/auth', require('./routes/auth'))


// otherwise serves index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})





// error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = {app, sessionStore}
