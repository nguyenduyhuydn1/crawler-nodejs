import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import axios from "axios";
import { argv } from "process";

puppeteer.use(StealthPlugin());

const Crawler = async (obj) => {
    const {
        lightNovel,
        selectorListChap,
        folderName,
        handleText,
        handleOtherMethod,
    } = obj;

    let folderMerge = `${folderName}/merge`;
    if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);
    if (!fs.existsSync(folderMerge)) fs.mkdirSync(folderMerge);

    // initially browser
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
    // await page.setExtraHTTPHeaders({ referer });
    await page.goto(lightNovel);

    // get list chap
    let listChap = await page.evaluate((a) => {
        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);
        let listChap = [];
        eval(a);

        return listChap;
    }, selectorListChap);

    // loop list chapter
    if (handleText)
        for (const index in listChap) {
            let passCheckCloudflare = true;
            while (passCheckCloudflare) {
                console.log(index);
                await page.goto(listChap[index]);
                passCheckCloudflare = false;
                // await new Promise((reso) => setTimeout(reso, 3000));
            }

            // handle text
            let result = await page.evaluate((a) => {
                const $ = document.querySelector.bind(document);
                const $$ = document.querySelectorAll.bind(document);
                let result;
                eval(a);
                return result;
            }, handleText);

            // filter specific character
            result = result
                .replace(/([,\.])\s/g, "$1\n")
                .replace(/QUẢNG CÁO/g, "");

            fs.writeFile(`${folderName}/${index}`, result, (err) => {
                if (err) return console.log(err);
                console.log("The file was saved!");
            });
        }

    if (handleOtherMethod) eval(handleOtherMethod);

    await new Promise((reso) => setTimeout(reso, 3000));
    // browser.close();

    const lengthFolder = fs.readdirSync(folderName).length - 1;
    let numberMergeChapter = 8;
    let numberFileMerge = Math.floor(lengthFolder / numberMergeChapter);

    // save merge file
    let numPage = 0;
    let tempText = "";
    for (let i = 0; i < lengthFolder; i++) {
        let text = fs.readFileSync(`${folderName}/${i}`, "utf8");
        tempText += text;

        if (
            i % (numberMergeChapter - 1) == 0 &&
            i !== 0 &&
            numPage < numberFileMerge - 1
        ) {
            console.log(tempText.match(/Chương \d+/g));
            fs.writeFile(`${folderMerge}/${numPage}.txt`, tempText, (err) => {
                if (err) return console.log(err);
                console.log("The file was saved!");
            });
            numPage++;
            tempText = "";
        }

        if (i === lengthFolder - 1) {
            fs.writeFile(`${folderMerge}/${numPage}.txt`, tempText, (err) => {
                if (err) return console.log(err);
                console.log("end merge");
            });
        }
    }

    await new Promise((reso) => setTimeout(reso, 3000));

    fs.readdir(folderName, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlinkSync(`${folderName}/${file}`);
        }
    });
};

let args = argv.slice(2);

//vyvy
let obj = {
    lightNovel:
        args[1] ||
        "https://truyenyy.vip/truyen/dinh-cap-khi-van-lang-le-tu-luyen-ngan-nam/danh-sach-chuong/?p=3",
    selectorListChap: `$$("body > div.container.novel-detail > div.d-flex > div.left-col > div > table > tbody > tr").forEach((v) => listChap.push(v.querySelector("a").href));`,
    handleText: `let temp = $("#inner_chap_content_1 > h1");
                temp?.nextElementSibling?.remove();
                temp?.remove();

                let text = $("#inner_chap_content_1")?.textContent;
                let chapter = $("body > main > div.chapter > div.box > div.d-flex.mt-1")?.textContent.match(/Chương \\d+/g)[0];
                let nameChapter = $("body > main > div.chapter > div.box > h2")?.textContent;
                result = "\\n\\n" + chapter + nameChapter + "\\n\\n" + text;
                `,
    folderName: "AB",
};

if (args.length > 0) {
} else {
}
// obj = {
//     lightNovel:
//         args[1] ||
//         "https://truyenchu.vn/ta-chinh-la-khong-theo-sao-lo-ra-bai?page=7/#danh-sach-chuong",
//     selectorListChap: `$$("#list-chapter .list-chapter").forEach((v) => {
//         [...v.children].map((x) => listChap.push(x.querySelector("a").href));
//     });`,
//     handleOtherMethod: `let html = await axios.get(value[x]);
//                         let $ = cheerio.load(html.data);
//     `,
//     folderName: "lightnovel",
// };

Crawler(obj);
