// script.js - Password Generator Logic

(function() {
    'use strict';

    // DOM elements
    const passwordOutput = document.getElementById('passwordOutput');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const lengthSlider = document.getElementById('lengthSlider');
    const lengthValue = document.getElementById('lengthValue');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const strengthValue = document.getElementById('strengthValue');

    // Character sets
    const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
    const NUMBERS = '0123456789';
    const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Update length display
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // Generate password function
    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        
        // Build character pool based on selected options
        let charPool = '';
        if (includeUppercase.checked) charPool += UPPERCASE;
        if (includeLowercase.checked) charPool += LOWERCASE;
        if (includeNumbers.checked) charPool += NUMBERS;
        if (includeSymbols.checked) charPool += SYMBOLS;

        // Check if at least one option is selected
        if (charPool === '') {
            passwordOutput.textContent = 'Select at least one option';
            strengthValue.textContent = '—';
            strengthValue.className = 'strength-value';
            return;
        }

        // Generate password
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            password += charPool[randomIndex];
        }

        // Ensure minimum length of 8 (already handled by slider)
        passwordOutput.textContent = password;
        
        // Calculate and display strength
        updateStrength(password, charPool);
        
        // Reset copy button state
        copyBtn.textContent = '📋';
        copyBtn.classList.remove('copied');

        return password;
    }

    // Password strength checker
    function updateStrength(password, charPool) {
        const length = password.length;
        let strength = 'weak';
        
        // Check character variety
        let hasUpper = /[A-Z]/.test(password);
        let hasLower = /[a-z]/.test(password);
        let hasNumber = /[0-9]/.test(password);
        let hasSymbol = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password);
        
        let varietyCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
        
        // Determine strength
        if (length >= 12 && varietyCount >= 4) {
            strength = 'strong';
        } else if (length >= 10 && varietyCount >= 3) {
            strength = 'medium';
        } else if (length >= 8 && varietyCount >= 2) {
            strength = 'medium';
        } else {
            strength = 'weak';
        }

        // Update UI
        strengthValue.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
        strengthValue.className = 'strength-value ' + strength;
    }

    // Copy to clipboard function
    function copyPassword() {
        const password = passwordOutput.textContent;
        
        if (!password || password === 'Click Generate' || password === 'Select at least one option') {
            return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(password).then(() => {
                copyBtn.textContent = '✅';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = '📋';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                fallbackCopy(password);
            });
        } else {
            fallbackCopy(password);
        }
    }

    // Fallback copy method for older browsers
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
            copyBtn.textContent = '✅';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.textContent = '📋';
                copyBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Copy failed:', err);
            alert('Failed to copy password. Please select and copy manually.');
        }
        
        document.body.removeChild(textarea);
    }

    // Event listeners
    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);

    // Keyboard shortcut: Press 'Enter' or 'G' to generate
    document.addEventListener('keydown', function(e) {
        const tagName = e.target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') return;

        if (e.key === 'Enter' || e.key === 'g' || e.key === 'G') {
            e.preventDefault();
            generatePassword();
        }
    });

    // Generate initial password on load
    generatePassword();

    console.log('✅ Password Generator initialized!');
    console.log('🔐 Generate strong passwords with custom options');

})();