       // --- JAVASCRIPT LOGIC ---
        document.addEventListener('DOMContentLoaded', () => {
            const choices = ['rock', 'paper', 'scissors'];
            const choiceEmojis = {
                rock: '✊',
                paper: '✋',
                scissors: '✌️'
            };

            // Get DOM elements
            const gameStartContainer = document.getElementById('game-start');
            const resultsContainer = document.getElementById('results-container');
            const choiceButtons = document.querySelectorAll('.choice-btn');
            const resultText = document.getElementById('result-text');
            const userChoiceDiv = document.getElementById('user-choice');
            const computerChoiceDiv = document.getElementById('computer-choice');
            const userChoiceIcon = document.getElementById('user-choice-icon');
            const computerChoiceIcon = document.getElementById('computer-choice-icon');
            const playAgainBtn = document.getElementById('play-again-btn');
            
            let isGameActive = true;

            // Add event listeners to choice buttons
            choiceButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (!isGameActive) return;
                    isGameActive = false; // Prevent multiple clicks
                    playGame(button.id);
                });
            });

            // Add event listener to "Play Again" button
            playAgainBtn.addEventListener('click', resetGame);
            
            function playGame(userChoice) {
                // Hide the initial choice view with a fade out effect
                gameStartContainer.style.transition = 'opacity 0.5s ease-out';
                gameStartContainer.style.opacity = '0';
                
                // Simulate computer thinking
                setTimeout(() => {
                    gameStartContainer.classList.add('hidden');
                    const computerChoice = getComputerChoice();
                    const winner = getWinner(userChoice, computerChoice);
                    displayResults(userChoice, computerChoice, winner);
                    resultsContainer.classList.remove('hidden');
                    resultsContainer.style.opacity = '1';
                }, 500); // Wait for fade out to complete
            }

            function getComputerChoice() {
                const randomIndex = Math.floor(Math.random() * choices.length);
                return choices[randomIndex];
            }

            function getWinner(user, computer) {
                if (user === computer) return 'draw';
                if (
                    (user === 'rock' && computer === 'scissors') ||
                    (user === 'paper' && computer === 'rock') ||
                    (user === 'scissors' && computer === 'paper')
                ) {
                    return 'win';
                }
                return 'lose';
            }

            function displayResults(user, computer, winner) {
                // Set result text and class
                resultText.textContent = getResultMessage(winner);
                resultText.className = winner;
                
                // Set icons
                userChoiceIcon.textContent = choiceEmojis[user];
                computerChoiceIcon.textContent = choiceEmojis[computer];
                
                // Reset any previous winner classes
                userChoiceDiv.classList.remove('winner');
                computerChoiceDiv.classList.remove('winner');
                userChoiceIcon.style.color = 'white';
                computerChoiceIcon.style.color = 'white';
                
                // Apply winner styling
                if (winner === 'win') {
                    userChoiceDiv.classList.add('winner');
                    userChoiceIcon.style.color = 'var(--win-color)';
                } else if (winner === 'lose') {
                    computerChoiceDiv.classList.add('winner');
                    computerChoiceIcon.style.color = 'var(--lose-color)';
                } else {
                    userChoiceDiv.classList.add('winner');
                    computerChoiceDiv.classList.add('winner');
                    userChoiceIcon.style.color = 'var(--draw-color)';
                    computerChoiceIcon.style.color = 'var(--draw-color)';
                }
            }
            
            function getResultMessage(winner) {
                switch (winner) {
                    case 'win': return "You Win!";
                    case 'lose': return "You Lose!";
                    case 'draw': return "It's a Draw!";
                }
            }

            function resetGame() {
                resultsContainer.style.transition = 'opacity 0.5s ease-out';
                resultsContainer.style.opacity = '0';
                
                setTimeout(() => {
                    resultsContainer.classList.add('hidden');
                    gameStartContainer.classList.remove('hidden');
                    gameStartContainer.style.opacity = '1';
                    isGameActive = true;
                }, 500);
            }
        });