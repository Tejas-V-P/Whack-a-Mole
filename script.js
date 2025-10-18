document.addEventListener('DOMContentLoaded', () => {

    // Get all the necessary elements from the DOM
    const moles = document.querySelectorAll('.mole');
    const scoreBoard = document.querySelector('#score');
    
    let score = 0;
    let activeMole = null; // To keep track of the currently visible mole
    let gameTimer = null; // To hold the game loop interval
    let lastMole; // To prevent the same mole from appearing twice in a row

    /**
     * Picks a random mole button from the node list without
     * picking the same one twice in a row.
     */
    function randomMole() {
        const idx = Math.floor(Math.random() * moles.length);
        const mole = moles[idx];
        if (mole === lastMole) {
            // If the same mole is picked, run the function again to get a new one
            return randomMole();
        }
        lastMole = mole;
        return mole;
    }

    /**
     * Makes a mole "pop up" by changing its appearance and sets a timer
     * to make it disappear.
     */
    function popUp() {
        // Select a random mole to activate
        const mole = randomMole();
        
        // Change the background color to show it's active.
        mole.style.backgroundColor = '#8B4513'; // A brown color for the mole
        
        activeMole = mole;

        // Set a timer to make the mole disappear if it's not whacked.
        setTimeout(() => {
            // Only hide it if it hasn't been whacked already
            if (activeMole === mole) { 
                mole.style.backgroundColor = ''; // Revert to original style
                activeMole = null;
            }
        }, 900); // The mole stays visible for 900 milliseconds.
    }

    /**
     * Handles the "whack" event when a user clicks a mole button.
     * @param {Event} e The click event object.
     */
    function whack(e) {
        // We check if the clicked button is the currently active mole.
        if (this === activeMole) {
            score++;
            scoreBoard.textContent = score;

            // Make the mole disappear immediately after being whacked.
            this.style.backgroundColor = ''; // Revert to original style
            activeMole = null; // The mole is no longer active.
            
            // --- NEW CODE START ---
            // Check if the score has reached 5 to end the game.
            if (score === 5) {
                clearInterval(gameTimer); // Stop the game loop
                alert('Game Over! You won! 🎉');
            }
            // --- NEW CODE END ---
        }
    }

    // Add a click event listener to each mole button.
    moles.forEach(mole => mole.addEventListener('click', whack));

    /**
     * Starts the game by resetting the score and starting the game loop.
     */
    function startGame() {
        score = 0;
        scoreBoard.textContent = score;
        
        if (gameTimer) {
            clearInterval(gameTimer); 
        }

        // Start the game loop, making a mole pop up at a regular interval.
        gameTimer = setInterval(popUp, 1000); // A new mole appears every 1 second.
    }

    // Start the game when the page loads.
    startGame();
});
