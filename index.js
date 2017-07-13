const { exec } = require('child_process')
var standUpCmd = 'cd .. && git-standup -m 2'
var {parseStandupOutput, getOpenChromeCommandForRepo} = require('./lib')

exec("cd ../gimi-i18n && git fetch", (err, stdout) => {
  exec(standUpCmd, (err, stdOut) => {
    console.log(stdOut)
    stdOut = parseStandupOutput(stdOut)
    Object.keys(stdOut).forEach(key => {
      var cmd = getOpenChromeCommandForRepo(key, stdOut[key])
      exec(cmd)
    })
  })
})
