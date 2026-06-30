// script.js - Live Text Preview Logic

(function() {
    'use strict';

    // DOM elements
    const textInput = document.getElementById('textInput');
    const previewText = document.getElementById('previewText');
    const placeholder = document.getElementById('placeholder');
    const previewBox = document.getElementById('previewBox');
    const charCounter = document.getElementById('charCounter');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    const clearBtn = document.getElementById('clearBtn');

    // Formatting checkboxes
    const uppercaseCheck = document.getElementById('uppercaseCheck');
    const boldCheck = document.getElementById('boldCheck');
    const italicCheck = document.getElementById('italicCheck');
    const underlineCheck = document.getElementById('underlineCheck');

    // Function to update preview
    function updatePreview() {
        const text = textInput.value;
        const hasText = text.length > 0;

        // Update preview text
        if (hasText) {
            previewText.textContent = text;
            previewText.className = 'preview-text visible';
            placeholder.style.display = 'none';
            previewBox.classList.add('has-text');
        } else {
            previewText.className = 'preview-text';
            previewText.textContent = '';
            placeholder.style.display = 'block';
            previewBox.classList.remove('has-text');
        }

        // Apply formatting
        if (uppercaseCheck.checked) {
            previewText.classList.add('uppercase');
        } else {
            previewText.classList.remove('uppercase');
        }

        if (boldCheck.checked) {
            previewText.classList.add('bold');
        } else {
            previewText.classList.remove('bold');
        }

        if (italicCheck.checked) {
            previewText.classList.add('italic');
        } else {
            previewText.classList.remove('italic');
        }

        if (underlineCheck.checked) {
            previewText.classList.add('underline');
        } else {
            previewText.classList.remove('underline');
        }

        // Update character counter
        const charLength = text.length;
        charCounter.textContent = charLength + ' characters';
        charCount.textContent = charLength;

        // Update word count
        const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
        wordCount.textContent = words.length;

        // Update line count (count newlines)
        const lines = text === '' ? 0 : text.split('\n').length;
        lineCount.textContent = lines;

        // Highlight counts
        [charCount, wordCount, lineCount].forEach(el => {
            el.classList.add('highlight');
            setTimeout(() => {
                el.classList.remove('highlight');
            }, 300);
        });

        // Log for debugging
        if (charLength > 0 && charLength % 10 === 0) {
            console.log(`📝 Text length: ${charLength} characters, ${words.length} words`);
        }
    }

    // Function to clear text
    function clearText() {
        textInput.value = '';
        updatePreview();
        textInput.focus();
        console.log('🗑️ Text cleared');
    }

    // Function to handle Enter key (optional)
    function handleEnter(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            // Allow Shift+Enter for newlines
            // Just update normally
            updatePreview();
        }
    }

    // Event listeners
    textInput.addEventListener('input', updatePreview);
    textInput.addEventListener('keydown', handleEnter);

    // Formatting checkboxes
    uppercaseCheck.addEventListener('change', updatePreview);
    boldCheck.addEventListener('change', updatePreview);
    italicCheck.addEventListener('change', updatePreview);
    underlineCheck.addEventListener('change', updatePreview);

    // Clear button
    clearBtn.addEventListener('click', clearText);

    // Keyboard shortcut: Ctrl+Shift+C to clear
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
            e.preventDefault();
            clearText();
        }
        
        // Escape to clear and focus
        if (e.key === 'Escape' && document.activeElement === textInput) {
            if (textInput.value.length > 0) {
                e.preventDefault();
                clearText();
            }
        }
    });

    // Auto-focus on input
    textInput.focus();

    // Initialize
    updatePreview();

    console.log('✅ Live Text Preview initialized!');
    console.log('📝 Type something to see it appear instantly');
    console.log('⌨️ Ctrl+Shift+C to clear | Escape to clear when focused');

})();