const { chromium } = require('playwright')
const assert = require('assert')
const chalk = require('chalk')
const MAX_CHARS = 7
const si = require('systeminformation')

async function search (query) {
  assert(typeof query === 'string')
  assert(query.length)
  assert(query.length <= MAX_CHARS)

  const display = (await si.graphics()).displays[0]
  const { resolutionX, resolutionY } = display

  const browser = await chromium.launch({
    headless: false,
    args: [`--window-position=${resolutionX / 2},0`]
  })
  const context = await browser.newContext()

  const page = await context.newPage()

  // Go to https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/california-license-plates/order-special-interest-and-personalized-license-plates/
  await page.goto('https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/california-license-plates/order-special-interest-and-personalized-license-plates/')

  // Click text=Order personalized plates
  await page.click('text=Order personalized plates')
  assert.equal(page.url(), 'https://www.dmv.ca.gov/wasapp/ipp2/initPers.do')

  // Click label:has-text("By checking this box I agree to the terms stated above.")
  await page.click('label:has-text("By checking this box I agree to the terms stated above.")')

  // Click text=Continue
  await page.click('text=Continue')
  assert.equal(page.url(), 'https://www.dmv.ca.gov/wasapp/ipp2/startPers.do')

  // Select AUTO
  await page.selectOption('select[name="vehicleType"]', 'AUTO')
  await page.fill('[placeholder="e.g. 1SAM123"]', '66026E3')
  await page.fill('[placeholder="e.g. 098"]', '357')
  await page.click('label[for="isRegExpire60N"]')
  await page.click('label[for="isVehLeasedN"]')
  await page.click('text=Select 1960 LEGACY $50.00 $40.00 Annual Renewal Fees >> label')

  await page.click('text=Continue')
  assert.equal(page.url(), 'https://www.dmv.ca.gov/wasapp/ipp2/processPers.do')

  await page.click('#plateChar0')
  await delay(250)

  for (const character of query) {
    await page.keyboard.type(character)
  }

  await page.click('text=Continue')

  const $errors = await page.$('#errors')

  if ($errors) {
    console.log(chalk.red(query), chalk.gray('is not available :['))
  } else {
    console.log(chalk.green(query), chalk.gray('is available!'))
  }

  await context.close()
  await browser.close()
}

function delay (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

module.exports = search
