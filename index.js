var fs = require('fs')
const { exec } = require('child_process')
var standUpCmd = 'cd .. && git-standup -m 2'
var {parseStandupOutput, getOpenChromeCommandForRepo} = require('./lib')
var i18nPath = '../gimi-i18n'
var commits = 0
if(!fs.existsSync(i18nPath)) throw new Error(`Cant find: ${i18nPath}`)
exec(`cd ${i18nPath} && git fetch`, (err, stdout) => {
  console.log(`${standUpCmd} ...`)
  exec(standUpCmd, (err, stdOut) => {
    console.log(stdOut)
    stdOut = parseStandupOutput(stdOut)
    Object.keys(stdOut).forEach(key => {
      commits = commits + stdOut[key].length
    })
    Object.keys(stdOut).forEach(key => {
      var cmd = getOpenChromeCommandForRepo(key, stdOut[key])
      exec(cmd)
    })
  })
  setTimeout(() => {
    var animal
    switch (true) {
      case commits <= 5:
        animal = './img/5.jpg'
        break;
      case commits <= 10:
        animal = './img/4.jpg'
        break;
      case commits <= 15:
        animal = './img/3.jpg'
        break;
      case commits <= 20:
        animal = './img/2.jpg'
        break;
      case commits <= 25:
        animal = './img/1.jpg'
        break;
      default: animal = './img/5.jpg'
    }
    console.warn(animal)
    exec(`chrome --new-window ${animal}`)}, 500)
})
