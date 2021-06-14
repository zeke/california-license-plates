const search = require('./lib/search')

async function main () {
  const queries = [
    'bigshot',
    'luvbugg',
    'ezekiel',
    'ezekie1',
    'z3k3',
    'trickie',
    'snoball',
    'wprsnpr',
    'trucklz',
    'truckii',
    'hithere',
    'h0wdy',
    'b0yt0y'
  ]
  for (const query of queries) {
    await search(query)
  }
}

main()

// big zee
// wrd nrd
// pen15
// red95
// zepas
// ur dad
// yourdad
// yipiooo
// dumphim
// discoho
