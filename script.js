const typingText = document.querySelector('.typing-test p');
const input = document.querySelector('.input-field');
const timeDisplay = document.querySelector('.time-container span b');
const resultsBox = document.getElementById("results-box");
const finalWpm = document.getElementById("final-wpm");
const finalCpm = document.getElementById("final-cpm");
const finalMistakes = document.getElementById("final-mistakes");
const resetBtn = document.getElementById("reset-btn");
const liveResetBtn = document.getElementById("live-reset-btn");
const typingSound = new Audio('s2.mp3');  

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

const paragraphs = [
    "the sun shines brightly over the vast fields where farmers work hard to grow their crops the wind moves gently through the tall trees making the leaves dance in the air",
    "in the quiet forest a deer walks carefully among the thick bushes listening to the sounds of birds singing in the trees while a rabbit hops quickly through the soft grass",
    "the waves crash against the shore as the seagulls fly above searching for food the ocean stretches far beyond the horizon where the sky meets the deep blue water",
    "children gather in the park to play and run freely enjoying the warmth of the sun as they chase each other around the green open fields filled with flowers and tall trees",
    "a cat sits by the window watching the raindrops fall softly outside while a dog sleeps peacefully on the warm floor dreaming about running in the wide open fields",
    "the river flows gently through the valley carrying tiny fish and fallen leaves as it moves past the trees and rocks where birds sit and sing their beautiful songs",
    "a little girl walks through the garden picking fresh flowers and smelling their sweet scent while butterflies flutter around her in the bright morning sunlight",
    "the farmer wakes up early every day to take care of his crops and animals making sure they grow strong and healthy under the bright sky and soft cool breeze",
    "a boy rides his bicycle along the quiet road surrounded by tall trees and golden fields feeling the fresh air against his face as he enjoys the peaceful morning",
    "a squirrel climbs quickly up the tree jumping from branch to branch as it looks for food while the cool wind blows through the forest making the leaves rustle"
];


function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = '';

    paragraphs[randomIndex].split('').forEach(char => {
        let span = document.createElement('span');
        span.innerText = char; 
        typingText.appendChild(span);
    });

    typingText.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener('click', () => input.focus());
}

function playTypingSound() {
    typingSound.currentTime = 0; 
    typingSound.play();
}

function initTyping(event) {
    const chars = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    const currentChar = chars[charIndex].innerText;

    if (charIndex < chars.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(updateTimer, 1000);
            isTyping = true;
        }

        if (typedChar === currentChar) {
            chars[charIndex].classList.add('correct');
            playTypingSound(); // Play sound only when a key is pressed
        } else {
            if (!(currentChar === " " && typedChar === "")) { 
                chars[charIndex].classList.add('incorrect');
                mistakes++;
            }
        }

        charIndex++;
        if (charIndex < chars.length) {
            chars[charIndex].classList.add('active');
        }

        if (charIndex === chars.length) {
            clearInterval(timer);
            input.value = '';
            showResults();
        }
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
    } else {
        clearInterval(timer);
        showResults();
    }
}

function showResults() {
    finalWpm.innerText = Math.round(((charIndex - mistakes) / 5) / (maxTime / 60));
    finalCpm.innerText = charIndex - mistakes;
    finalMistakes.innerText = mistakes;
    resultsBox.style.display = "block";
}

function resetGame() {
    resultsBox.style.display = "none"; // Hide results box
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = 0;
    isTyping = false;
    timeDisplay.innerText = timeLeft;
    input.value = '';
}

input.addEventListener("input", initTyping);
resetBtn.addEventListener("click", resetGame);
liveResetBtn.addEventListener("click", resetGame);
loadParagraph();
