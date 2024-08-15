const clueKey = [
    {q: 'Question 1.\nThere is one brick road in our neighborhood. Starting from the corner on 4th street, head east to the end of the brick portion and add the house numbers together.\n(There should be 6 house numbers total that face the street, the first and last numbers are 409 & 449)\nWhat number do you get?', ans: ['2584']},
    {q: 'Great job! Question 2.\nNext, head to the local over-priced convenience store on West Pearl. The store\'s logo has a fruit where one of the \'O\'s should be:\nwhat fruit is it?', ans: ['apple']},
    {q: 'Apples!! Okay, Question 3.\nSomewhere between the bike store and paper store is a statue of a boy playing with a dog. The dog has some paws on the ground and some in the air:\nHow many of the dogs legs are ON the ground?', ans: ['3', 'three']},
    {q: 'True story: if a dog statue has one foot in the air that means the dog died in battle! (This is not a true story)\nOk, Question 4!\nGo to the back patio at Trident and find the sand box. There is a sign there asking to keep the sand in the box.\nPut all the first letters of the sign together in a row and what gibberish word does it make (for compound words like \'sandbox\' only count the first letter)?', ans: ['phksisnotd']},
    {q: 'Hope you didn\'t spill any of that sand! Question 5:\nNext you\'ll take the alley passing from Centro towards Walnut street. Just before you exit the alley at Walnut, stop and look through the arched doorway at the end of the alley. Look across the street at a restaurant that has yet to open.\nWhat two words can you see from the alley?', ans: ['Garden bistro']},
    {q: 'Garden Bistro! Question SIX.\nNext you\'ll want to find another statue near T\\ACO of children playing on a sled.\nWhat animal\'s head is on the front of their sled?', ans: ['lion']},
    {q: 'Lion head for a Leo Birthday! Question uhhhh... 7.\nContinue east on Walnut until you can see the Brew Market.\nWhat color is the awning?', ans: ['blue']},
    {q: 'That\'s right, green!... Or was it brown?... You know me and colors. Next question!\nHead towards the courthouse now and look for the water feature in front of it. There is a placard describing its history.\nWhat year was the fountain renovated?', ans: ['1998']},
    {q: '1998, a fine year. Many events occured in 1998 according to Wikipedia. Question 9!\nYour next clue can be seen from the Avanti rooftop.\nFrom the mountain-facing side of the roof look north and you will see a belltower with a cross-shaped weathervane on top.\nWhat common projectile skewers the spire and is aiming towards Sanitas?', ans: ['arrow', 'an arrow', 'a arrow']},
    {q: 'Arrow! Well done, that one involved some climbing. Next question!\nFrom Avanti, head back to 13th and Spruce and find the events space named after a famous Dutch painter. There are a lot of quotes from famous artists and thinkers all over the building. Which artist said:\n\'The defining function of the artist is to cherish consciousness.\'?', ans: ['picasso', 'pablo picasso']},
    {q: 'Good ol Picasso, yep! I think you have earned yourself a drink at this point. Head to Beleza and get yourself a latte, my treat, with this gift card number: 7782730597104984. PIN: 1399.\nWhen that\'s done, head to North Boulder Park and someone familiar will give you the passcode...', ans: ['chicken', 'chicken!']}
    // Add more clues here
    // Add as many clues as necessary
];

let currentClueIndex = 0;

function fadeOut(element, callback) {
    element.classList.add('fade-out');
    setTimeout(() => {
        callback();
        element.classList.remove('fade-out');
    }, 500); // Match the CSS transition duration
}

function resetGame() {
    let resetScreen = document.querySelector('.container');
    resetScreen.innerHTML = `
        <div class="startScreen">
            <h1 id="introduction">HAPPY BIRTHDAY BOO! 
                <br>
                I'm sorry I'm not there to celebrate it with you... In my absence, I've arranged for a little scavenger hunt for you to do. It should take 
                about 2 hours to complete on foot. You will need only your phone!
                <br>
                Ready to get started?
            </h1>
            <button id="startGame">Begin the hunt!</button>
        </div>
    `
    const startButton = document.getElementById("startGame");
    startButton.addEventListener('click', startGame);
}

function startGame() {
    const container = document.querySelector('.container');
    fadeOut(container, () => {
        currentClueIndex = 0; // Reset to the first clue
        showNextClue();
    });
}

function showNextClue() {
    const container = document.querySelector('.container');
    fadeOut(container, () => {
        if (currentClueIndex < clueKey.length) {
            container.innerHTML = `
                <div class="clue">${clueKey[currentClueIndex].q}</div>
                <div class="answer">
                    <form id="answerForm" onsubmit="return false;">
                        <input type="text" id="answerInput" placeholder="Enter your answer here">
                        <button id="answerButton" type="submit">Submit</button>
                    </form>
                </div>
            `;

            const answerButton = document.getElementById("answerButton");
            answerButton.addEventListener('click', answerCheck);
        } else {
            showEndScreen(); // If no more clues, show the end screen
        }
    });
}

function answerCheck() {
    const userAnswer = document.getElementById("answerInput").value;
    const correctAnswers = clueKey[currentClueIndex].ans;

    if (correctAnswers.some(answer => wordCheck(userAnswer, answer))) {
        currentClueIndex++;
        showNextClue();
    } else {
        alert("Try again!");  // Provide feedback if the answer is incorrect
    }
}

function showEndScreen() {
    const endScreen = document.querySelector('.container');
    clearScreen(endScreen);
    endScreen.innerHTML = `
        <div class="endScreen">
            <h1>Congratulations Boo!</h1>
            <p>And happy birthday! I love you and I'll see you soon!</p>
            <button id="resetButton">Play Again</button>
        </div>
    `;
    
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener('click', resetGame);
}

function clearScreen(div) {
    div.innerHTML = '';
}

function wordCheck(word, check) {
    let lowerCaseCheck = check.toLowerCase();
    let lowerCaseWord = word.toLowerCase();
    return lowerCaseCheck === lowerCaseWord;
}

// Initialize the game
resetGame();
