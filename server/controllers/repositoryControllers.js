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
        console.log(response)
      })
  }

  static getRepository(req, res) {
    axi
      .get(`/repos/${req.params.owner}/${req.params.repo}/contents?${req.headers.token}`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }
}

module.exports = RepositoryController