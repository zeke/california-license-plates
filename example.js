const search = require('./search')

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
