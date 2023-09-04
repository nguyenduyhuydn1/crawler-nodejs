import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import axios from "axios";

puppeteer.use(StealthPlugin());



const downloadFileImg = async (url, index, folder, referer) => {
    let count = 0;

    let recursionDownload = async (url, index, folder, referer) => {
        try {
            const response = await axios({
                method: "GET",
                url: url,
                responseType: "stream",
                headers: { referer },
            });

            const w = response.data.pipe(
                fs.createWriteStream(`./${folder}/${index}.jpg`)
            );
            w.on("finish", () => {
                console.log("Successfully downloaded file!");
            });
        } catch (err) {
            count++;
            if (count < 10) {
                console.log("----------", count);
                await recursionDownload(url, index, folder, referer);
            } else {
                console.log("error tai index ", index);
            }
        }
    };
    await recursionDownload(url, index, folder, referer);
};




axios.interceptors.request.use(async (config) => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(config);
        }, 500);
    });
});

(async () => {
    let pathFolder = './vn';
    let referer = "https://hentaivn.autos";

    //create base folder
    if (!fs.existsSync(pathFolder)) fs.mkdirSync(pathFolder, { recursive: true });

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

    // https.+(?=\/)
    await page.setExtraHTTPHeaders({ referer });


    let listManga = [
        

        // "https://hentaivn.tv/27012-doc-truyen-ijima-yuu-gakuenchou-koudou-mariya-o-chinpo-cleaner-nigou-ni-otosu-part-2.html",
        // "https://hentaivn.tv/26849-doc-truyen-ijima-yuu-tennicir-no-joou-ga-bihin-no-chinpo-cleaner-ni-otosareru-hanashi-part-1.html",
        // "https://hentaivn.tv/26577-doc-truyen-signal-lost.html",
        // "https://hentaivn.tv/26276-doc-truyen-kuzuresaru-nichijou.html",
        // "https://hentaivn.tv/25876-doc-truyen-nang-kieu-lo-buoc.html",
        // "https://hentaivn.tv/25678-doc-truyen-yaribeya-no-oyako.html",
        // "https://hentaivn.tv/15538-doc-truyen-ban-cung-lop-cua-toi-la-vo-ba-toi-nhung-tren-giuong-co-ay-la-cua-toi-.html",
        // "https://hentaivn.tv/25636-doc-truyen-mat-ngot-chet-ruoi.html",
        // "https://hentaivn.tv/31063-doc-truyen-another-producekaede-takagaki-.html",
        // "https://hentaivn.tv/30946-doc-truyen-tro-choi-thu-tinh.html",
        // "https://hentaivn.tv/30623-doc-truyen-ayakas-diary.html",

        // "https://hentaivn.tv/19105-doc-truyen-ten-cha-duong-co-muu-do-voi-co-con-gai-.html",
        // "https://hentaivn.tv/8618-doc-truyen-sissy-a-la-carte.html",
        // "https://hentaivn.tv/29027-doc-truyen-koubi-no-le.html",
        // "https://hentaivn.tv/28910-doc-truyen-hiep-dam-nu-anh-hung.html",
        // "https://hentaivn.tv/27013-doc-truyen-ijima-yuu-kinpatsu-bakunyuu-no-russia-hitoduma-gakuenchou-koudou-maria-ga-ochirumade-part-3.html",
        // "https://hentaivn.tv/31639-doc-truyen-asashio-kai-ni-chikan.html",
        // "https://hentaivn.tv/32378-doc-truyen-souken-shimai-anetorare-.html",
        // "https://hentaivn.tv/31506-doc-truyen-anata-no-oku-san-uwaki-shitemasu-yo.html",
        // "https://hentaivn.tv/31284-doc-truyen-jun-ai-trickster.html",
        // "https://hentaivn.tv/20961-doc-truyen-reijou-shihai.html",
        // "https://hentaivn.tv/31120-doc-truyen-chuyen-nhung-qui-co-ngoai-tinh.html   ",
        // "https://hentaivn.tv/32255-doc-truyen-tsuyagari-mura.html",

        // "https://hentaivn.tv/34225-doc-truyen-hametsu-no-itte.html",
        // "https://hentaivn.tv/33873-doc-truyen-rental-tanetsuke-oji-san-27-sai-shojo-ga-tanetsuke-oji-san-10-nin-ni-hameraremashita-.html",
        // "https://hentaivn.tv/32273-doc-truyen-chu-va-chau-gai-.html",
        // "https://hentaivn.tv/19223-doc-truyen-toshoshitsu-no-kanojo.html",
        // "https://hentaivn.tv/33132-doc-truyen-nightmare.html",
        // "https://hentaivn.tv/19758-doc-truyen-tsumareta-ikoku-no-hana.html",
        // "https://hentaivn.tv/33062-doc-truyen-the-fury-of-a-god.html",
        // "https://hentaivn.tv/32759-doc-truyen-b-trayal-39-marin-kitagawa.html",
        // "https://hentaivn.tv/32474-doc-truyen-bong-cha-chong.html",

    ]
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
        let [listChap, nameOfManga] = await page.evaluate(async () => {

            // auto scroll
            new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 4000;
                var timer = setInterval(() => {
                    var scrollHeight = document?.body?.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight - window.innerHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });

            await new Promise((reso) => setTimeout(reso, 1000));
            let listChap = [];

            let listLink = document?.querySelectorAll('#inner-listshowchapter > table > tbody > tr');
            let nameOfManga = document?.querySelector('body > div.container > div > div.page-left > div:nth-child(2) > div.page-info > h1')?.innerText;
            console.log(listLink);

            for (const itemLink of listLink) {
                listChap.push(itemLink.querySelector("a").getAttribute("href"));
            }

            nameOfManga = nameOfManga.replace(/[\\/?%*:|"<>\.]/g, "-");
            listChap = (listChap.map(v => `https://hentaivn.autos${v}`)).reverse();

            return [listChap, nameOfManga];
        });


        let checkFolderMangaName = `./${pathFolder}/${nameOfManga}`;
        if (!fs.existsSync(checkFolderMangaName)) fs.mkdirSync(checkFolderMangaName, { recursive: true });


        let sttImage = 0;

        // cut array, filter chapter
        listChap = listChap.slice(0);
        console.log(listChap.length, "------------------");
        if (listChap.length == 0) return;

        // get list img and download img
        for (const itemChap of listChap) {
            console.log(itemChap);
            await page.goto(itemChap);


            let listImg = await page.evaluate(async () => {

                // // auto scroll
                // await new Promise((resolve) => {
                //     var totalHeight = 0;
                //     var distance = 5000;
                //     var timer = setInterval(() => {
                //         var scrollHeight = document?.body?.scrollHeight;
                //         window.scrollBy(0, distance);
                //         totalHeight += distance;

                //         if (totalHeight >= scrollHeight - window.innerHeight) {
                //             clearInterval(timer);
                //             resolve();
                //         }
                //     }, 100);
                // });
                await new Promise((reso) => setTimeout(reso, 2000));


                let listImg = [];
                let listLink = document?.querySelectorAll('#image img');
                console.log(listLink);

                for (const itemLink of listLink) {
                    listImg.push(itemLink.getAttribute('data-src'));
                }
                return listImg;
            });

            if (listImg.length == 0) return;
            console.log(listImg, "------------ list img");

            for (const itemImg in listImg) {
                await downloadFileImg(listImg[itemImg], sttImage, checkFolderMangaName, referer);
                sttImage++;
            }
        }
        console.log("end --->", itemManga);
    }

    console.log("end-loop");
    browser.close();
})();

// tim kiem the loai
// for (let x of document.querySelectorAll("div.container > div.main ul:nth-child(4) > li")) {
//     console.log(
//         "https://hentaivn.tv" + x.querySelector("a").getAttribute("href")
//     );
// }

// tim kiem nang cao
// for (let x of document.querySelectorAll("#container > div > div.main-box > div.box-box.textbox > ul > li")) {
//     console.log(
//         "https://hentaivn.tv" + x.querySelector("a").getAttribute("href")
//     );
// }
