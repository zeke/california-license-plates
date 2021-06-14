#!/usr/bin/env node

const queries = process.argv.slice(2)
const chalk = require('chalk')
const search = require('./lib/search')

async function main () {
  for (const query of queries) {
    const { available, src } = await search(query)

    if (available) {
      console.log(chalk.green(query), chalk.gray('is available!'))
    } else {
      console.log(chalk.red(query), chalk.gray('is not available :['))
    }

    console.log()
    console.log({ query, available, src })
  }
}

main()
