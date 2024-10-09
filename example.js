import search from './lib/search.js'

async function main () {
  const queries = [
    'bigshot',
    'luvbugg',
    'ezekiel',
    'z3k3',
    'trickie',
    'snoball',
    'wprsnpr',
    'trucklz',
  ]
  for (const query of queries) {
    await search(query)
  }
}

main()