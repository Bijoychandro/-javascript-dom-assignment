// script.js - Background Color Changer Logic

(function() {
    'use strict';

    // Get DOM elements
    const body = document.body;
    const colorCodeDisplay = document.getElementById('colorCode');
    const changeColorBtn = document.getElementById('changeColorBtn');
    const colorDisplay = document.querySelector('.color-display');

    // Color history array (for storing last 6 colors)
    let colorHistory = [];
    const MAX_HISTORY = 6;

    // Function to generate a random hex color
    function generateRandomColor() {
        // Method 1: Generate random hex values
        const hexChars = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += hexChars[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Alternative method: Using random RGB values (commented out)
    /*
    function generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    */

    // Function to update the color history display
    function updateColorHistory() {
        // Remove existing history dots
        const existingHistory = document.querySelector('.color-history');
        if (existingHistory) {
            existingHistory.remove();
        }

        if (colorHistory.length === 0) return;

        // Create history container
        const historyContainer = document.createElement('div');
        historyContainer.className = 'color-history';

        // Add dots for each color in history (show latest first)
        const colorsToShow = [...colorHistory].reverse();
        colorsToShow.forEach(color => {
            const dot = document.createElement('div');
            dot.className = 'color-dot';
            dot.style.backgroundColor = color;
            dot.title = color;
            
            // Click to apply color from history
            dot.addEventListener('click', function() {
                applyColor(color);
            });
            
            historyContainer.appendChild(dot);
        });

        // Insert after the hint paragraph
        const hint = document.querySelector('.hint');
        hint.parentNode.insertBefore(historyContainer, hint.nextSibling);
    }

    // Function to apply a color
    function applyColor(color) {
        // Change background color
        body.style.backgroundColor = color;
        
        // Update color code display
        colorCodeDisplay.textContent = color;
        colorCodeDisplay.style.color = color;
        
        // Add pulse animation to display
        colorDisplay.classList.remove('pulse');
        // Force reflow to restart animation
        void colorDisplay.offsetWidth;
        colorDisplay.classList.add('pulse');
        
        // Update the color display background
        colorDisplay.style.backgroundColor = color + '20'; // 20% opacity

        // Add to history (avoid duplicates of the same color)
        const lastColor = colorHistory[colorHistory.length - 1];
        if (lastColor !== color) {
            colorHistory.push(color);
            if (colorHistory.length > MAX_HISTORY) {
                colorHistory.shift();
            }
            updateColorHistory();
        }
    }

    // Function to change to a new random color
    function changeBackgroundColor() {
        const newColor = generateRandomColor();
        applyColor(newColor);
        
        // Log for debugging
        console.log(`🎨 Color changed to: ${newColor}`);
    }

    // Add event listener to button
    changeColorBtn.addEventListener('click', changeBackgroundColor);

    // Keyboard shortcut: Press 'Space' or 'C' to change color
    document.addEventListener('keydown', function(e) {
        // Don't trigger if typing in input/textarea
        const tagName = e.target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') return;

        if (e.key === ' ' || e.key === 'Space' || e.key === 'c' || e.key === 'C') {
            e.preventDefault();
            changeBackgroundColor();
        }
    });

    // Initialize with a random color on page load
    function initialize() {
        // Generate first random color
        const initialColor = generateRandomColor();
        
        // Apply initial color
        body.style.backgroundColor = initialColor;
        colorCodeDisplay.textContent = initialColor;
        colorCodeDisplay.style.color = initialColor;
        colorDisplay.style.backgroundColor = initialColor + '20';
        
        // Add to history
        colorHistory.push(initialColor);
        updateColorHistory();
        
        console.log('✅ Background Color Changer initialized!');
        console.log(`🎨 Starting color: ${initialColor}`);
        console.log('💡 Click the button or press Space/C to change color');
    }

    // Start the app
    initialize();

})();