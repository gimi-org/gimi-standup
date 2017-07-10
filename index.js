const { exec } = require('child_process')
var standUpCmd = 'cd .. && git-standup'
var {parseStandupOutput, getOpenChromeCommandForRepo} = require('./lib')
exec(standUpCmd, (err, stdOut) => {
  stdOut = parseStandupOutput(stdOut)
  Object.keys(stdOut).forEach(key => {
    var cmd = getOpenChromeCommandForRepo(key, stdOut[key])
    exec(cmd)
  })
})
