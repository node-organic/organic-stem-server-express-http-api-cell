#!/usr/bin/env node

const StackUpgrade = require('organic-stack-upgrade')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)

const execute = async function ({destDir = process.cwd(), answers}) {
  let stack = new StackUpgrade({
    destDir: destDir,
    name: 'organic-stem-server-http-api-cell-template',
    version: '1.0.0'
  })
  let resulted_answers = await stack.configure({
    sourceDir: path.join(__dirname, 'seed'),
    answers
  })
  await stack.merge({
    sourceDir: path.join(__dirname, 'seed'),
    answers: resulted_answers
  })
  await stack.updateJSON()
  let cellDir = path.join(destDir, 'cells', answers['cell-name'])
  console.info('run npm install...')
  let npmOutput = await exec('npm install', {cwd: cellDir})
  console.info(npmOutput.stdout)
  console.error(npmOutput.stderr)
}

if (module.parent) {
  module.exports = execute
} else {
  execute().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
