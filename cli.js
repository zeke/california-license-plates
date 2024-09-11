#!/usr/bin/env node

const queries = process.argv.slice(2)
import chalk from 'chalk'
import search from './lib/search.js'

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

await main()
