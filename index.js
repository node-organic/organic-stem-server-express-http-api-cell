#!/usr/bin/env node

const StackUpgrade = require('organic-stack-upgrade')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)

const execute = async function () {
  let stack = new StackUpgrade({
    destDir: process.cwd(),
    name: 'organic-stem-server-http-api-cell-template',
    version: '1.0.0'
  })
  await stack.configureMergeAndUpdateJSON({
    sourceDir: path.join(__dirname, 'core')
  })
  console.info('run npm install...')
  let npmOutput = await exec('npm install')
  console.info(npmOutput.stdout)
  console.error(npmOutput.stderr)
}

execute().catch((err) => {
  console.error(err)
  process.exit(1)
})
