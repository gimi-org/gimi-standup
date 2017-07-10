var username = require('git-user-name')()
var cheerio = require('cheerio')
var rp = require('request-promise')

const { exec } = require('child_process')
var cmd = 'cd .. && git-standup'

var parseStandupOutput = (error, stdout, stderr) => {
  stdout = stdout.split('\n')
  var res = {}

  var repo = ''
  stdout.forEach(x => {
    var isRepo = x.includes('/gimi')
    if(isRepo) {
      repo = x.split('/').pop()
      return
    }

    if(!repo) return
    if(!res[repo]) res[repo] = []
    var commitHash = x.split(' - ')[0]
    res[repo].push(commitHash)
  })
  return res
}

// exec(cmd, parseStandupOutput)

module.exports = {
  parseStandupOutput
}
