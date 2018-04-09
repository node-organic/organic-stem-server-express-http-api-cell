const CELL_MODE = process.argv[2]
const Cell = require('organic-stem-cell')
const path = require('path')

let cellInstance = new Cell({
  dnaSourcePaths: [
    path.resolve(__dirname, '../../dna'),
    path.resolve(__dirname, './dna')
  ],
  buildBranch: 'build',
  cellRoot: process.cwd()
})
cellInstance.start(CELL_MODE)
