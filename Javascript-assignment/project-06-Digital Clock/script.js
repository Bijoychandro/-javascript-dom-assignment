// script.js - Digital Clock Logic

(function() {
    'use strict';

    // DOM elements
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const meridiemElement = document.getElementById('meridiem');
    const dateDisplay = document.getElementById('dateDisplay');

    // Function to pad numbers with leading zero
    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    // Function to update the clock
    function updateClock() {
        const now = new Date();
        
        // Get hours (12-hour format)
        let hours = now.getHours();
        const meridiem = hours >= 12 ? 'PM' : 'AM';
        
        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;
        
        // Get minutes and seconds
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Update DOM with padded values
        hoursElement.textContent = padZero(hours);
        minutesElement.textContent = padZero(minutes);
        secondsElement.textContent = padZero(seconds);
        meridiemElement.textContent = meridiem;
    }

    // Function to update the date
    function updateDate() {
        const now = new Date();
        
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }

    // Function to update both clock and date
    function updateDisplay() {
        updateClock();
        updateDate();
    }

    // Initial update
    updateDisplay();

    // Update every second
    setInterval(updateDisplay, 1000);

    // Log for debugging
    console.log('✅ Digital Clock initialized!');
    console.log('🕐 Current time displayed and updating every second');

    // Optional: Add animation effect when hours change
    // This adds a subtle highlight effect at the start of each hour
    let previousMinutes = new Date().getMinutes();
    setInterval(() => {
        const currentMinutes = new Date().getMinutes();
        if (currentMinutes !== previousMinutes) {
            previousMinutes = currentMinutes;
            // Update immediately to avoid 1-second delay
            updateDisplay();
        }
    }, 500);

})();