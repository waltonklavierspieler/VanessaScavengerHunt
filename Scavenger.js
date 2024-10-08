const clueKey = [
    {q: 'Question 1.\nThere is one very short, charming brick road in our neighborhood.\nThere are 6 houses whose house numbers face the brick portion of the street. Sum them together, and what do you get?', ans: ['2584'], hint: 'Find Mountainview Road, and 4th Street. The first and last house numbers are 409 and 449...'},
    {q: 'Great job! Question 2.\nNext, head to the local over-priced convenience store on West Pearl. The store\'s logo has a fruit where one of the \'O\'s should be:\nWhat fruit is it?', ans: ['apple'], hint: 'One a day keeps the doctor away'},
    {q: 'Apples!! Okay, Question 3.\nSomewhere between the bike store and paper store is a statue of a boy playing with a dog.\nHow many of the dogs legs are ON the ground?', ans: ['3', 'three'], hint: 'Thnk tripod.'},
    {q: 'True story: if a dog statue has one foot in the air that means the dog died in battle! (This is not a true story)\nOk, Question 4!\nGo to the back patio at Trident and find the sand box. There is a sign there asking to keep the sand in the box.\nPut all the first letters of the sign together in a row and what gibberish word does it make (for compound words like \'sandbox\' only count the first letter)?', ans: ['phksisnotd'], hint: '\'Please Help Keep Sand In Sandbox Not On The Deck\' is what I think it said...'},
    {q: 'Hope you didn\'t spill any of that sand! Question 5:\nNext you\'ll take the alley passing from Centro towards Walnut street. Just before you exit the alley at Walnut, stop and look through the arched doorway at the end of the alley. Look across the street at a restaurant that has yet to open.\nWhat two words can you see from the alley?', ans: ['Garden bistro'], hint: 'The restaurant has a three-word name; from the alley you can only see the last two...'},
    {q: 'Garden Bistro! Question SIX.\nNext you\'ll want to find another statue near T\\ACO of children playing on a sled.\nWhat animal\'s head is on the front of their sled?', ans: ['lion'], hint: '\'Tis the month for the King of the Jungle'},
    {q: 'Lion head for a Leo Birthday! Question uhhhh... 7.\nContinue east on Walnut until you can see the Brew Market.\nWhat color is the awning?', ans: ['blue'], hint: 'In the Odyssey Homer would refer to the sea as \'wine dark\' instead of this color.'},
    {q: 'That\'s right, green!... Or was it brown?... You know me and colors. Next question!\nHead towards the courthouse now and look for the water feature in front of it. There is a placard describing its history.\nWhat year was the fountain renovated?', ans: ['1998'], hint: 'Some famous albums also came out this year: Hello Nasty by Beastie Boys, Black Star by Mos Def, Aeroplane over the Sea by Neutral Milk Hotel...'},
    {q: '1998, a fine year. Many events occured in 1998 according to Wikipedia. Question 9!\nYour next clue can be seen from the Avanti rooftop.\nFrom the mountain-facing side of the roof look north and you will see a belltower with a cross-shaped weathervane on top.\nWhat common projectile skewers the spire and is aiming towards Sanitas?', ans: ['arrow', 'an arrow', 'a arrow'], hint: 'Cupid\', Apollo\', and the Trojan prince Paris\' projectile of choice.'},
    {q: 'Arrow! Well done, that one involved some climbing. Next question!\nFrom Avanti, head back to 13th and Spruce and find the events space named after a famous Dutch painter. There are a lot of quotes from famous artists and thinkers all over the building. Which artist said:\n\'The defining function of the artist is to cherish consciousness.\'?', ans: ['picasso', 'pablo picasso'], hint: 'Major contributor to Cubism, beloved for his \'Blue Period\''},
    {q: 'Good ol Picasso, yep! I think you have earned yourself a drink at this point. Head to Beleza and get yourself a latte, my treat, with this gift card number: 7782730597104984. PIN: 1399.\nWhen that\'s done, head to North Boulder Park and someone familiar will give you the passcode...', ans: ['chicken', 'chicken!'], hint: 'Not a trick question: go get some coffee!'}
    // Add more clues here
    // Add as many clues as necessary
];

let currentClueIndex = 0;

function save() {
    localStorage.setItem('currentClueIndex', currentClueIndex);
}

function load() {
    const progress = localStorage.getItem('currentClueIndex');
    if (progress !== null) {
        currentClueIndex = parseInt(progress);
    } else {
        currentClueIndex = 0;
    }
    console.log('Loaded currentClueIndex:', currentClueIndex);
}

function remove() {
    localStorage.removeItem('currentClueIndex');
}

function fadeOut(element, callback) {
    element.classList.add('fade-out');

    setTimeout(() => {
        element.innerHTML = '';
    }, 300);

    setTimeout(() => {
        callback();
        element.classList.remove('fade-out');
    }, 500); 
}

function resetGame() {
    load();
    if (currentClueIndex > 0) {
        showNextClue();
    } else {
        showStartScreen();
    }
}

function showStartScreen() {
    const resetScreen = document.querySelector('.container');
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
    `;
    const startButton = document.getElementById("startGame");
    startButton.addEventListener('click', startGame);
}

function startGame() {
    const container = document.querySelector('.container');
    fadeOut(container, () => {
        showNextClue();
    });
}

function showNextClue() {
    const container = document.querySelector('.container');
    fadeOut(container, () => {
        if (currentClueIndex < clueKey.length) {
            const clueText = clueKey[currentClueIndex].q.replace(/\n/g, '<br><br>');
            container.innerHTML = `
                <div class="clue">${clueText}</div>
                <div class="answer">
                    <form id="answerForm" onsubmit="return false;">
                        <input type="text" id="answerInput" placeholder="???">
                        <button id="answerButton" type="submit">Submit</button>
                        <button id="hintButton">Hint</button>
                    </form>
                </div>
            `;
            const answerButton = document.getElementById("answerButton");
            answerButton.addEventListener('click', answerCheck);
            const hintButton = document.getElementById("hintButton");
            hintButton.addEventListener('click', giveHint);
        } else {
            showEndScreen();
        }
    });
}

function answerCheck() {
    const userAnswer = document.getElementById("answerInput").value;
    const correctAnswers = clueKey[currentClueIndex].ans;

    if (correctAnswers.some(answer => wordCheck(userAnswer, answer))) {
        currentClueIndex++;
        save(); // Save progress after a correct answer
        showNextClue();
    } else {
        alert("Try again!");  
    }
}

function giveHint() {
    const thisHint = clueKey[currentClueIndex].hint;
    alert(thisHint);
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
    resetButton.addEventListener('click', () => {
        remove();
        resetGame();
    });
}

function clearScreen(div) {
    div.innerHTML = '';
}

function wordCheck(word, check) {
    return check.toLowerCase() === word.toLowerCase();
}

// Initialize the game
resetGame();
