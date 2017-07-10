var parseStandupOutput = (stdout) => {
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

var getOpenChromeCommandForRepo = (repoName, commitHashes) => {

  var urls = commitHashes.map(hash => `https://github.com/gimi-org/${repoName}/commit/${hash}`)
  return `chrome --new-window ${urls.join(' ')}`
}

module.exports = {
  parseStandupOutput,
  getOpenChromeCommandForRepo
}
