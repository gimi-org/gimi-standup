var testoutput = `/Users/andersback/Projects/gimi
9550abffd - trigger (17 hours ago) <andersback>
2bed7fc10 - trigger (17 hours ago) <andersback>
/Users/andersback/Projects/gimi-web
1965f40 - Version Bump (2 hours ago) <andersback>
17581b4 - hasSeenCookieWarning = true (2 hours ago) <andersback>
c45c094 - Version Bump (4 hours ago) <andersback>
67f7f12 - update i18n (4 hours ago) <andersback>
68ba48f - another hasSeenCookieFix (5 hours ago) <andersback>
48e9082 - Version Bump (17 hours ago) <andersback>
1b4326f - Version Bump (17 hours ago) <andersback>
6c36f10 - update i18n (17 hours ago) <andersback>
25c7b17 - Version Bump (17 hours ago) <andersback>
be47aa8 - hasSeenCookieWarning = true (17 hours ago) <andersback>`

var {parseStandupOutput, getOpenChromeCommandForRepo} = require('../lib')

it('can parse test output', () => {
  expect(parseStandupOutput(testoutput)).toMatchSnapshot()

})

it('getOpenChromeCommandForRepo', () => {
  var whatever = { 'gimi-app': [ '9550abffd', '2bed7fc10' ],
      'gimi-web': [ '1965f40',
         '17581b4',
         'c45c094',
         '67f7f12',
         '68ba48f',
         '48e9082',
         '1b4326f',
         '6c36f10',
         '25c7b17',
         'be47aa8' ]
       }

  expect(getOpenChromeCommandForRepo('gimi-app', whatever['gimi-app'])).toMatchSnapshot()
})
