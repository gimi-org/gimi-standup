var fs = require('fs')
const { exec } = require('child_process')
var standUpCmd = 'cd .. && git-standup -m 2'
var {parseStandupOutput, getOpenChromeCommandForRepo} = require('./lib')
var i18nPath = '../gimi-i18n'
if(!fs.existsSync(i18nPath)) throw new Error(`Cant find: ${i18nPath}`)

exec(`cd ${i18nPath} && git fetch`, (err, stdout) => {
  console.log(`${standUpCmd} ...`)
  exec(standUpCmd, (err, stdOut) => {
    console.log(stdOut)
    stdOut = parseStandupOutput(stdOut)
    Object.keys(stdOut).forEach(key => {
      var cmd = getOpenChromeCommandForRepo(key, stdOut[key])
      exec(cmd)
    })
  })
})
