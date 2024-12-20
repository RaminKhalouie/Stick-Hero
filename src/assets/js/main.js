// Select Elements
const main = document.querySelector('main');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const playBtn = document.getElementById('play');
const gameover = document.getElementById('gameover');
const resetBtn = document.getElementById('reset');
const sound = document.getElementById('sound');
const ground = document.getElementById('ground');
const hero = document.getElementById('hero');

const aboutBtn = document.getElementById('about');
const about = document.getElementById('about-container');
const closeBtn = document.getElementById('close-btn');

let isPlaying = false;
let linesCount = 0;
let activeLine = 1;
let playerScore = 0;
let isOnSound = true;

setBackGroundImage();
playBtn.addEventListener('click', play);

// Functions
function setBackGroundImage() {
    const number = Math.floor(Math.random() * 10) + 1;
    const imgClass = 'bg-img-' + number;
    main.classList.add(imgClass);
    generateLine();

    const heroLeft = calcLeft(ground.children[activeLine]);
    hero.style.left = heroLeft + "px";
    hero.dataset.hr = heroLeft;
    ground.dataset.l = ground.offsetLeft;
}

ground.dataset.l2 = ground.offsetLeft;

function calcLeft(el) {
    return el.offsetLeft + (el.clientWidth / 2);
}

function play() {
    logo.classList.add('hidden');
    playBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
    gameover.classList.add('hidden');
    score.classList.remove('hidden');
    isPlaying = true;
    playerScore = 0;
    score.textContent = playerScore;
}


function generateLine(count = 20) {
    for (let i = 0; i < count; i++) {
        let w = (Math.floor((Math.random() * 8)) + 4) * 10;
        const m = (Math.floor((Math.random() * 10)) + 4) * 10;
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.width = w + 'px';
        line.style.marginRight = m + 'px';
        line.dataset.mr = m;

        const bar = document.createElement('div');
        bar.classList.add('bar');
        line.appendChild(bar);
        ground.appendChild(line);
        // console.log(w);

    }
    linesCount += 20;
}

let inter;
document.addEventListener('touchstart', strartMove);
document.addEventListener('touchend', endMove);
document.addEventListener('mousedown', strartMove);
document.addEventListener('mouseup', endMove);

function strartMove(e) {
    if (e.target.tagName == 'SECTION' || e.target.tagName == 'DIV') {
        if (isPlaying) {
            inter = setInterval(() => {
                const bar = ground.children[activeLine].children[0];
                const h = bar.clientHeight + 1;
                bar.style.height = h + 'px';
            }, 0);
        }
    }
}

function endMove(e) {

    if (e.target.tagName == 'SECTION' || e.target.tagName == 'DIV') {
        if (isPlaying) {
            clearInterval(inter);
            const line = ground.children[activeLine];
            const bar = line.children[0];
            bar.classList.add('duration-500');
            bar.style.transform = 'rotate(90deg)';

            if (
                bar.clientHeight < (Number(line.dataset.mr) + line.nextElementSibling.clientWidth) &&
                bar.clientHeight > (Number(line.dataset.mr))) {

                // hero.style.transform = 'translateX(' + (bar.clientHeight + (line.clientWidth - 20)) + 'px)';


                const heroLeft = calcLeft(line.nextElementSibling);
                hero.style.left = heroLeft + "px";
                hero.dataset.hr = heroLeft;
                setTimeout(() => {
                    playPass();
                    playerScore += 1;
                    score.textContent = playerScore;
                }, 300);


                ground.dataset.l = (ground.dataset.l * 1) - ((line.dataset.mr * 1) + line.clientWidth);
                ground.style.left = ground.dataset.l + 'px';

                activeLine += 1;
                if (activeLine + 2 >= linesCount / 2) {
                    generateLine();
                }


            } else {
                // hero.style.transform = 'translateX(' + (bar.clientHeight + (line.clientWidth - 20)) + 'px)';
                hero.style.left = ((bar.clientHeight * 1 + hero.dataset.hr * 1) + 20) + 'px';
                setTimeout(() => {
                    bar.style.transform = 'rotate(90deg) rotate(90deg)';
                }, 500);

                setTimeout(() => {
                    hero.style.top = '1000px';
                    playDie();
                }, 700);

                isPlaying = false;

                resetBtn.classList.remove('hidden');
                gameover.classList.replace('hidden', 'flex');

            }

        }
    }
}

resetBtn.addEventListener('click', reset);

function reset() {

    while (ground.lastElementChild) {
        const temp = ground.lastElementChild;
        if (temp.tagName == 'FIGURE')
            break;
        ground.removeChild(temp);
    }
    play();
    activeLine = 1;
    setBackGroundImage();

    ground.style.left = ground.dataset.l2 + 'px';
    ground.dataset.l = ground.dataset.l2;
    hero.style.top = '-58px';

}
sound.addEventListener('click', () => {
    if (isOnSound) {
        isOnSound = false;
        sound.children[0].src = "assets/images/icon/sound-off.svg";
    } else {
        isOnSound = true;
        sound.children[0].src = "assets/images/icon/sound-on.svg";
    }
});

const audioPass = new Audio('assets/audio/pass.wav');
function playPass() {
    if (isOnSound) {
        audioPass.play();
    }
}

const audioDie = new Audio('assets/audio/die.wav');
function playDie() {
    if (isOnSound) {
        audioDie.play();
    }
}

aboutBtn.addEventListener('click', () => {
    about.classList.replace('path-none', 'path-complete');
});

closeBtn.addEventListener('click', () => {
    about.classList.replace('path-complete', 'path-none');
});