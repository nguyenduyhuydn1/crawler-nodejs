import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import axios from "axios";
import fs from "fs";
import { argv } from "process";

puppeteer.use(StealthPlugin());

const downloadFile = async (url, index, folder, referer) => {
    try {
        const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream",
            headers: { referer },
        });

        const w = response.data.pipe(
            fs.createWriteStream(`${folder}/${index}.jpg`)
        );
        w.on("finish", () => {
            console.log("Successfully downloaded file!");
        });
    } catch (err) {
        console.log("loi tai img : " + index);
    }
};


async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


const Crawler = async (obj) => {
    const {
        referer,
        listManga,
        selectorAllListChap,
        selectorNameOfManga,
        folderName,
        selectorAllListImage,
        domain,
    } = obj;

    if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);

    //initially browser
    const browser = await puppeteer.launch({
        headless: false,
        executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        // "C:\\Program Files\\CocCoc\\Browser\\Application\\browser.exe",
        args: [
            "--start-maximized",
            "--test-type",
            "--disable-notifications",
            "--no-sandbox",
            "--disable-gpu",
        ],
        ignoreDefaultArgs: ["--enable-automation"],
    });
    const [page] = await browser.pages();
    await page.setExtraHTTPHeaders({ referer });

    // handle listManga
    for (const itemManga of listManga) {
        // console.log("\033[2J");
        console.log("\x1b[2J");
        try {
            await page.goto(itemManga);
            await new Promise((reso) => setTimeout(reso, 1000));
        } catch (err) {
            console.error("error page --->", itemManga);
            return;
        }

        //get list chap and name of manga
        let [listChap, nameOfManga] = await page.evaluate(
            (a, b) => {
                let listChap = [];
                let listLink = document.querySelectorAll(a);
                let nameOfManga = document.querySelector(b)?.innerText;

                for (const itemLink of listLink) {
                    listChap.push(
                        itemLink.querySelector("a").getAttribute("href")
                    );
                }
                nameOfManga = nameOfManga.replace(/[\/:]/g, "-");
                listChap = listChap.reverse();

                return [listChap, nameOfManga];
            },
            selectorAllListChap,
            selectorNameOfManga
        );

        if (domain.includes("hentaivn")) {
            listChap = listChap.map((v) => `https://hentaivn.tv${v}`);
        }


        let createFolder = `./${folderName}/${nameOfManga}`;
        if (!fs.existsSync(createFolder)) fs.mkdirSync(createFolder);


        let sttImage = 0;

        // cut array, filter chapter
        listChap = listChap.slice(0);
        console.log(listChap.length, "------------------");
        if (listChap.length == 0) return;

        // get list img and download img
        for (const itemChap of listChap) {
            let passCheckCloudflare = true;
            while (passCheckCloudflare) {
                console.log(itemChap);
                await page.goto(itemChap);
                passCheckCloudflare = false;
                await new Promise((reso) => setTimeout(reso, 1000));
            }

            // await page.evaluate(async () => {
            //     await new Promise((resolve) => {
            //         var totalHeight = 0;
            //         var distance = 5000;
            //         var timer = setInterval(() => {
            //             var scrollHeight = document.body.scrollHeight;
            //             window.scrollBy(0, distance);
            //             totalHeight += distance;

            //             if (totalHeight >= scrollHeight - window.innerHeight) {
            //                 clearInterval(timer);
            //                 resolve();
            //             }
            //         }, 100);
            //     });
            // });

            console.log("ok");

            let listImg = await page.evaluate((a) => {
                let listImg = [];
                let listLink = document.querySelectorAll(a);
                for (const itemLink of listLink) {
                    listImg.push(itemLink.getAttribute('data-src'));
                }
                return listImg;
            }, selectorAllListImage);

            if (listImg.length == 0) return;
            console.log(listImg, "------------ list img");

            for (const itemImg in listImg) {
                await downloadFile(
                    listImg[itemImg],
                    sttImage,
                    createFolder,
                    referer
                );
                sttImage++;
            }
        }
        console.log("end --->", itemManga);
    }

    console.log("end-loop");
};


let obj = {
    referer: "https://hentaivn.tv/",
    listManga: [
        "https://hentaivn.autos/25683-doc-truyen-onimara.html"
    ],
    selectorAllListChap: "#inner-listshowchapter > table > tbody > tr",
    selectorNameOfManga:
        "body > div.container > div > div.page-left > div:nth-child(2) > div.page-info > h1",
    folderName: "hvn",
    selectorAllListImage: "#image img",
    domain: `https://hentaivn.tv`,
};
console.log("hentaivn");

// tim kiem the loai
// for (let x of document.querySelectorAll(
//     "body > div.container > div.main > div.block-left > div:nth-child(3) > ul:nth-child(4) > li"
// )) {
//     console.log(
//         "https://hentaivn.tv" + x.querySelector("a").getAttribute("href")
//     );
// }

// tim kiem nang cao
// for (let x of document.querySelectorAll(
//     "#container > div > div.main-box > div.box-box.textbox > ul > li"
// )) {
//     console.log(
//         "https://hentaivn.tv" + x.querySelector("a").getAttribute("href")
//     );
// }

Crawler(obj);
