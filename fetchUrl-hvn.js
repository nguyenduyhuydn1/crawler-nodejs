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




         "           https://hentaivn.tv/13864-doc-truyen-the-young-wolf-and-the-seven-goats.html",
        //  "https://hentaivn.tv/13393-doc-truyen-what-invades-the-absolute-territory.html",
        //  "https://hentaivn.tv/13298-doc-truyen-monster-route-re-zero.html",
        //  "https://hentaivn.tv/13261-doc-truyen-kinyou-no-yoru-no-ouse.html",
        //  "https://hentaivn.tv/13180-doc-truyen-kimi-ga-kawaisugiru-kara.html",
        //  "https://hentaivn.tv/13033-doc-truyen-donna-ko-mo-sefri-ni-dekichau-saiminjutsu-o-te-ni-ireta-saimin-shihai-kakudai-hen.html",
        //  "https://hentaivn.tv/12919-doc-truyen-bakunyuu-tsuma-namatamari-kyouko-sekuhara-buchou-ni-nerawareta-tsuma-.html",
        //  "https://hentaivn.tv/12888-doc-truyen-shoujo-kougyaku.html",
        //  "https://hentaivn.tv/12752-doc-truyen-this-is-art.html",
        //  "https://hentaivn.tv/12870-doc-truyen-ung-dung-rac-ruoi.html",
        //  "https://hentaivn.tv/12846-doc-truyen-cfg-maniax-vol-1.html",
        //  "https://hentaivn.tv/12839-doc-truyen-khoa-mom-be-chiruno-bang-cach-cat-co-touhou.html",
        //  "https://hentaivn.tv/12668-doc-truyen-chrono-execution-date-a-live.html",
        //  "https://hentaivn.tv/12663-doc-truyen-bi-cuong-buc-that-vui-boku-wa-tomodachi-ga-sukunai.html",
        //  "https://hentaivn.tv/12423-doc-truyen-hentai-shounen-jun-no-koufuku-na-hibi.html",




        // "https://hentaivn.tv/15389-doc-truyen-rape-ni-akogareteru-onnanoko-ga-yamagoya-ni-hitori-de-itara.html",
        // "https://hentaivn.tv/15275-doc-truyen-nguoi-me-dam-dang-va-cau-con-co-con-ca-cha-bac.html",
        // "https://hentaivn.tv/14554-doc-truyen-chuyen-tinh-hon-ma-va-xa-phong.html",
        // "https://hentaivn.tv/14962-doc-truyen-bitch-mama-to-mesumusuko.html",
        // "https://hentaivn.tv/14854-doc-truyen-oishii-yasai-no-tsukurikata.html",
        // "https://hentaivn.tv/14634-doc-truyen-usokki-bitch-no-shotaiken.html",
        // "https://hentaivn.tv/14525-doc-truyen-bo-mong-khung-bo-cua-keiko-va-lao-bo-chong-bien-thai.html",
        // "https://hentaivn.tv/14470-doc-truyen-momoka-private-girls-institute-takako-todos-punishment-training-record-fifth-grade-yukimi-mochizuki-edition.html",
        // "https://hentaivn.tv/13292-doc-truyen-girlie-vol-4.html",
        // "https://hentaivn.tv/14277-doc-truyen-meguro.html",
        // "https://hentaivn.tv/13441-doc-truyen-shadow-ranger-zero-khoi-nguon-cua-cai-ket.html",
        // "https://hentaivn.tv/14126-doc-truyen-girls-fight-arisa-hen.html",
        // "https://hentaivn.tv/14069-doc-truyen-dau-truong-tinh-duc.html",
        // "https://hentaivn.tv/14011-doc-truyen-shoujo-wo-omocha-ni-suru-hanashi.html",
        // "https://hentaivn.tv/13888-doc-truyen-tengoku-no-mosaic.html",




        // "            https://hentaivn.tv/17177-doc-truyen-kogal-crisis.html",
        // "https://hentaivn.tv/17026-doc-truyen-happening.html",
        // "https://hentaivn.tv/16998-doc-truyen-khoang-thoi-gian-den-toi-3-k-on.html",
        // "https://hentaivn.tv/16987-doc-truyen-khoang-thoi-gian-den-toi-2-k-on.html",
        // "https://hentaivn.tv/16982-doc-truyen-khoang-thoi-gian-den-toi-k-on.html",
        // "https://hentaivn.tv/16692-doc-truyen-sister-island.html",
        // "https://hentaivn.tv/16833-doc-truyen-tadokoro-chan-shintai-kensa.html",
        // "https://hentaivn.tv/16590-doc-truyen-resident-evilbao-cao-nhiem-vu.html",
        // "https://hentaivn.tv/16514-doc-truyen-ruoi-nhang-bien-thai.html",
        // "https://hentaivn.tv/16498-doc-truyen-hinata-hinata-yuuhan-wa-hinata-da-nekomiya-hinata.html",
        // "https://hentaivn.tv/16430-doc-truyen-star-guardian-lux-is-horny-league-of-legends.html",
        // "https://hentaivn.tv/16218-doc-truyen-kotori-fate-stay-night.html",
        // "https://hentaivn.tv/15854-doc-truyen-quy-tu-thien.html",
        // "https://hentaivn.tv/15533-doc-truyen-chung-em-het-long-vi-benh-nhan.html",
        // "https://hentaivn.tv/15519-doc-truyen-reina-ngoan-lam-co.html",


        // "https://hentaivn.tv/19336-doc-truyen-me-toi-la-pho-cong-cong.html",
        // "https://hentaivn.tv/19324-doc-truyen-irakabeshi-sugite-atama-ga-okashiku-natta-hito-ga-kangaeta-sao-hon.html",
        // "https://hentaivn.tv/19282-doc-truyen-ban-gai-bi-cam-sung.html",
        // "https://hentaivn.tv/19232-doc-truyen-buoi-tap-dien-xuat-cua-ichika.html",
        // "https://hentaivn.tv/19158-doc-truyen-cau-nhoc-hang-xom-nghich-ngom-cua-toi.html",
        // "https://hentaivn.tv/18718-doc-truyen-tenku-no-bitch-tsuma.html",
        // "https://hentaivn.tv/18997-doc-truyen-debushota-ga-ofuro-de-harem-joutai.html",
        // "https://hentaivn.tv/18745-doc-truyen-me-va-be.html",
        // "https://hentaivn.tv/18561-doc-truyen-used-but-in-perfect-condition.html",
        // "https://hentaivn.tv/18268-doc-truyen-hay-day-no-vao-trong-em.html",
        // "https://hentaivn.tv/6910-doc-truyen-doraemon-va-bi-mat-dong-troi.html",
        // "https://hentaivn.tv/17841-doc-truyen-moshimo-uchi-no-chaldea-ni-◯◯-ga-kitara-2-fate-grand-order.html",
        // "https://hentaivn.tv/17711-doc-truyen-heart-switch-the-other-side-of-an-honor-student-.html",
        // "https://hentaivn.tv/17603-doc-truyen-hyakkasou-3-hekigan-rasetsu-no-gyakushuu.html",
        // "https://hentaivn.tv/17305-doc-truyen-papacon.html",

        // "            https://hentaivn.tv/20493-doc-truyen-incident-outbreak-pervert-vs-hentai-.html",
        // "https://hentaivn.tv/20428-doc-truyen-iya-da-to-ienai-jimikei-shoujo.html",
        // "https://hentaivn.tv/20361-doc-truyen-victimgirlsr-watashi-wa-makemasen.html",
        // "https://hentaivn.tv/20264-doc-truyen-compensated-cheering.html",
        // "https://hentaivn.tv/20228-doc-truyen-depraved-educator.html",
        // "https://hentaivn.tv/20197-doc-truyen-blind-spot-of-good-will.html",
        // "https://hentaivn.tv/20180-doc-truyen-i-will-protect-everyone.html",
        // "https://hentaivn.tv/20027-doc-truyen-magic-public-toilet-girl-illya-endless-fuck-2-fate-kaleid-liner-prisma-illya.html",
        // "https://hentaivn.tv/19038-doc-truyen-mazo-shino.html",
        // "https://hentaivn.tv/19980-doc-truyen-bricola-7-h-na-wakazuma-orihime-san.html",
        // "https://hentaivn.tv/19953-doc-truyen-thu-gui-miseria.html",
        // "https://hentaivn.tv/19173-doc-truyen-dong-xu-d.html",
        // "https://hentaivn.tv/19897-doc-truyen-ban-bo-me-bon-duc-quoc-xa.html",
        // "https://hentaivn.tv/19695-doc-truyen-vi-bell.html",
        // "https://hentaivn.tv/19337-doc-truyen-nang-heo-suzy-tonjou-suzy.html",



        // "            https://hentaivn.tv/21419-doc-truyen-thicker-than-water.html",
        // "https://hentaivn.tv/21377-doc-truyen-b-trayal-22.html",
        // "https://hentaivn.tv/20715-doc-truyen-tuyen-tap-bi-kip-lai-may-bay.html",
        // "https://hentaivn.tv/21132-doc-truyen-houjou-no-reizoku-elf-6.html",
        // "https://hentaivn.tv/21098-doc-truyen-mahou-no-koushuu-toile-illya-fuck-hikenai.html",
        // "https://hentaivn.tv/21069-doc-truyen-doc-duoc-cua-loai-quy-2-fate-grand-order.html",
        // "https://hentaivn.tv/21051-doc-truyen-doc-duoc-cua-loai-quy-fate-grand-order.html",
        // "https://hentaivn.tv/20962-doc-truyen-giao-duc.html",
        // "https://hentaivn.tv/21004-doc-truyen-ke-trom.html",
        // "https://hentaivn.tv/20967-doc-truyen-houjou-no-reizoku-elf-5.html",
        // "https://hentaivn.tv/20954-doc-truyen-pallum-no-tokubetsu-na-tsukaikata-official.html",
        // "https://hentaivn.tv/16844-doc-truyen-hypno-cuong-ep-giao-phoi-tinh-yeu.html",
        // "https://hentaivn.tv/20767-doc-truyen-buta-to-present.html",
        // "https://hentaivn.tv/20685-doc-truyen-jk-manual.html",
        // "https://hentaivn.tv/20495-doc-truyen-pho-cham-chi.html",

        // "            https://hentaivn.tv/23399-doc-truyen-viewer-discretion-advised.html",
        // "https://hentaivn.tv/23403-doc-truyen-so-hai-1-cai-lon-hu-khong.html",
        // "https://hentaivn.tv/23354-doc-truyen-never-forget-never-forgive.html",
        // "https://hentaivn.tv/23015-doc-truyen-nhan-qua.html",
        // "https://hentaivn.tv/22803-doc-truyen-chikan-no-sonzai-shinai-subarashii-sekai.html",
        // "https://hentaivn.tv/22406-doc-truyen-hiep-dam-kaguya.html",
        // "https://hentaivn.tv/22413-doc-truyen-home-body.html",
        // "https://hentaivn.tv/22307-doc-truyen-tokai-no-iro-ni-somaru-kanojo.html",
        // "https://hentaivn.tv/22229-doc-truyen-lets-get-horny.html",
        // "https://hentaivn.tv/22075-doc-truyen-bi-sep-mang-thi-lam-gi.html",
        // "https://hentaivn.tv/20853-doc-truyen-elf-slave.html",
        // "https://hentaivn.tv/21808-doc-truyen-good-teachers-are-easy-too.html",
        // "https://hentaivn.tv/21710-doc-truyen-until-were-together-at-last.html",
        // "https://hentaivn.tv/21432-doc-truyen-nang-luc-bi-mat-cua-sieu-nang-luc-gia-level-5.html",
        // "https://hentaivn.tv/21437-doc-truyen-houkago-no-kanojo-wa-neburarete-naku-.html",



        // "            https://hentaivn.tv/25269-doc-truyen-the-pink-album.html",
        // "https://hentaivn.tv/25174-doc-truyen-mua-va-ban.html",
        // "https://hentaivn.tv/25044-doc-truyen-trai-nghiem-tinh-duc-cua-hai-cau-be-moi-lon.html",
        // "https://hentaivn.tv/19231-doc-truyen-b-trayal-13 .html",
        // "https://hentaivn.tv/24789-doc-truyen-black-beretta-black-lagoon.html",
        // "https://hentaivn.tv/24703-doc-truyen-grander.html",
        // "https://hentaivn.tv/24349-doc-truyen-ienai-～erika～.html",
        // "https://hentaivn.tv/24241-doc-truyen-ghislaine-goblin-taiji-e-iku-mushoku-tensei-isekai-ittara-honki-dasu-.html",
        // "https://hentaivn.tv/19927-doc-truyen-fdo-fate-dosukebe-order-fate-grand-order.html",
        // "https://hentaivn.tv/24032-doc-truyen-a-medicine-for-mating-with-a-rabbit-in-heat-until-morning-touhou-project.html",
        // "https://hentaivn.tv/23842-doc-truyen-chau-gai-de-thuong-cua-toi.html",
        // "https://hentaivn.tv/23852-doc-truyen-saenai-otoko-kara-no-netorikata.html",
        // "https://hentaivn.tv/20007-doc-truyen-voyeur.html",
        // "https://hentaivn.tv/23586-doc-truyen-be-lon-chay-du-em-nhu-1-con-cho-.html",
        // "https://hentaivn.tv/10515-doc-truyen-kogals-sluts-and-whatever.html",



        // "            https://hentaivn.tv/27148-doc-truyen-khong-loi-thoat.html",
        // "https://hentaivn.tv/27062-doc-truyen-re-zero-kara-hajimeru-elsa-oba-san-haramase-seikatsu.html",
        // "https://hentaivn.tv/26852-doc-truyen-pig-hole.html",
        // "https://hentaivn.tv/26727-doc-truyen-taisetsu-na-futari-o-uragiru-ntr.html",
        // "https://hentaivn.tv/15694-doc-truyen-chino-chan-wa-goshuushin.html",
        // "https://hentaivn.tv/26489-doc-truyen-chuyen-tau-dang-xau-ho.html",
        // "https://hentaivn.tv/26231-doc-truyen-shonen-after-school.html",
        // "https://hentaivn.tv/26139-doc-truyen-mushi-ai.html",
        // "https://hentaivn.tv/25708-doc-truyen-toi-se-dit-het-waifu-cua-cac-ban.html",
        // "https://hentaivn.tv/25637-doc-truyen-con-ghe-toc-vang.html",
        // "https://hentaivn.tv/25203-doc-truyen-maki-chan.html",
        // "https://hentaivn.tv/24914-doc-truyen-toi-hanh-phuc-khi-bi-cam-sung.html",
        // "https://hentaivn.tv/11845-doc-truyen-tuyen-tap-kinh-di-cua-suehiro-maruo-bong-hong-nhuom-mau-quy-du.html",
        // "https://hentaivn.tv/25413-doc-truyen-hypnotic-sexual-counseling-natsumi-obata.html",
        // "https://hentaivn.tv/24929-doc-truyen-co-ban-gai-khong-co-kien-thuc-ve-tinh-duc-cua-toi-la-bon-chua-tinh-cho-mot-thang-oat-con.html",

        // "            https://hentaivn.tv/18684-doc-truyen-hypno-blink.html",
        // "https://hentaivn.tv/28966-doc-truyen-getting-fucked-through-public-exhibitionism.html",
        // "https://hentaivn.tv/28900-doc-truyen-amano-megumi-wa-chinpo-suki-na-dake.html",
        // "https://hentaivn.tv/23545-doc-truyen-sexual-relief-ultramarine.html",
        // "https://hentaivn.tv/28355-doc-truyen-thieu-nien-va-con-cac-than-thanh.html",
        // "https://hentaivn.tv/28386-doc-truyen-trong-co-the-nu-sinh-18-.html",
        // "https://hentaivn.tv/28193-doc-truyen-tinh-yeu-hoang-tuong.html",
        // "https://hentaivn.tv/27974-doc-truyen-b-trayal-32.html",
        // "https://hentaivn.tv/27828-doc-truyen-qiyana-o-bilgewater.html",
        // "https://hentaivn.tv/27760-doc-truyen-am-uot-hoang-dai.html",
        // "https://hentaivn.tv/27694-doc-truyen-vo-nhat.html",
        // "https://hentaivn.tv/27348-doc-truyen-hikari-va-nang-nhen-.html",
        // "https://hentaivn.tv/27322-doc-truyen-gai-goi-cao-cap.html",
        // "https://hentaivn.tv/27253-doc-truyen-now-shes-mine.html",
        // "https://hentaivn.tv/19262-doc-truyen-gotoubun-no-seidorei-side-a-gotoubun-no-hanayome.html",


        // "            https://hentaivn.tv/31078-doc-truyen-co-lao-cong.html",
        // "https://hentaivn.tv/30827-doc-truyen-vong-xoay-cuoc-doi.html",
        // "https://hentaivn.tv/22950-doc-truyen-rape-of-demon-slayer.html",
        // "https://hentaivn.tv/30931-doc-truyen-mesugaki-ni-natte-mesugaki-ni-wakarasarechattara.html",
        // "https://hentaivn.tv/30763-doc-truyen-dick-standing-.html",
        // "https://hentaivn.tv/30499-doc-truyen-tenpu-no-ecchi-ex-fate-grand-order.html",
        // "https://hentaivn.tv/30018-doc-truyen-i-can-jerk-off-to-my-mom-rewrite.html",
        // "https://hentaivn.tv/29965-doc-truyen--cho-den-khi-chi-dau-cua-toi-co-thai-.html",
        // "https://hentaivn.tv/29336-doc-truyen-ly-do-tai-sao-toi-di-an-cap-vat.html",
        // "https://hentaivn.tv/28546-doc-truyen-thieu-nien-va-con-cac-than-thanh-phan-cuoi.html",
        // "https://hentaivn.tv/29450-doc-truyen-nhung-mon-do-choi-toi-loi.html",
        // "https://hentaivn.tv/29137-doc-truyen-ba-me-dam.html",
        // "https://hentaivn.tv/29041-doc-truyen-cai-lon-do-ban-dan-don-vo-dung-xau-xi-cua-con-di-dau-to-mat-can.html",
        // "https://hentaivn.tv/28960-doc-truyen-tu-mot-em-gai-ngay-tho-den-mot-con-pho-so-mot.html",
        // "https://hentaivn.tv/28969-doc-truyen-ankoku-gyaku-esthe.html",


        // "            https://hentaivn.tv/32141-doc-truyen-stay-with-me.html",
        // "https://hentaivn.tv/15486-doc-truyen-su-hy-sinh-cua-nguoi-vo.html",
        // "https://hentaivn.tv/27810-doc-truyen-hoc-vien-khieu-dam.html",
        // "https://hentaivn.tv/28840-doc-truyen-sexual-training-camp.html",
        // "https://hentaivn.tv/31887-doc-truyen-otosareta-z46-chan.html",
        // "https://hentaivn.tv/31637-doc-truyen-kanmusu-chakunin-dairoku-kuchikutai-soushuuhen.html",
        // "https://hentaivn.tv/31304-doc-truyen-buc-hinh-bi-ma-am.html",
        // "https://hentaivn.tv/31511-doc-truyen-girls-just-love-the-sex-ed-teacher.html",
        // "https://hentaivn.tv/31459-doc-truyen-tam-tang-khoai-cam.html",
        // "https://hentaivn.tv/31434-doc-truyen-bao-thu-con-ca-cha-bac.html",
        // "https://hentaivn.tv/25715-doc-truyen-mua-he-nam-ay-toi-phat-hien-ra-thang-ban-than-thuo-nho-la-con-gai.html",
        // "https://hentaivn.tv/22982-doc-truyen-the-captive-cheater.html",
        // "https://hentaivn.tv/22048-doc-truyen-ke-bao-thu.html",
        // "https://hentaivn.tv/31190-doc-truyen-crash-course-with-coach.html",
        // "https://hentaivn.tv/11800-doc-truyen-saimin-kazoku-itsunomanika-fuete-ita-aka-chan-.html",



        // "            https://hentaivn.tv/34073-doc-truyen-saekano-ntr-manga-16p.html",
        // "https://hentaivn.tv/22976-doc-truyen-that-time-i-creampied-everybody-and-turned-the-whole-school-into-my-harem.html",
        // "https://hentaivn.tv/33917-doc-truyen-harvest.html",
        // "https://hentaivn.tv/33740-doc-truyen-boku-no-iinari-yoshikawa-sensei.html",
        // "https://hentaivn.tv/32273-doc-truyen-chu-va-chau-gai-.html",
        // "https://hentaivn.tv/19223-doc-truyen-toshoshitsu-no-kanojo.html",
        // "https://hentaivn.tv/11693-doc-truyen-class-no-ohime-sama-shiawase-mesubuta-ni-nariagaru-.html",
        // "https://hentaivn.tv/11865-doc-truyen-metamorphose.html",
        // "https://hentaivn.tv/33180-doc-truyen-watashi-wa-kimi-no-heroine-ja-nai.html",
        // "https://hentaivn.tv/32887-doc-truyen-rensaku-onaho-ka-hako-ka-manga-serial-onahole-fication-and-boxification-manga.html",
        // "https://hentaivn.tv/32700-doc-truyen-hyakkasou-8-zoku-gejo-botan-no-yuuutsu.html",
        // "https://hentaivn.tv/32443-doc-truyen-roshutsu-rinkan-nikubenjo.html",
        // "https://hentaivn.tv/32366-doc-truyen-b-trayal-36.html",
        // "https://hentaivn.tv/31913-doc-truyen-kaineko.html",
        // "https://hentaivn.tv/32221-doc-truyen-gap-dung-nguoi-roi-day-becca.html",
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