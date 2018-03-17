#!/usr/bin/env node
const stack = require('organic-stem-stack-upgrade')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)
stack.applyStackUpgrade({
  sourceDir: path.join(__dirname, 'core'),
  destDir: process.cwd()
})
  .then(() => stack.configureStackUpgrade({sourceDir: process.cwd()}))
  .then(() => {
    console.log('running npm install...')
    return exec('npm install')
  })
  .then((npmOutput) => {
    console.log(npmOutput.stdout)
    console.error(npmOutput.stderr)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
