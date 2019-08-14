let timer = document.getElementById('timer');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let reset = document.getElementById('reset');
let start = document.getElementById('start');
let startTime;
let countDownTime = 0;
let timeLeft;
let timerId;
let audioElem;
let isStart = false;
let isSound = false;

const INTIAL_TIME = '00:00.000';


function updateTimer(time) {
    let date = new Date(time);
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let milliSecond = date.getMilliseconds();
    let timerString;
    // 数字0埋め
    minute = ('0' + minute).slice(-2);
    second = ('0' + second).slice(-2);
    milliSecond = ('00' + milliSecond).slice(-3);
    timerString = `${minute}:${second}.${milliSecond}`;
    // timerに反映
    timer.textContent = timerString;
    document.title = timerString;
}

function countDown() {
    timerId = setTimeout(function() {
        timeLeft = countDownTime - (Date.now() - startTime);

        if (timeLeft < 0) {
            isStart = false;
            start.textContent = 'Start';
            // タイマーストップ
            clearTimeout(timerId);
            // 残り時間を0にする
            timeLeft = 0;
            // カウントダウン終了後再度カウントダウンしないようにする
            countDownTime = 0;
            updateTimer(timeLeft);
            
            if (!isSound) {
                playSound();
                isSound = true;
            }
            
            return;
        }
        updateTimer(timeLeft);
        countDown();
    }, 10);
}

function playSound() {
    audioElem = new Audio();
    audioElem.src = 'alert.mp3';
    audioElem.loop = true;
    audioElem.play();
}

function stopSound() {
    audioElem.pause();
}
// event
// startボタン
start.addEventListener('click', function() {

    if (timer.textContent === INTIAL_TIME) {
        return;
    }

    if (isStart === false) {
        isStart = true;
        start.textContent = 'Stop';
        startTime = Date.now();
        countDown();
    } else {
        isStart = false;
        start.textContent = 'Start';
        countDownTime = timeLeft;
        clearTimeout(timerId);
    }

});
// minボタン
min.addEventListener('click', function() {
    if (isStart === true) {
        return;
    }
    // 1分ずつ加算
    countDownTime += 60 * 1000;
    // 60分を超えたら0にする
    if (countDownTime >= 60 * 60 * 1000) {
        countDownTime = 0;
    }
    updateTimer(countDownTime);

});
// secボタン
sec.addEventListener('click', function() {
    if (isStart === true) {
        return;
    }
    // 1秒ずつ加算
    countDownTime += 1000;
    // 60分を超えたら0にする
    if (countDownTime >= 60 * 60 * 1000) {
        countDownTime = 0;
    }
    updateTimer(countDownTime);
});
// resetボタン
reset.addEventListener('click', function() {
    // 1秒ずつ加算
    countDownTime = 0;
    updateTimer(countDownTime);
    stopSound();
    isSound = false;
});
