// script.js - Age Calculator Logic

(function() {
    'use strict';

    // Get DOM elements
    const dobInput = document.getElementById('dobInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDisplay = document.getElementById('resultDisplay');
    const ageValue = document.getElementById('ageValue');

    // Set max date to today (so user can't select future date)
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    dobInput.setAttribute('max', maxDate);

    // Set default date to 18 years ago (optional)
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 18);
    dobInput.value = defaultDate.toISOString().split('T')[0];

    // Function to calculate age
    function calculateAge() {
        const dobValue = dobInput.value;
        
        if (!dobValue) {
            ageValue.textContent = 'Please select a date';
            ageValue.classList.remove('highlight');
            resultDisplay.classList.remove('show');
            return;
        }

        const birthDate = new Date(dobValue);
        const currentDate = new Date();

        // Check if birth date is in the future
        if (birthDate > currentDate) {
            ageValue.textContent = 'Future date not allowed';
            ageValue.classList.remove('highlight');
            resultDisplay.classList.remove('show');
            return;
        }

        // Calculate age
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        
        // Adjust age if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        // Display result
        ageValue.textContent = age + ' Years';
        ageValue.classList.add('highlight');
        resultDisplay.classList.add('show');

        // Log for debugging
        console.log(`🎂 Age calculated: ${age} years`);
        console.log(`📅 Born: ${birthDate.toDateString()}`);
    }

    // Add event listener to button
    calculateBtn.addEventListener('click', calculateAge);

    // Also calculate on Enter key press
    dobInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });

    // Calculate on page load (optional)
    setTimeout(calculateAge, 100);

    console.log('✅ Age Calculator initialized!');
    console.log('📅 Select your date of birth and click Calculate');

})();