require('dotenv').config();
const puppeteer = require('puppeteer');

// Variables
const url = 'https://kith.com/collections/mens-footwear/products/cn171858c';
const size = '9';

const sneakerBot = () => {
    (async () => {
        try {
            const browser = await puppeteer.launch(
                {
                    ignoreHTTPSErrors: true,
                    headless: false,
                    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                    args: [ '--start-fullscreen' ]
                }
            )
            const page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 720 });
            const navigationPromise = page.waitForNavigation();
            
            // Load URL
            await page.goto(url);
            // Wait until page is loaded
            page.waitForNavigation({ waitUntil: 'networkidle0' });

            // Size Selector
            await page.waitForSelector('.product__swatches > .product__swatches-container > .product__swatch-select');
            await page.select('select#SingleOptionSelector-0', size);

            // Add to Cart
            await page.waitForSelector('.product__form > button.product-form__add-to-cart');
            await page.click('.product__form > button.product-form__add-to-cart');

        } catch (e) {
            console.error(e);
        }
    })();
}

sneakerBot();