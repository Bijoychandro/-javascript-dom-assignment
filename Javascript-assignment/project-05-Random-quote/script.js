// script.js - Random Quote Generator Logic

(function() {
    'use strict';

    // Array of 10 quotes (more than the required 5)
    const quotes = [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "In the middle of difficulty lies opportunity.",
            author: "Albert Einstein"
        },
        {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            text: "It does not matter how slowly you go as long as you do not stop.",
            author: "Confucius"
        },
        {
            text: "The only impossible journey is the one you never begin.",
            author: "Tony Robbins"
        },
        {
            text: "Life is what happens when you're busy making other plans.",
            author: "John Lennon"
        },
        {
            text: "The purpose of our lives is to be happy.",
            author: "Dalai Lama"
        },
        {
            text: "Get busy living or get busy dying.",
            author: "Stephen King"
        },
        {
            text: "You miss 100% of the shots you don't take.",
            author: "Wayne Gretzky"
        }
    ];

    // DOM elements
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    const quoteNumber = document.getElementById('quoteNumber');
    const totalQuotes = document.getElementById('totalQuotes');
    const quoteBox = document.querySelector('.quote-box');

    // State
    let currentIndex = 0;
    let previousIndex = -1;

    // Set total quotes count
    totalQuotes.textContent = quotes.length;

    // Function to get random quote
    function getRandomQuote() {
        let randomIndex;
        
        // Make sure we don't get the same quote twice in a row
        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === previousIndex && quotes.length > 1);
        
        previousIndex = currentIndex;
        currentIndex = randomIndex;
        
        return quotes[randomIndex];
    }

    // Function to display a quote with animation
    function displayQuote(quote) {
        // Add fade effect
        quoteBox.classList.add('fade');
        
        // Update content after a small delay
        setTimeout(() => {
            quoteText.textContent = quote.text;
            quoteAuthor.textContent = quote.author;
            quoteNumber.textContent = currentIndex + 1;
            
            // Remove fade effect
            quoteBox.classList.remove('fade');
        }, 200);
    }

    // Function to show new random quote
    function showNewQuote() {
        const quote = getRandomQuote();
        displayQuote(quote);
        
        // Log for debugging
        console.log(`💬 Quote #${currentIndex + 1}: "${quote.text}" — ${quote.author}`);
    }

    // Add event listener to button
    newQuoteBtn.addEventListener('click', showNewQuote);

    // Keyboard shortcut: Press 'Space' or 'Q' for new quote
    document.addEventListener('keydown', function(e) {
        const tagName = e.target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') return;

        if (e.key === ' ' || e.key === 'Space' || e.key === 'q' || e.key === 'Q') {
            e.preventDefault();
            showNewQuote();
        }
    });

    // Show initial random quote on load
    function initialize() {
        const initialQuote = quotes[Math.floor(Math.random() * quotes.length)];
        currentIndex = quotes.indexOf(initialQuote);
        previousIndex = -1;
        displayQuote(initialQuote);
        
        console.log('✅ Random Quote Generator initialized!');
        console.log(`📚 Total quotes: ${quotes.length}`);
        console.log('💡 Click the button or press Space/Q for a new quote');
    }

    initialize();

})();