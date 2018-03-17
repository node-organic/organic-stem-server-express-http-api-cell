const path = require('path')
module.exports = function (plasma, dna, helpers) {
  return {
    'GET': async function (req, res) {
      res.body = require(path.join(process.cwd(), 'package.json')).version
    },
    'POST': helpers.forbidden,
    'PUT': helpers.forbidden,
    'DELETE': helpers.forbidden
  }
}
