// script.js - Gradient Background Generator Logic

(function() {
    'use strict';

    // DOM elements
    const gradientPreview = document.getElementById('gradientPreview');
    const colorBox1 = document.getElementById('colorBox1');
    const colorBox2 = document.getElementById('colorBox2');
    const colorCode1 = document.getElementById('colorCode1');
    const colorCode2 = document.getElementById('colorCode2');
    const cssCode = document.getElementById('cssCode');
    const randomBtn = document.getElementById('randomBtn');
    const swapBtn = document.getElementById('swapBtn');
    const copyCssBtn = document.getElementById('copyCssBtn');
    const dirBtns = document.querySelectorAll('.dir-btn');

    // State
    let color1 = '#ff0000';
    let color2 = '#00ff00';
    let currentDirection = 'to right';

    // Function to generate random color
    function generateRandomColor() {
        const hexChars = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += hexChars[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to update gradient
    function updateGradient() {
        // Update color boxes
        colorBox1.style.background = color1;
        colorBox2.style.background = color2;
        colorCode1.textContent = color1;
        colorCode2.textContent = color2;
        colorCode1.style.color = color1;
        colorCode2.style.color = color2;

        // Update gradient preview background
        const gradient = `linear-gradient(${currentDirection}, ${color1}, ${color2})`;
        gradientPreview.style.background = gradient;

        // Update CSS code display
        const cssText = `background: ${gradient};`;
        cssCode.textContent = cssText;

        // Update page background (optional - for preview)
        document.body.style.background = gradient;
    }

    // Function to generate random colors
    function randomizeColors() {
        color1 = generateRandomColor();
        color2 = generateRandomColor();
        updateGradient();
        console.log(`🎨 New gradient: ${color1} → ${color2}`);
    }

    // Function to swap colors
    function swapColors() {
        const temp = color1;
        color1 = color2;
        color2 = temp;
        updateGradient();
        console.log(`🔄 Swapped: ${color1} ↔ ${color2}`);
    }

    // Function to set direction
    function setDirection(direction) {
        currentDirection = direction;
        
        // Update active button
        dirBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.direction === direction) {
                btn.classList.add('active');
            }
        });
        
        updateGradient();
        console.log(`📐 Direction: ${direction}`);
    }

    // Function to copy CSS code
    function copyCSS() {
        const code = cssCode.textContent;
        
        if (!code) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(() => {
                copyCssBtn.textContent = '✅ Copied!';
                copyCssBtn.classList.add('copied');
                setTimeout(() => {
                    copyCssBtn.textContent = '📋 Copy CSS';
                    copyCssBtn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                fallbackCopy(code);
            });
        } else {
            fallbackCopy(code);
        }
    }

    // Fallback copy method
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            copyCssBtn.textContent = '✅ Copied!';
            copyCssBtn.classList.add('copied');
            setTimeout(() => {
                copyCssBtn.textContent = '📋 Copy CSS';
                copyCssBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Copy failed:', err);
            alert('Failed to copy CSS. Please select and copy manually.');
        }
        
        document.body.removeChild(textarea);
    }

    // Event listeners
    randomBtn.addEventListener('click', randomizeColors);
    swapBtn.addEventListener('click', swapColors);
    copyCssBtn.addEventListener('click', copyCSS);

    dirBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setDirection(this.dataset.direction);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        const tagName = e.target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') return;

        if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            randomizeColors();
        } else if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            swapColors();
        } else if (e.key === 'c' || e.key === 'C') {
            // Only if Ctrl/Cmd is not pressed (that would be copy)
            if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                copyCSS();
            }
        }
    });

    // Initialize with random gradient
    function init() {
        // Generate random colors
        color1 = generateRandomColor();
        color2 = generateRandomColor();
        updateGradient();
        
        // Set first direction button as active
        dirBtns.forEach(btn => {
            if (btn.dataset.direction === 'to right') {
                btn.classList.add('active');
            }
        });

        console.log('✅ Gradient Generator initialized!');
        console.log(`🎨 Colors: ${color1} → ${color2}`);
        console.log('💡 Press R for random, S to swap, C to copy CSS');
    }

    init();

})();