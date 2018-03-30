const CELL_MODE = process.argv[2]

const path = require('path')
const Cell = require('organic-stem-cell')

let cellInstance = new Cell({
  dnaSourcePath: path.resolve(__dirname, '../../dna'),
  cellBranch: 'cells.{{{cell-name}}}.build',
  cellRoot: __dirname
})
cellInstance.start(CELL_MODE)
