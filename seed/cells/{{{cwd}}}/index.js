const CELL_MODE = process.argv[2]
const Cell = require('organic-stem-cell')

let cellInstance = new Cell({
  dnaSourcePaths: [require('lib/full-dna-path')],
  buildBranch: 'cells.{{{dna-cell-path}}}.{{{cell-name}}}.build',
  cellRoot: __dirname
})
cellInstance.start(CELL_MODE)
