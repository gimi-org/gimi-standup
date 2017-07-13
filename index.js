const { exec } = require('child_process')
var standUpCmd = 'cd .. && git-standup'
var {parseStandupOutput, getOpenChromeCommandForRepo} = require('./lib')
exec(standUpCmd, (err, stdOut) => {
  stdOut = parseStandupOutput(stdOut)
  var cmd = getOpenChromeCommandForRepo(stdOut)
  exec(cmd)
})
