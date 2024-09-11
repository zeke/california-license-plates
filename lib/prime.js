import { chromium } from 'playwright';
import si from 'systeminformation';
import assert from 'node:assert';
import validate from './validate.js';

async function prime(query) {
  validate(query);

  const display = (await si.graphics()).displays[0];
  const { resolutionX } = display;

  const browser = await chromium.launch({
    headless: false,
    args: [`--window-position=${resolutionX / 2},0`]
  });
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://www.dmv.ca.gov/wasapp/ipp2/initPers.do');
  await page.click('label:has-text("By checking this box I agree to the terms stated above.")');
  await page.click('text=Continue');
  assert.equal(page.url(), 'https://www.dmv.ca.gov/wasapp/ipp2/startPers.do');

  await page.selectOption('select[name="vehicleType"]', 'AUTO');
  await page.fill('[placeholder="e.g. 1SAM123"]', '66026E3');
  await page.fill('[placeholder="e.g. 098"]', '357');
  await page.click('label[for="isRegExpire60N"]');
  await page.click('label[for="isVehLeasedN"]');
  await page.click('text=Select 1960 LEGACY $50.00 $40.00 Annual Renewal Fees >> label');

  await page.click('text=Continue');
  assert.equal(page.url(), 'https://www.dmv.ca.gov/wasapp/ipp2/processPers.do');

  await page.click('#plateChar0');

  // character inputs don't work without this delay
  // probably due to some custom event handling in the page
  await delay(500);

  for (const character of query) {
    await delay(300);
    await page.keyboard.type(character);
  }

  return { browser, context, page };
}

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export default prime;