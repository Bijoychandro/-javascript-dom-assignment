// script.js - Student Result Calculator Logic

(function() {
    'use strict';

    // DOM elements
    const banglaInput = document.getElementById('bangla');
    const englishInput = document.getElementById('english');
    const mathInput = document.getElementById('math');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalMarks = document.getElementById('totalMarks');
    const averageMarks = document.getElementById('averageMarks');
    const gradeDisplay = document.getElementById('grade');
    const resultSection = document.getElementById('resultSection');

    // Function to calculate grade
    function calculateGrade(avg) {
        if (avg >= 80) return { grade: 'A+', className: 'Aplus' };
        else if (avg >= 70) return { grade: 'A', className: 'A' };
        else if (avg >= 60) return { grade: 'A-', className: 'Aminus' };
        else if (avg >= 50) return { grade: 'B', className: 'B' };
        else if (avg >= 40) return { grade: 'C', className: 'C' };
        else if (avg >= 33) return { grade: 'D', className: 'D' };
        else return { grade: 'F', className: 'F' };
    }

    // Function to validate input
    function validateInput(value, fieldName) {
        if (value === '') {
            return { valid: false, message: `${fieldName} is required` };
        }
        const num = Number(value);
        if (isNaN(num) || !Number.isInteger(num)) {
            return { valid: false, message: `${fieldName} must be a valid number` };
        }
        if (num < 0 || num > 100) {
            return { valid: false, message: `${fieldName} must be between 0 and 100` };
        }
        return { valid: true, value: num };
    }

    // Function to clear error states
    function clearErrors() {
        [banglaInput, englishInput, mathInput].forEach(input => {
            input.classList.remove('error');
        });
    }

    // Function to show error
    function showError(input, message) {
        input.classList.add('error');
        input.focus();
        alert(message);
    }

    // Function to calculate result
    function calculateResult() {
        clearErrors();

        // Validate inputs
        const banglaResult = validateInput(banglaInput.value, 'Bangla');
        if (!banglaResult.valid) {
            showError(banglaInput, banglaResult.message);
            return;
        }

        const englishResult = validateInput(englishInput.value, 'English');
        if (!englishResult.valid) {
            showError(englishInput, englishResult.message);
            return;
        }

        const mathResult = validateInput(mathInput.value, 'Math');
        if (!mathResult.valid) {
            showError(mathInput, mathResult.message);
            return;
        }

        // Calculate
        const bangla = banglaResult.value;
        const english = englishResult.value;
        const math = mathResult.value;
        const total = bangla + english + math;
        const average = total / 3;
        const avgRounded = Math.round(average * 100) / 100;

        const gradeInfo = calculateGrade(average);

        // Display results with animation
        totalMarks.textContent = total;
        averageMarks.textContent = avgRounded;
        gradeDisplay.textContent = gradeInfo.grade;
        
        // Remove previous grade classes
        gradeDisplay.className = 'result-value grade-value ' + gradeInfo.className;

        // Show result section with animation
        resultSection.classList.add('show');

        // Add highlight animation
        [totalMarks, averageMarks, gradeDisplay].forEach(el => {
            el.classList.add('highlight');
            setTimeout(() => {
                el.classList.remove('highlight');
            }, 500);
        });

        // Log for debugging
        console.log(`📊 Results: Total=${total}, Average=${avgRounded}, Grade=${gradeInfo.grade}`);
        console.log(`📝 ${bangla} (Bangla), ${english} (English), ${math} (Math)`);
    }

    // Function to handle Enter key
    function handleEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateResult();
        }
    }

    // Event listeners
    calculateBtn.addEventListener('click', calculateResult);

    // Enter key support on all inputs
    banglaInput.addEventListener('keypress', handleEnter);
    englishInput.addEventListener('keypress', handleEnter);
    mathInput.addEventListener('keypress', handleEnter);

    // Auto-calculate on input blur (optional)
    [banglaInput, englishInput, mathInput].forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value !== '') {
                // Just validate, don't auto-calculate
                const result = validateInput(this.value, this.id.charAt(0).toUpperCase() + this.id.slice(1));
                if (!result.valid) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            }
        });

        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });

    // Keyboard shortcut: Press 'C' to calculate
    document.addEventListener('keydown', function(e) {
        const tagName = e.target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') return;

        if (e.key === 'c' || e.key === 'C') {
            e.preventDefault();
            calculateResult();
        }
    });

    // Initialize
    console.log('✅ Student Result Calculator initialized!');
    console.log('📚 Enter marks for Bangla, English, and Math');
    console.log('⌨️ Press Enter or click Calculate');
    console.log('💡 Shortcut: Press C to calculate');

})();