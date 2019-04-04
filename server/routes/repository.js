const router = require('express').Router()
const controller = require('../controllers/repositoryControllers')

// get all repositories
router.get('/', controller.getAllRepository)

// get a repository details
router.get('/getrepo/:owner/:repo', controller.getRepository)

// create a repository
router.post('/', controller.createRepository)

// delete a repository
router.delete('/:owner/:repo', controller.deleteRepository)

// search user repositories
router.get('/:owner/repos', controller.searchUserRepository)

module.exports = router