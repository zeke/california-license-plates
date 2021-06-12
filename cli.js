const queries = process.argv.slice(2)
const search = require('./search')

async function main () {
  for (const query of queries) {
    await search(query)
  }
}

main()
