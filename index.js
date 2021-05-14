require('dotenv').config();
const puppeteer = require('puppeteer');

const url = 'https://kith.com/collections/mens-footwear/products/cn171858c';

const sneakerBot = () => {
    (async () => {
        try {
            const browser = await puppeteer.launch(
                {
                    ignoreHTTPSErrors: true,
                    headless: false
                }
            )
            const page = await browser.newPage();
            const navigationPromise = page.waitForNavigation();
            
            // Load URL
            await page.goto(url);
            // Wait until page is loaded
            page.waitForNavigation({ waitUntil: 'networkidle0' });

        } catch (e) {
            console.error(e);
        }
    })();
}