const router = require('express').Router()
const controller = require('../controllers/loginControllers')

router.get('/login/:code', controller.githubLogin)

module.exports = router