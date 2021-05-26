var fs = require('fs')
const { exec } = require('child_process')
const daysCommits = process.argv[2]
const author = process.argv[3]
var standUpCmd = `cd .. && gimi-standup/node_modules/git-standup/git-standup -m 1 -r origin -d ${daysCommits || 1}`
if (author) standUpCmd = `cd .. && gimi-standup/node_modules/git-standup/git-standup -m 1 -r origin -d ${daysCommits || 1} -a '${getAuthorName(author)}'`
var {parseStandupOutput, getOpenChromeCommandForRepo} = require('./lib')
var i18nPath = '../gimi-i18n'
var commits = 0
if(!fs.existsSync(i18nPath)) throw new Error(`Cant find: ${i18nPath}`)
exec(`cd ${i18nPath} && git fetch`, (err, stdout) => {
  console.log(`${standUpCmd} ...`)
  exec(standUpCmd, (err, stdOut) => {
    stdOut = parseStandupOutput(stdOut)
    Object.keys(stdOut).forEach(key => commits = commits + stdOut[key].length)

    Object.keys(stdOut).forEach(key => {
      var cmd = getOpenChromeCommandForRepo(key, stdOut[key])
      exec(cmd)
    })

    // setTimeout(() => exec(`chrome --new-window ${getAnimal(commits)}`), 1000)
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
    default: return './img/1.jpg'
  }
}

function getAuthorName (author) {
  switch (true) {
    case author === 'hristo':
      return 'hstamenov3'
    case author === 'matzie':
      return 'Mathias Eriksson'
    case author === 'martin':
      return 'Martin'
    case author === 'arvin':
      return 'Arvin Behshad'
    case author === 'anders':
      return 'anback'
    case author === 'onur':
      return 'onurersel'
    case author === 'andreas':
      return 'andreas-ftrm'
    case author === 'wisam':
      return 'wizoriousprime'
    default:
      return 'all'
  }
}
