// script.js - Counter App Logic

(function() {
    'use strict';

    // Get DOM elements
    const counterValue = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Initialize counter state
    let count = 0;
    const MAX_VALUE = 9999;
    const MIN_VALUE = -9999;

    // Function to update the display
    function updateDisplay() {
        // Clamp values to prevent overflow
        if (count > MAX_VALUE) count = MAX_VALUE;
        if (count < MIN_VALUE) count = MIN_VALUE;

        // Update the text
        counterValue.textContent = count;

        // Update color class based on value
        counterValue.classList.remove('positive', 'negative', 'zero');
        
        if (count > 0) {
            counterValue.classList.add('positive');
        } else if (count < 0) {
            counterValue.classList.add('negative');
        } else {
            counterValue.classList.add('zero');
        }
    }

    // Increment function
    function increment() {
        if (count < MAX_VALUE) {
            count++;
            updateDisplay();
            // Small animation feedback
            counterValue.style.transform = 'scale(1.1)';
            setTimeout(() => {
                counterValue.style.transform = 'scale(1)';
            }, 150);
        } else {
            // Feedback when at max
            counterValue.style.transform = 'scale(0.9)';
            setTimeout(() => {
                counterValue.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Decrement function
    function decrement() {
        if (count > MIN_VALUE) {
            count--;
            updateDisplay();
            counterValue.style.transform = 'scale(0.9)';
            setTimeout(() => {
                counterValue.style.transform = 'scale(1)';
            }, 150);
        } else {
            counterValue.style.transform = 'scale(0.9)';
            setTimeout(() => {
                counterValue.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Reset function
    function reset() {
        count = 0;
        updateDisplay();
        // Pop animation
        counterValue.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterValue.style.transform = 'scale(1)';
        }, 200);
    }

    // Add event listeners
    incrementBtn.addEventListener('click', increment);
    decrementBtn.addEventListener('click', decrement);
    resetBtn.addEventListener('click', reset);

    // Keyboard shortcuts (optional enhancement)
    document.addEventListener('keydown', function(e) {
        // Check if the user is not typing in an input field
        const tagName = e.target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') return;

        switch(e.key) {
            case 'ArrowUp':
            case '+':
                e.preventDefault();
                increment();
                break;
            case 'ArrowDown':
            case '-':
                e.preventDefault();
                decrement();
                break;
            case 'r':
            case 'R':
                e.preventDefault();
                reset();
                break;
        }
    });

    // Initialize the display
    updateDisplay();

    // Log to console for verification
    console.log('✅ Counter App initialized successfully!');
    console.log('📌 Starting value: 0');
    console.log('🔄 Use buttons or keyboard (↑/↓ to change, R to reset)');
})();