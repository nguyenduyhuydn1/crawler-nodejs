import fetch from "node-fetch";
import axios from "axios";
import fs from "fs";


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



(async () => {
    console.time("Time: ");
    let arr = [



    ];


    for (const x in arr) {
        let request = await fetch(`https://hentaivn.tv/list-showchapter.php?idchapshow=${arr[x].match(/\d{3,}/g)[0]}`, {
            "headers": {
                "Referer": "https://hentaivn.tv/",
            },
        });
        console.log(arr[x]);

        let pathFolder = `hvn/${arr[x].match(/(?<=\d{3,}).+(?=\.)/g)}`;
        if (!fs.existsSync(pathFolder)) fs.mkdirSync(pathFolder, { recursive: true });

        let rawListChap = await request.text();
        let listChap = rawListChap.match(/(?<=href=").+?(?="[ >])/g);
        listChap = listChap.reverse();
        console.log(listChap);

        let sttImage = 0;

        for (const v of listChap) {
            console.log(v);
            let idManga = v.match(/\d{3,}/g)[0];
            let idChap = v.match(/(?<=-)\d{3,}/g)[0];

            let rawTextListImg = await fetch(`https://hentaivn.tv/list-loadchapter-uu5484.php?id_episodexxdz=${idChap}&idchapshowz=${idManga}`, {
                "headers": {
                    "Referer": `https://hentaivn.tv/`,
                },
            }).then(v => v.text());

            let listImg = rawTextListImg.match(/(?<=src=").+?(?="[ >])/g);

            for (const itemImg in listImg) {
                await downloadFileImg(
                    listImg[itemImg],
                    sttImage,
                    pathFolder,
                    "https://hentaivn.tv/"
                );
                sttImage++;
            }
        }
    }
    console.timeEnd("Time: ");
})();
