// script.js - Show/Hide Password Logic

(function() {
    'use strict';

    // DOM elements
    const passwordInput = document.getElementById('passwordInput');
    const toggleBtn = document.getElementById('toggleBtn');
    const eyeIcon = document.getElementById('eyeIcon');
    const toggleText = document.getElementById('toggleText');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const showStrengthCheckbox = document.getElementById('showStrength');
    const strengthSection = document.getElementById('strengthSection');
    const inputWrapper = document.querySelector('.input-wrapper');

    // State
    let isVisible = false;

    // Function to toggle password visibility
    function togglePassword() {
        isVisible = !isVisible;
        
        if (isVisible) {
            passwordInput.type = 'text';
            toggleBtn.classList.add('showing');
            toggleText.textContent = 'Hide';
            eyeIcon.textContent = '🙈';
            inputWrapper.classList.add('active');
            console.log('👁️ Password shown');
        } else {
            passwordInput.type = 'password';
            toggleBtn.classList.remove('showing');
            toggleText.textContent = 'Show';
            eyeIcon.textContent = '👁️';
            inputWrapper.classList.remove('active');
            console.log('🔒 Password hidden');
        }
        
        // Focus on input
        passwordInput.focus();
    }

    // Function to check password strength
    function checkStrength(password) {
        if (!password || password.length === 0) {
            strengthFill.className = 'strength-fill';
            strengthFill.style.width = '0%';
            strengthText.textContent = '—';
            strengthText.className = 'strength-text';
            return;
        }

        let score = 0;
        let feedback = [];

        // Length check
        if (password.length >= 8) {
            score += 25;
            feedback.push('Good length');
        } else if (password.length >= 6) {
            score += 15;
            feedback.push('Medium length');
        } else {
            feedback.push('Too short');
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            score += 25;
            feedback.push('Has uppercase');
        }

        // Lowercase check
        if (/[a-z]/.test(password)) {
            score += 20;
            feedback.push('Has lowercase');
        }

        // Numbers check
        if (/[0-9]/.test(password)) {
            score += 15;
            feedback.push('Has numbers');
        }

        // Special characters check
        if (/[!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>/?]/.test(password)) {
            score += 15;
            feedback.push('Has symbols');
        }

        // Determine strength
        let strength = 'weak';
        let strengthLabel = 'Weak';
        
        if (score >= 80) {
            strength = 'strong';
            strengthLabel = 'Strong 💪';
        } else if (score >= 50) {
            strength = 'medium';
            strengthLabel = 'Medium';
        } else {
            strength = 'weak';
            strengthLabel = 'Weak';
        }

        // Update UI
        strengthFill.className = 'strength-fill ' + strength;
        strengthText.textContent = strengthLabel;
        strengthText.className = 'strength-text ' + strength;

        console.log(`🔐 Password strength: ${strengthLabel} (${score}%)`);
    }

    // Function to toggle strength meter visibility
    function toggleStrengthMeter() {
        if (showStrengthCheckbox.checked) {
            strengthSection.style.display = 'flex';
        } else {
            strengthSection.style.display = 'none';
        }
    }

    // Event listeners
    toggleBtn.addEventListener('click', togglePassword);

    // Real-time password strength check
    passwordInput.addEventListener('input', function() {
        checkStrength(this.value);
    });

    // Toggle strength meter
    showStrengthCheckbox.addEventListener('change', toggleStrengthMeter);

    // Keyboard shortcuts
    passwordInput.addEventListener('keydown', function(e) {
        // Ctrl+Shift+S to toggle visibility
        if (e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            togglePassword();
        }
    });

    document.addEventListener('keydown', function(e) {
        // Escape to hide password (if visible)
        if (e.key === 'Escape' && isVisible) {
            e.preventDefault();
            if (isVisible) togglePassword();
        }
    });

    // Initialize
    toggleStrengthMeter();
    checkStrength(passwordInput.value);

    console.log('✅ Show/Hide Password initialized!');
    console.log('👁️ Click the eye button to toggle password visibility');
    console.log('⌨️ Ctrl+Shift+S to toggle | Escape to hide');

})();