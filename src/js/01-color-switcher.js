const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

const TIME_UPDATE_COLOR = 1000;
let intervalId = 0;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.startBtn.addEventListener('click', onChangeColor)

function onChangeColor () {
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, TIME_UPDATE_COLOR);
    refs.startBtn.disabled = true;
};

refs.stopBtn.addEventListener('click', onDeleteColor);

function onDeleteColor () {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
};


