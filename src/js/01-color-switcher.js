const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

const TIME_UPDATE_COLOR = 1000;
let intervalId = 0;
let intervalActive = false;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.startBtn.addEventListener('click', () => {
    if (intervalActive) return;
    else onChangeColor();
})

function onChangeColor () {
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, TIME_UPDATE_COLOR);
    isIntervalActive = true;
    refs.startBtn.disabled = true;
};

refs.stopBtn.addEventListener('click', onDeleteColor);

function onDeleteColor () {
    clearInterval(intervalId);
    isIntervalActive = false;
    refs.startBtn.disabled = false;
};


