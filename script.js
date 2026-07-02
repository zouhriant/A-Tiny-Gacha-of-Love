const opening=document.getElementById("opening");
const game=document.getElementById("game");

const start=document.getElementById("startButton");

const handle=document.getElementById("handle");

const capsule=document.getElementById("capsule");

const letter=document.getElementById("letterContainer");

const title=document.getElementById("messageTitle");

const body=document.getElementById("messageBody");

const next=document.getElementById("nextButton");

const progress=document.getElementById("progressFill");

const progressText=document.getElementById("progressNumber");

let current=0;

const gachaSound = new Audio("audio/gacha.mp3");
const popSound = new Audio("audio/pop.mp3");

// biar volume gak terlalu keras
gachaSound.volume = 0.4;
popSound.volume = 0.5;

const bgm = new Audio("audio/audiobgm.mp3");

bgm.loop = true;
bgm.volume = 0.25;

const messages=[
{
title:"💌 You unlocked a little message!",
body:"hi, mayiiii sayang. kalau kamu lagi baca ini, berarti kamu berhasil sampai ke salah satu kejutan yang aku siapin khusus buat kamu. masih ada beberapa kapsul lagi, jadi jangan buru-buru ya. 🤍"
},
{
title:"🌼 Thank you amarisss!",
body:"makasih ya udah hadir di hidup aku. makasih karena selalu nemenin aku, dengerin cerita-cerita random aku, dan bikin hari-hari biasa jadi terasa lebih spesial. i'm really grateful to have you."
},
{
title:"🤍 Reminder imut (tidak dengan marah marah)",
body:"jangan lupa makan tepat waktu!!!!!!!!!!! jangan begadang terus (mmmm.. ini juga buat aku kdsdjakf) jangan terlalu keras sama diri sendiri <3333 dan jangan lupa........ kalau ada aku yang selalu sayang sama kamu >___<"
},
{
title:"✨ My favorite thing about you",
body:"sebenarnya bukan cuma satu. aku suka cara kamu ketawa (+ bikin aku ketawaa dengan keasbunan kamu) cara kamu peduli. cara kamu bikin aku ngerasa nyaman. pokoknya... aku suka kamu, apa adanya....... NOPE!!! kamu tuh bukan apa adanya!! TAPI SEMUANYA ADA DI KAMU!!!! kamu paket complete!!"
},
{
title:"📖 Chapter IX",
body:"siapa sangka ya... kita udah sampai di chapter ke-9. rasanya baru kemarin kita mulai cerita ini. semoga nanti ada chapter 10... 11... 100... 10000000....."
},
{
title:"🎲 Fun Fact",
body:"tau nggak? salah satu kebiasaan aku sekarang adalah... senyum senyum sendiri tiap liat notifikasi dari kamu. jadi kalau kamu liat aku senyum-senyum sendiri... (lewat mata batin kamu ituuu) kemungkinan besar itu gara-gara kamu."
},
{
title:"🫂 A little promise",
body:"aku nggak janji semuanya bakal selalu mudah. tapi aku janji akan terus berusaha jadi seseorang yang bisa bikin kamu ngerasa disayang, dihargai, dan punya tempat buat pulang."
},
{
title:"🎁 Almost There",
body:"kalau kamu udah sampai kapsul ini... berarti tinggal satu langkah lagi menuju kejutan terakhir. semoga semua pesan kecil ini bisa bikin kamu senyum, walaupun cuma sebentar. siap buat hadiah terakhir? 🤍"
},
{
title:"🎀 Congratulations",
body:"kamu berhasil buka semua kapsulnya. makasih ya udah nemenin aku selama sembilan bulan ini. see u di tanggal 2 berikutnyaaa..."
}
];

const DRIVE_LINK = "https://drive.google.com/drive/folders/1TclDHq3IGXQ0kmHMctkxBuNSjsigVeKr?usp=sharing";

start.onclick=()=>{

bgm.volume = 0.25;      // balikin volume
bgm.currentTime = 0;    // mulai dari awal
bgm.play();

opening.style.opacity=0;

opening.style.transform="scale(.9)";

setTimeout(()=>{

opening.style.display="none";

game.classList.remove("hidden");

},700);

};

handle.onclick=()=>{

gachaSound.currentTime = 0;
gachaSound.play();

if(capsule.style.display=="block") return;

handle.classList.add("spin");

setTimeout(()=>{

handle.classList.remove("spin");

capsule.style.display="block";

capsule.animate([

{

transform:"translateY(-120px)"

},

{

transform:"translateY(0)"

}

],{

duration:700,

fill:"forwards"

});

},700);

};

capsule.onclick=()=>{

    popSound.currentTime = 0;
    popSound.play();

    capsule.style.transform="scale(1.2) rotate(15deg)";

    setTimeout(()=>{

        capsule.style.display="none";

        // baru sekarang hilangkan ruang kosong
        document.getElementById("capsuleContainer").style.display="none";

        showLetter();

    },350);

};

function showLetter(){

letter.style.display="flex";

title.innerHTML=messages[current].title;

body.innerHTML=messages[current].body;

if(current===messages.length-1){

next.innerHTML="Open for a Surprise! 🎁";

confetti({
    particleCount: 100,
    angle: 60,
    spread: 70,
    origin: { x: 0 }
});

confetti({
    particleCount: 100,
    angle: 120,
    spread: 70,
    origin: { x: 1 }
});

}else{

next.innerHTML="Next Capsule 🤍";

}

}

function nextFunction(){

    // CAPSULE TERAKHIR
    if(current===messages.length-1){

    window.location.href = DRIVE_LINK;

        // ubah isi surat
        title.innerHTML="🎉 Congratulations!";
        body.innerHTML="Thank you for opening every capsule. I hope these little messages made you smile. 🤍";

        // ubah tombol
        next.innerHTML="Start Again ♡";

        // tombol Start Again
        next.onclick=()=>{

            bgm.pause();
            bgm.currentTime = 0;
            bgm.volume = 0.25;

            // reset semua
            current=0;

            progress.style.width="11.11%";
            progressText.innerHTML="1 / 9";

            letter.style.display="none";
            capsule.style.display="none";

            document.getElementById("capsuleContainer").style.display="flex";

            opening.style.display="flex";
            opening.style.opacity="1";
            opening.style.transform="scale(1)";

            game.classList.add("hidden");

            next.innerHTML="Next Capsule 🤍";

            // balikin fungsi tombol
            next.onclick=nextFunction;

        };

        return;
    }

// lanjut ke capsule berikutnya
current++;

letter.style.display="none";

// tampilkan lagi tempat kapsul
document.getElementById("capsuleContainer").style.display="flex";

progress.style.width=((current+1)/messages.length)*100+"%";
progressText.innerHTML=(current+1)+" / "+messages.length;

}

next.onclick=nextFunction;
