// script.js - Stopwatch Logic

(function() {
    'use strict';

    // DOM elements
    const hoursDisplay = document.getElementById('hours');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapList = document.getElementById('lapList');

    // State variables
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval = null;
    let isRunning = false;
    let lapCount = 0;
    let lastLapTime = 0;

    // Function to format time
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0')
        };
    }

    // Function to update display
    function updateDisplay(ms) {
        const time = formatTime(ms);
        hoursDisplay.textContent = time.hours;
        minutesDisplay.textContent = time.minutes;
        secondsDisplay.textContent = time.seconds;
    }

    // Function to update lap display
    function updateLapDisplay(lapTime, diffTime) {
        const lapTimeFormatted = formatTime(lapTime);
        const diffFormatted = formatTime(diffTime);
        
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        
        const lapNumber = document.createElement('span');
        lapNumber.className = 'lap-number';
        lapNumber.textContent = `Lap ${lapCount}`;
        
        const lapTimeSpan = document.createElement('span');
        lapTimeSpan.className = 'lap-time';
        lapTimeSpan.textContent = `${lapTimeFormatted.hours}:${lapTimeFormatted.minutes}:${lapTimeFormatted.seconds}`;
        
        const lapDiff = document.createElement('span');
        lapDiff.className = 'lap-diff';
        if (lapCount > 1) {
            lapDiff.textContent = `(+${diffFormatted.hours}:${diffFormatted.minutes}:${diffFormatted.seconds})`;
        } else {
            lapDiff.textContent = '—';
        }
        
        lapItem.appendChild(lapNumber);
        lapItem.appendChild(lapTimeSpan);
        lapItem.appendChild(lapDiff);
        
        // Remove empty message if exists
        const emptyMsg = lapList.querySelector('.lap-empty');
        if (emptyMsg) {
            emptyMsg.remove();
        }
        
        lapList.appendChild(lapItem);
        lapList.scrollTop = lapList.scrollHeight;
    }

    // Function to start stopwatch
    function start() {
        if (isRunning) return;
        
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        
        timerInterval = setInterval(() => {
            const currentTime = Date.now();
            elapsedTime = currentTime - startTime;
            updateDisplay(elapsedTime);
        }, 100);
        
        // Update button states
        startBtn.disabled = true;
        stopBtn.disabled = false;
        lapBtn.disabled = false;
        
        console.log('▶️ Stopwatch started');
    }

    // Function to stop stopwatch
    function stop() {
        if (!isRunning) return;
        
        isRunning = false;
        clearInterval(timerInterval);
        timerInterval = null;
        
        // Update button states
        startBtn.disabled = false;
        stopBtn.disabled = true;
        lapBtn.disabled = true;
        
        console.log('⏹️ Stopwatch stopped');
    }

    // Function to reset stopwatch
    function reset() {
        // Stop the timer
        if (isRunning) {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
        }
        
        // Reset values
        elapsedTime = 0;
        startTime = 0;
        lapCount = 0;
        lastLapTime = 0;
        
        // Update display
        updateDisplay(0);
        
        // Clear lap list
        lapList.innerHTML = '<div class="lap-empty">No laps recorded</div>';
        
        // Update button states
        startBtn.disabled = false;
        stopBtn.disabled = true;
        lapBtn.disabled = true;
        
        console.log('⟳ Stopwatch reset');
    }

    // Function to record lap
    function recordLap() {
        if (!isRunning) return;
        
        lapCount++;
        const lapTime = elapsedTime;
        const diffTime = lapTime - lastLapTime;
        lastLapTime = lapTime;
        
        updateLapDisplay(lapTime, diffTime);
        
        console.log(`⏱️ Lap ${lapCount}: ${formatTime(lapTime).hours}:${formatTime(lapTime).minutes}:${formatTime(lapTime).seconds}`);
    }

    // Event listeners
    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', recordLap);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        const tagName = e.target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') return;

        switch(e.key) {
            case ' ':
            case 'Space':
                e.preventDefault();
                if (isRunning) {
                    stop();
                } else {
                    start();
                }
                break;
            case 'r':
            case 'R':
                e.preventDefault();
                reset();
                break;
            case 'l':
            case 'L':
                e.preventDefault();
                if (isRunning) {
                    recordLap();
                }
                break;
        }
    });

    // Initialize display
    updateDisplay(0);
    stopBtn.disabled = true;
    lapBtn.disabled = true;

    console.log('✅ Stopwatch initialized!');
    console.log('⌨️ Space: Start/Stop | R: Reset | L: Lap');

})();