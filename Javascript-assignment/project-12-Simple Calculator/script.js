// script.js - Simple Calculator Logic

(function() {
    'use strict';

    // DOM elements
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const resultDisplay = document.getElementById('resultDisplay');
    const resultSection = document.getElementById('resultSection');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');

    // Buttons
    const addBtn = document.getElementById('addBtn');
    const subtractBtn = document.getElementById('subtractBtn');
    const multiplyBtn = document.getElementById('multiplyBtn');
    const divideBtn = document.getElementById('divideBtn');

    // History array
    let history = [];

    // Function to get numbers with validation
    function getNumbers() {
        const num1 = num1Input.value.trim();
        const num2 = num2Input.value.trim();

        // Clear previous errors
        num1Input.classList.remove('error');
        num2Input.classList.remove('error');

        if (num1 === '' || num2 === '') {
            showResult('Please enter both numbers', true);
            if (num1 === '') num1Input.classList.add('error');
            if (num2 === '') num2Input.classList.add('error');
            return null;
        }

        const n1 = Number(num1);
        const n2 = Number(num2);

        if (isNaN(n1) || isNaN(n2)) {
            showResult('Please enter valid numbers', true);
            if (isNaN(n1)) num1Input.classList.add('error');
            if (isNaN(n2)) num2Input.classList.add('error');
            return null;
        }

        return { num1: n1, num2: n2 };
    }

    // Function to show result
    function showResult(value, isError = false) {
        resultDisplay.textContent = value;
        resultDisplay.className = 'result-value' + (isError ? ' error' : '');
        resultSection.classList.add('show');
        
        if (!isError) {
            resultDisplay.style.color = '#00f5ff';
        } else {
            resultDisplay.style.color = '#fc8181';
        }
    }

    // Function to add to history
    function addHistory(expression, result) {
        const historyItem = {
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        };
        
        history.push(historyItem);
        
        // Keep only last 20 items
        if (history.length > 20) {
            history.shift();
        }
        
        updateHistoryDisplay();
    }

    // Function to update history display
    function updateHistoryDisplay() {
        // Remove empty message
        const emptyMsg = historyList.querySelector('.history-empty');
        if (emptyMsg) {
            emptyMsg.remove();
        }

        // Clear existing history items (keep empty message if no history)
        if (history.length === 0) {
            historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
            return;
        }

        // Remove all child nodes except maybe we'll rebuild
        historyList.innerHTML = '';

        // Add each history item (show newest first)
        const reversedHistory = [...history].reverse();
        reversedHistory.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            
            const exprSpan = document.createElement('span');
            exprSpan.className = 'history-expression';
            exprSpan.textContent = item.expression;
            
            const resultSpan = document.createElement('span');
            resultSpan.className = 'history-result';
            resultSpan.textContent = item.result;
            
            div.appendChild(exprSpan);
            div.appendChild(resultSpan);
            historyList.appendChild(div);
        });
    }

    // Function to clear history
    function clearHistory() {
        history = [];
        updateHistoryDisplay();
        console.log('🧹 History cleared');
    }

    // Function to perform calculation
    function calculate(operation, symbol) {
        const numbers = getNumbers();
        if (!numbers) return;

        const { num1, num2 } = numbers;
        let result;
        let expression = `${num1} ${symbol} ${num2}`;

        switch(operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    showResult('Cannot divide by zero!', true);
                    return;
                }
                result = num1 / num2;
                // Round to avoid floating point issues
                result = Math.round(result * 10000) / 10000;
                break;
            default:
                return;
        }

        // Display result
        showResult(result);
        
        // Add to history
        const resultStr = typeof result === 'number' ? result.toString() : result;
        addHistory(expression, resultStr);

        // Log
        console.log(`🧮 ${expression} = ${result}`);

        // Focus on first input for next calculation
        num1Input.focus();
        num1Input.select();
    }

    // Event listeners for buttons
    addBtn.addEventListener('click', () => calculate('add', '+'));
    subtractBtn.addEventListener('click', () => calculate('subtract', '−'));
    multiplyBtn.addEventListener('click', () => calculate('multiply', '×'));
    divideBtn.addEventListener('click', () => calculate('divide', '÷'));

    // Clear history
    clearHistoryBtn.addEventListener('click', clearHistory);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        const tagName = e.target.tagName.toLowerCase();
        if (tagName === 'input') {
            // Enter key on inputs
            if (e.key === 'Enter') {
                e.preventDefault();
                // Focus next input or calculate
                if (e.target === num1Input) {
                    num2Input.focus();
                } else if (e.target === num2Input) {
                    // Default to addition on Enter
                    calculate('add', '+');
                }
            }
            return;
        }

        // Global shortcuts
        switch(e.key) {
            case 'a':
            case 'A':
                e.preventDefault();
                calculate('add', '+');
                break;
            case 's':
            case 'S':
                e.preventDefault();
                calculate('subtract', '−');
                break;
            case 'm':
            case 'M':
                e.preventDefault();
                calculate('multiply', '×');
                break;
            case 'd':
            case 'D':
                e.preventDefault();
                calculate('divide', '÷');
                break;
            case 'c':
            case 'C':
                e.preventDefault();
                clearHistory();
                break;
        }
    });

    // Clear errors on input
    num1Input.addEventListener('input', function() {
        this.classList.remove('error');
    });
    num2Input.addEventListener('input', function() {
        this.classList.remove('error');
    });

    // Initialize
    console.log('✅ Simple Calculator initialized!');
    console.log('⌨️ Keyboard shortcuts:');
    console.log('   A = Add | S = Subtract | M = Multiply | D = Divide');
    console.log('   Enter on input field to calculate (Add)');
    console.log('   C = Clear history');

})();