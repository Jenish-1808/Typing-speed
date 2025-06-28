const textDisplay = document.getElementById('text-display');
const input = document.querySelector('.input-field');
const timeDisplay = document.getElementById('time-left');
const resultsBox = document.getElementById("results-box");
const finalWpm = document.getElementById("final-wpm");
const finalCpm = document.getElementById("final-cpm");
const finalMistakes = document.getElementById("final-mistakes");
const resetBtn = document.getElementById("reset-btn");
const restartBtn = document.getElementById("restart-btn");
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
    textDisplay.innerHTML = '';
    paragraphs[randomIndex].split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;
        textDisplay.appendChild(span);
    });
    textDisplay.querySelectorAll('span')[0].classList.add('active');
    input.focus();
}

function startTimer() {
    isTyping = true;
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) finishGame();
    }, 1000);
}

function handleTyping(e) {
    const chars = textDisplay.querySelectorAll('span');
    const typedChar = e.data || '';
    const currentChar = chars[charIndex].textContent;

    if (!isTyping) startTimer();

    if (typedChar === currentChar) {
        chars[charIndex].classList.remove('active', 'incorrect');
        chars[charIndex].classList.add('correct');
        typingSound.currentTime = 0;
        typingSound.play();
        charIndex++;
        input.value = '';
        if (charIndex < chars.length) {
            chars[charIndex].classList.add('active');
        } else {
            finishGame();
        }
    } else if (typedChar) {
        if (!chars[charIndex].classList.contains('incorrect') && 
            !chars[charIndex].classList.contains('correct')) {
            mistakes++;
        }
        chars[charIndex].classList.remove('active');
        chars[charIndex].classList.add('incorrect');
    }
}

function finishGame() {
    clearInterval(timer);
    const minutes = (maxTime - timeLeft) / 60;
    const wpm = Math.round(((charIndex - mistakes) / 5) / minutes) || 0;
    const cpm = Math.round((charIndex - mistakes) / minutes) || 0;
    finalWpm.textContent = wpm;
    finalCpm.textContent = cpm;
    finalMistakes.textContent = mistakes;
    resultsBox.style.display = "block";
    resultsBox.scrollIntoView({ behavior: 'smooth' });
}

function resetGame() {
    clearInterval(timer);
    resultsBox.style.display = "none";
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    timeDisplay.textContent = timeLeft;
    input.value = '';
    loadParagraph();
}

input.addEventListener('input', handleTyping);
resetBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', resetGame);
document.addEventListener('keydown', () => input.focus());
textDisplay.addEventListener('click', () => input.focus());

loadParagraph();
