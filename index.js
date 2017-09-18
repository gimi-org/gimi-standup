var fs = require('fs')
const { exec } = require('child_process')
var standUpCmd = 'cd .. && gimi-standup/node_modules/git-standup/git-standup -m 1 -r origin'
var {parseStandupOutput, getOpenChromeCommandForRepo} = require('./lib')
var i18nPath = '../gimi-i18n'
var commits = 0
if(!fs.existsSync(i18nPath)) throw new Error(`Cant find: ${i18nPath}`)
exec(`cd ${i18nPath} && git fetch`, (err, stdout) => {
  console.log(`${standUpCmd} ...`)
  exec(standUpCmd, (err, stdOut) => {
    console.log(stdOut)
    stdOut = parseStandupOutput(stdOut)
    Object.keys(stdOut).forEach(key => commits = commits + stdOut[key].length)

    Object.keys(stdOut).forEach(key => {
      var cmd = getOpenChromeCommandForRepo(key, stdOut[key])
      exec(cmd)
    })

    setTimeout(() => exec(`chrome --new-window ${getAnimal(commits)}`), 1000)
  })
})

var getAnimal = (commits) => {
  var animal
  switch (true) {
    case commits <= 5: return './img/5.jpg'
    case commits <= 10: return './img/4.jpg'
    case commits <= 15: return './img/3.jpg'
    case commits <= 20: return './img/2.jpg'
    case commits <= 25: return './img/1.jpg'
    default: return './img/5.jpg'
  }
}
