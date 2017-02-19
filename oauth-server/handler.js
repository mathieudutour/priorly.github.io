var https = require('https')
var qs = require('querystring')

function authenticate (code, cb) {
  var data = qs.stringify({
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    code: code
  })

  var reqOptions = {
    host: process.env.OAUTH_HOST,
    port: process.env.OAUTH_PORT || 443,
    path: process.env.OAUTH_PATH,
    method: process.env.OAUTH_METHOD || 'POST',
    headers: { 'content-length': data.length }
  }

  var body = ''
  var req = https.request(reqOptions, function (res) {
    res.setEncoding('utf8')
    res.on('data', function (chunk) { body += chunk })
    res.on('end', function () {
      var token = qs.parse(body).access_token
      cb(!token && new Error('missing access token'), token)
    })
  })

  req.write(data)
  req.end()
  req.on('error', function (e) { cb(e.message) })
}

module.exports.oauthCallback = (event, context, callback) => {
  authenticate(event.code, function (err, token) {
    const response = {
      statusCode: err ? 400 : 200,
      body: JSON.stringify(err
        ? { error: 'bad_code' }
        : { token: token }
      )
    }
    callback(null, response)
  })
}
