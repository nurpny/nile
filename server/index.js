const { app, sessionStore } = require('./server')
const PORT = process.env.PORT || 8000
const { db } = require('./db/index')


sessionStore.sync().then(() => {
  console.log('sessionStore synced')
  db.sync().then(() => {
    console.log('db synced')
    app.listen(PORT, () => console.log(`App served on port ${PORT}`))
  })
})
