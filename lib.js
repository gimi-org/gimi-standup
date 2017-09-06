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
    var commitHash

    try {
      if(x.includes('- index on')) commitHash = x.split('- index on')[1].split(':')[1].split(' ')[1]
      else commitHash = x.split(' - ')[0]
      if(!commitHash) return
      res[repo].push(commitHash)
    } catch (e) {}
  })
  return res
}

var getOpenChromeCommandForRepo = (repoName, commitHashes) => {
  var urls = commitHashes.reverse().map(hash => `https://github.com/gimi-org/${repoName}/commit/${hash}?diff=split`)
  return `chrome --new-window ${urls.join(' ')}`
}


module.exports = {
  parseStandupOutput,
  getOpenChromeCommandForRepo
}
