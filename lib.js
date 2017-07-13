var fs = require('fs')
var parseStandupOutput = (stdout) => {
  stdout = stdout.split('\n')
  var res = {}

  var repo = ''
  stdout.forEach(x => {
    var isRepo = x.includes('/')
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

var getOpenChromeCommandForRepo = (stdOut) => {
  var commits = []
  Object.keys(stdOut).forEach(key => {
    commits.push({hash: stdOut[key], repo: key})
  })
  var html = []
  var content
    fs.readFile('./standupTemplate.js', 'utf8', function (err, data) {
      if (err) console.log(err)
      commits.forEach((commit) => {
        commit.hash.forEach((hash) => {
          console.warn(hash)
            var url = `https://github.com/gimi-org/${commit.repo}/commit/${hash}`
            content = data.replace('COMMIT_URL', url)
            html.push(content)
        })
      })
      fs.writeFileSync('./standup.html', html, 'utf8')
    })


  // var urls = commitHashes.reverse().map(hash => `https://github.com/gimi-org/${repoName}/commit/${hash}`)
  return `chrome --new-window ./standup.html`
}

module.exports = {
  parseStandupOutput,
  getOpenChromeCommandForRepo
}
