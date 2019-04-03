const router = require('express').Router()
const controller = require('../controllers/repositoryControllers')

// get all repositories
router.get('/', controller.getAllRepository)

// get a repository details
router.get('/getrepo/:owner/:repo', controller.getRepository)



module.exports = router