// import { chromium } from "playwright-extra";

import fs from "fs";
import axios from "axios";
// import stealth from "puppeteer-extra-plugin-stealth";

// chromium.use(stealth());


const downloadFileImg = async (fileUrl, index, folder) => {
    let count = 0;

    const recursionDownload = async (fileUrl, index, folder) => {
        try {
            if (count > 10) count = 0;
            const response = await axios({
                method: "GET",
                url: fileUrl,
                responseType: "stream",
                headers: { referer: "https://nhentai.net" },
            });

            const w = response.data.pipe(
                fs.createWriteStream(`./nhen/${folder}/${index}.jpg`)
            );
            w.on("finish", () => {
                console.log("Successfully downloaded file!");
            });
        } catch (err) {
            count++;

            if (count > 10)
                await recursionDownload(
                    err.config.url.replace("jpg", "png"),
                    index,
                    folder
                );
            else
                await recursionDownload(
                    err.config.url.replace("png", "jpg"),
                    index,
                    folder
                );
        }
    };
    await recursionDownload(fileUrl, index, folder);
};

//monitorEvents(window, ["keypress", "keyup", "click"])


// chromium.launch({ headless: false }).then(async (browser) => {
// const page = await browser.newPage();

// let nhentaiCode = [

// ];

// let duration = 20000;
// for (let x of document.querySelectorAll("#content > div.container.index-container > div > a")) {
//     console.log(
//         x.getAttribute('href').match(/\d{3,}/g)[0]
//     );
// }


// for (const x of nhentaiCode) {

//     let pass = true;
//     while (pass) {
//         try {
//             await page.goto(`https://nhentai.net/g/${x}/`, {
//                 waitUntil: 'load',
//                 timeout: 0
//             });

//             console.log(page.url(), "!111");
//             pass = false;
//             await new Promise((reso) => setTimeout(reso, duration));
//         } catch (err) {
//             await new Promise((reso) => setTimeout(reso, 3000));
//             console.error(err.message);
//         }
//     }
//     duration = 5000;


// let value = await page.evaluate(() => {
//     let number = document.querySelector(
//         "#tags > div:nth-last-child(2) > span > a > span"
//     ).textContent;
//     let numberOfPage = document
//         .querySelectorAll(
//             "#thumbnail-container .thumbs > .thumb-container"
//         )[0]
//         .querySelector("img")
//         .src.match(/(?<=\/)\d+(?=\/)/g)[0];
//     return { number: +number, numberOfPage };
// });


//     if (!fs.existsSync(`./nhen/${x}`)) {
//         fs.mkdirSync(`./nhen/${x}`);
//     }

//     for (let i = 1; i <= value.number; i++) {
//         console.log(i);
//         await downloadFileImg(
//             `https://i5.nhentai.net/galleries/${value.numberOfPage}/${i}.jpg`,
//             i,
//             x
//         );
//     }
//     console.log("end", x);
// }
// });











//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(async () => {


    const downloadFileImg2 = async (fileUrl, index, folder, obj) => {
        let count = 0;

        const recursionDownload = async (fileUrl, index, folder, obj) => {
            try {
                if (obj.error < 10) {

                    if (count > 10) count = 0;
                    const response = await axios({
                        method: "GET",
                        url: fileUrl,
                        responseType: "stream",
                        headers: { referer: "https://nhentai.net" },
                    });

                    const w = response.data.pipe(
                        fs.createWriteStream(`./nhen/${folder}/${index}.jpg`)
                    );
                    w.on("finish", () => {
                        obj.error = 0;
                        console.log(obj);

                        console.log("Successfully downloaded file!");
                    });
                }
            } catch (err) {
                count++;
                obj.error++;
                console.log(obj.error, "--------------");

                if (obj.error < 10) {
                    if (count > 10)
                        await recursionDownload(
                            err.config.url.replace("jpg", "png"),
                            index,
                            folder,
                            obj
                        );
                    else
                        await recursionDownload(
                            err.config.url.replace("png", "jpg"),
                            index,
                            folder,
                            obj
                        );
                }
            }
        };
        await recursionDownload(fileUrl, index, folder, obj);
    };

    // for (let x of document.querySelectorAll("#content > div.container.index-container > div > a > img")) {
    //     console.log(
    //         x.getAttribute('data-src').match(/\d{3,}/g)[0]
    //     );
    // }
    let nh2 = [
      
    ];

    let obj = {
        error: 0
    };

    for (const x of nh2) {
        if (!fs.existsSync(`./nhen/${x}`)) {
            fs.mkdirSync(`./nhen/${x}`);
        }
        console.log(`https://i5.nhentai.net/galleries/${x}/1.jpg`);
        for (let i = 1; i <= 600; i++) {
            await downloadFileImg2(
                `https://i5.nhentai.net/galleries/${x}/${i}.jpg`,
                i,
                x,
                obj
            );
        }
        obj.error = 0;
        console.log("end", x);
    }
})();
