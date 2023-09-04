import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import axios from "axios";
import fs from "fs";
import fetch from "node-fetch";


puppeteer.use(StealthPlugin());

const collectData = async (page) => {
    try {
        await page.goto('https://i5.nhentai.net/galleries/2387486/1.jpg');
        return page.evaluate(() => document.title);
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    });

    const [page] = await browser.pages();

    let data = false;
    let attempts = 0;

    while (data === false && attempts < 5) {
        data = await collectData(page);
        attempts += 1;
        if (data === false) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }

    // await page.click('body', {
    //     button: 'right',
    // });

    // await page._client.send('Page.setDownloadBehavior', {
    //     behavior: 'allow',
    //     downloadPath: 'C:/Users/huy/Downloads'
    // });

    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log("zxczxc");

    await page.keyboard.up('F12');
    // await page.keyboard.press('ArrowDown');  // move to the first item in the context menu
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // await page.keyboard.press('Enter'); // open the first item

    console.log("Xxxxxxxxxxxx");
})()