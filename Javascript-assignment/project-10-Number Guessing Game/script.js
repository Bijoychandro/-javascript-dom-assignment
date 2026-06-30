// script.js - Number Guessing Game Logic

(function() {
    'use strict';

    // DOM elements
    const guessInput = document.getElementById('guessInput');
    const guessBtn = document.getElementById('guessBtn');
    const newGameBtn = document.getElementById('newGameBtn');
    const hintBtn = document.getElementById('hintBtn');
    const feedback = document.getElementById('feedback');
    const feedbackIcon = feedback.querySelector('.feedback-icon');
    const feedbackText = feedback.querySelector('.feedback-text');
    const attemptsDisplay = document.getElementById('attempts');
    const rangeDisplay = document.getElementById('rangeDisplay');
    const history = document.getElementById('history');

    // Game state
    let secretNumber = 0;
    let attempts = 0;
    let gameOver = false;
    let lowRange = 1;
    let highRange = 100;

    // Function to generate random number
    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Function to update range display
    function updateRange() {
        rangeDisplay.textContent = `${lowRange} - ${highRange}`;
    }

    // Function to show feedback
    function showFeedback(icon, message, type) {
        feedbackIcon.textContent = icon;
        feedbackText.textContent = message;
        feedback.className = 'feedback ' + type;
    }

    // Function to add guess to history
    function addHistory(guess, result, resultText) {
        // Remove empty message
        const emptyMsg = history.querySelector('.history-empty');
        if (emptyMsg) {
            emptyMsg.remove();
        }

        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        const guessSpan = document.createElement('span');
        guessSpan.className = 'guess-number';
        guessSpan.textContent = `#${attempts}: ${guess}`;

        const resultSpan = document.createElement('span');
        resultSpan.className = `guess-result ${result}`;
        resultSpan.textContent = resultText;

        historyItem.appendChild(guessSpan);
        historyItem.appendChild(resultSpan);
        history.appendChild(historyItem);
        history.scrollTop = history.scrollHeight;
    }

    // Function to handle guess
    function handleGuess() {
        if (gameOver) {
            showFeedback('⚠️', 'Game is over! Click "New Game" to play again.', 'warning');
            return;
        }

        const inputValue = guessInput.value.trim();
        if (inputValue === '') {
            showFeedback('⚠️', 'Please enter a number!', 'warning');
            return;
        }

        const guess = Number(inputValue);
        if (isNaN(guess) || !Number.isInteger(guess)) {
            showFeedback('⚠️', 'Please enter a valid integer!', 'warning');
            guessInput.value = '';
            return;
        }

        if (guess < lowRange || guess > highRange) {
            showFeedback('⚠️', `Please guess between ${lowRange} and ${highRange}!`, 'warning');
            guessInput.value = '';
            return;
        }

        // Valid guess
        attempts++;
        attemptsDisplay.textContent = attempts;

        if (guess === secretNumber) {
            // Correct guess
            gameOver = true;
            guessBtn.disabled = true;
            guessInput.disabled = true;
            showFeedback('🎉', `Correct! You found the number in ${attempts} attempts!`, 'success');
            addHistory(guess, 'correct', '🎯 Correct!');
            console.log(`🎯 Correct! Number was ${secretNumber} in ${attempts} attempts`);
        } else if (guess < secretNumber) {
            showFeedback('⬆️', `${guess} is too low! Try a higher number.`, 'info');
            addHistory(guess, 'low', '⬆️ Too Low');
            // Update range
            if (guess > lowRange) {
                lowRange = guess + 1;
                updateRange();
            }
            console.log(`⬆️ ${guess} is too low`);
        } else {
            showFeedback('⬇️', `${guess} is too high! Try a lower number.`, 'info');
            addHistory(guess, 'high', '⬇️ Too High');
            // Update range
            if (guess < highRange) {
                highRange = guess - 1;
                updateRange();
            }
            console.log(`⬇️ ${guess} is too high`);
        }

        // Clear input
        guessInput.value = '';
        guessInput.focus();
    }

    // Function to reset game
    function resetGame() {
        secretNumber = generateRandomNumber();
        attempts = 0;
        gameOver = false;
        lowRange = 1;
        highRange = 100;

        // Reset UI
        attemptsDisplay.textContent = '0';
        updateRange();
        guessInput.value = '';
        guessInput.disabled = false;
        guessBtn.disabled = false;
        history.innerHTML = '<div class="history-empty">Your guesses will appear here</div>';
        showFeedback('💡', 'Enter a number and click Guess!', '');

        // Log for debugging
        console.log(`🔄 New game started! Secret number: ${secretNumber}`);
        console.log('🎯 Guess the number between 1 and 100');
    }

    // Function to show hint
    function showHint() {
        if (gameOver) {
            showFeedback('🎉', `The number was ${secretNumber}! Start a new game.`, 'success');
            return;
        }

        const hint = `The number is between ${lowRange} and ${highRange}`;
        showFeedback('💡', hint, 'info');
        console.log(`💡 Hint: ${hint}`);
    }

    // Event listeners
    guessBtn.addEventListener('click', handleGuess);
    newGameBtn.addEventListener('click', resetGame);
    hintBtn.addEventListener('click', showHint);

    // Enter key support
    guessInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleGuess();
        }
    });

    // Keyboard shortcut: 'N' for new game, 'H' for hint
    document.addEventListener('keydown', function(e) {
        const tagName = e.target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') return;

        if (e.key === 'n' || e.key === 'N') {
            e.preventDefault();
            resetGame();
        } else if (e.key === 'h' || e.key === 'H') {
            e.preventDefault();
            showHint();
        }
    });

    // Initialize game
    resetGame();

    console.log('✅ Number Guessing Game initialized!');
    console.log('🎯 Try to guess the secret number (1-100)');
    console.log('⌨️ N: New Game | H: Hint | Enter: Guess');

})();