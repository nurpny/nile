const router = require('express').Router()
const {User} = require('../db/index')

router.get('/sessionUser', (req, res) => {
  res.json(req.user)
})

router.post('/logout', (req, res) => {
  req.logout()
 req.session.destroy()
  res.redirect('/')
})



router.post('/login', async (req, res, next) => {
  try {
    const user = await User.verifyPassword(req.body.email, req.body.password)
    if (!user) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})



router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      console.log("*** SENDING ERROR MSG FROM ERR");
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})


module.exports = router
