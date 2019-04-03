const axios = require('axios')
const ENV = require('dotenv')
ENV.config()

class LoginControolers {
  static githubLogin(req, res) {
    axios
      .post(`https://github.com/login/oauth/access_token/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.params.code}`)
      .then(({ data }) => {
        res.status(200).json({
          token: data
        })
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }
}

module.exports = LoginControolers
