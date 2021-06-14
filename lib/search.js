const prime = require('./prime')
const host = 'https://www.dmv.ca.gov/wasapp/ipp2/'

async function search (query) {
  const { browser, context, page } = await prime(query)
  
  await page.click('text=Continue')
  const $errors = await page.$('#errors')

  console.log({$errors})

  const available = !$errors
  const image = await page.$('img[src^="showPlateImage.do"]')
  let src = await image?.getAttribute('src')

  if (src && !src.startsWith('http')) src = host + src

  // await context.close()
  // await browser.close()

  return {
    query,
    available,
    src
  }
}

module.exports = search
