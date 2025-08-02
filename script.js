const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const lapBtn = document.getElementById('lapBtn');
const resetLapsBtn = document.getElementById('resetLapsBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

let timer = null;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapNumber = 1;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    const format = (num) => String(num).padStart(2, '0');

    return `${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetAll() {
    pauseTimer();
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    lapNumber = 1;
}

function resetLaps() {
    lapsList.innerHTML = '';
    lapNumber = 1;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetAll);
resetLapsBtn.addEventListener('click', resetLaps);

restartBtn.addEventListener('click', () => {
    resetAll();
    startTimer();
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<span>Lap ${lapNumber}:</span><span>${lapTime}</span>`;
        lapsList.prepend(lapItem);
        lapNumber++;
    }
});