// script.js - Character Counter Logic

(function() {
    'use strict';

    // Get DOM elements
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');

    // Function to count characters and words
    function updateCounts() {
        const text = textInput.value;
        
        // Character count (including spaces)
        const charLength = text.length;
        charCount.textContent = charLength;
        
        // Word count
        // Trim whitespace and split by spaces, filter out empty strings
        const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
        const wordLength = words.length;
        wordCount.textContent = wordLength;

        // Add highlight animation
        charCount.classList.remove('highlight');
        wordCount.classList.remove('highlight');
        
        // Force reflow for animation
        void charCount.offsetWidth;
        void wordCount.offsetWidth;
        
        charCount.classList.add('highlight');
        wordCount.classList.add('highlight');
    }

    // Add event listener
    textInput.addEventListener('input', updateCounts);

    // Initialize counts
    updateCounts();

    // Optional: Clear on double click (for convenience)
    textInput.addEventListener('dblclick', function() {
        this.value = '';
        updateCounts();
    });

    console.log('✅ Character Counter initialized!');
    console.log('📝 Start typing to see counts update');

})();