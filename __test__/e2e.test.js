const path = require('path')
const os = require('os')
const execa = require('execa')
const request = require('async-request')
const terminate = require('terminate')

const get = async function (url) {
  return request(url)
}

const timeout = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let tempDir = path.join(os.tmpdir(), 'test-stack-upgrade-' + Math.random())

test('stack upgrade', async () => {
  jest.setTimeout(60 * 1000)
  let execute = require('../index')
  await execute({
    destDir: tempDir,
    answers: {
      'cell-name': 'test',
      'cell-port': 13371
    }
  })
})

test('the cell works', async () => {
  let cmds = [
    'cd ' + tempDir,
    'node ./cells/test'
  ]
  let child = execa.shell(cmds.join(' && '))
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  await timeout(1000)
  let result = await get('http://localhost:13371/version')
  expect(result.body).toBe('"1.0.0"')
  terminate(child.pid)
})
