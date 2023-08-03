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

// 446105
// 446939,
// 446100,
// 446096,
// 446094,
// 446083,
// 446018,
// 445823,
// 445770,
// 444532,
// 444372,
// 444298,
// 444068,
// 443063,
// 441273,
// 441272,
// 441271,
// 441270,
// 441269,
// 441268,
// 441267,
// 441128,
// 440533,
// 439911,
// 438832,
// 438602,
// 436256,
// 434541,
// 434260,
// 432800,
// 431989,
// 431384,
// 431283,
// 431282,
// 431243,
// 431239,
// 431085,
// 430641,
// 430565,
// 430564,
// 430562,
// 430561,
// 430560,
// 430557,
// 430554,
// 430547,
// 430540,
// 430535,
// 429898,
// 428979,
// 428743,
// 427874,
// 427274,
// 427174,
// 427109,
// 427086,
// 424359,
// 423930,
// 423513,
// 423509,
// 423508,
// 423507,
// 421641,


// 421103.
// 419863.
// 419823.
// 419785.
// 419641.
// 419538.
// 418095.
// 416700.
// 416574.
// 416238.
// 415239.
// 414814.
// 414811.
// 414796.
// 414794.
// 414791.
// 414358.
// 414356.
// 414325.
// 414323.
// 414321.

// 413006,
// 412927,
// 412325,
// 412096,
// 411857,
// 411741,
// 411142,
// 410999,
// 410075,
// 410065,
// 409910,
// 409223,
// 408824,
// 408822,
// 408819,
// 408427,
// 406393,
// 404284,
// 402384,
// 396865,
// 394577,
// 391932,
// 390801,

// 385502,
// 384770,
// 379959,
// 378410,
// 375846,
// 370010,
// 368286,
// 367419,
// 366625,
// 364527,
// 363702,
// 362147,
// 361839,
// 360592,
// 360374,
// 357242,
// 355068,
// 350577,
// 349760,
// 347919,
// 335505,


//     334406,
//     334319,
//     332925,
//     332570,
//     332007,
//     331105,
//     330250,
//     326370,
//     324851,
//     323914,
//     320761,
//     318163,
//     318161,
//     318152,
//     313167,
//     312200,
//     307995,
//     307727,
//     307463,
//     299763,


//     299039,
//      298819,
//      293331,
//      286717,
//      285727,
//      284796,
//      281578,
//      280164,
//      275310,
//      273827,
//      273677,
//      272389,
//      272286,
//      272285,
//      269063,
//      268829,
//      268620,
//      268289,
//      268147,
//      268146,
//      268145,
//      267631,
//      267044,
//     266833,
//      266832,
//      266705,
//      264746,
//      264003,
//      262501,
//      261217,
//      260661,
//      260518,
//      256827,
//      256706,
//      251486,
//      250482,
//      250251,
//      249511,
//      249216,
//      248898,
//      246052,
//      242950,







//     238215,
//  233250,
//  229182,
//  229102,
//  228922,
//  226514,
//  221948,
//  221475,




// 212954,
// 212246,
// 210948,
// 206896,
// 198242,
// 196659,
// 195782,
// 195348,
// 187549,
// 161330,
// 152889,
// 152006,
// 151905,
// 144771,



// 140175,
// 139512,
// 136983,
// 124134,
// 122970,
// 120099,
// 106609,
// 106571,
// 103731,
// 103320,
// 100152,
// 98872,
// 97731,
// 94338,
// 89339,
// 87582,
// 82475,
// 82211,
// 76440,
// 73742,
// 63393,
// 54751,
// 47828,
// 28751,
// 28716,
// 26297,
// 22950,
// 19544,
// 11438,
// 9675,
// 625,
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
        
        948236,

        2583828,
        2488373,
        2479775,
        2283402,
        2188412,
        2139451,
        2109379,

        1897569,

        1882519,

        1795529,
        1793097,
        1735407,
        1705671,

        /////////////////////

        1550276,


        1459570,
        1442868,
        1442404,

        1333889,
        1307176,
        1194423,

        1162220,
        1160793,

        948236,
        938680,
        884015,
        875321,
        846477,
        814274,
        805558,
        800124,
        754271,
        718379,

        //////


        694947,
        633490,
        558614,
        303138,




        705206,
        607729,
        603491,
        515818,
        507794,
        507894,
        360543,
        289466,
        174680,
        174539,
        141701,
        97457,
        56180,
        
        11120,






        // 2597748,// tai lai


        // 2544217,
        // 2497473,
        // 2497436,
        // 2497398,
        // 2464488,
        // 2453523,
        // 2384633,
        // 2374843,
        // 2365116,
        // 2347299,
        // 2323876,

        // 2301400,
        // 2289677,
        // 2276054,
        // 2275850,
        // 2275579
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