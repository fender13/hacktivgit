const axios = require('axios')
const ENV = require('dotenv')
ENV.config()

const axi = axios.create({
  baseURL: 'https://api.github.com'
})

class RepositoryController {
  static getAllRepository(req, res) {
    axi
      .get(`/user/repos?${req.headers.token}`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(({ response }) => {
        res.status(500).json({
          error: response
        })
      })
  }

  static getRepository(req, res) {
    axi
      .get(`/repos/${req.params.owner}/${req.params.repo}/contents?${req.headers.token}`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(({ response }) => {
        res.status(500).json({
          error: response
        })
      })
  }

  static createRepository(req, res) {
    axi
      .post(`/user/repos?${req.headers.token}`, {
        name: req.body.name,
        description: req.body.description,
        private: Boolean(req.body.status),
        auto_init: Boolean('true')
      })
      .then(({ data }) => {
        res.status(201).json(data)
      })
      .catch(({ response }) => {
        res.status(500).json({
          error: response
        })
      })
  }

  static deleteRepository(req, res) {
    axi
      .delete(`/repos/${req.params.owner}/${req.params.repo}?${req.headers.token}`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(({ response }) => {
        res.status(500).json({
          error: response
        })
      })
  }

  static searchUserRepository(req, res) {
    const username = req.params.owner
      axi
        .get(`/users/${username}/repos?${req.headers.token}`)
        .then(({ data }) => {
          res.status(200).json(data)
        })
        .catch((e) => {
          res.status(200).json({
            error: e.message
          })
        })
  }
}

module.exports = RepositoryController