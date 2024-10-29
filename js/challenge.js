const counterDisplay = document.getElementById('counter');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const heartButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const likesList = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');

let counter = 0;
let isPaused = false;
let intervalId = null;
let LikeCounts = {};

function startCounter() {
    intervalId = setInterval(() => {
        if (!isPaused) {
            counter++;
            updateCounterDisplay();
        }
    }, 1000);
}

function updateCounterDisplay() {
    counterDisplay.textContent = counter;
}

function likesCounter() {
    if (!LikeCounts[counter]) {
        likesCounter[counter] = 1;
    } else {
        LikeCounts[counter]++;
    }

    const likeItem = document.getElementById(`like-${counter}`);
    if (likeItem) {
        likeItem.textContent = `${counter} has been liked ${LikeCounts[counter]} time(s)`;
    } else {
        const newLikeItem = document.createElement(`li`);
        newLikeItem.id = `like-${counter}`;
        newLikeItem.textContent = `${counter} has been liked ${LikeCounts[counter]} time(s)`;
        likesList.appendChild(newLikeItem);
    }
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(intervalId);
        pauseButton.textContent = 'resume';
        minusButton.disabled = true;
        plusButton.disabled = true;
        heartButton.disabled = true;
    } else {
        startCounter();
        pauseButton.textContent = 'pause';
        minusButton.disabled = false;
        plusButton.disabled = false;
        heartButton.disabled = false;
    }
}

minusButton.addEventListener('click', () => {
    if (!isPaused) {
        counter--;
        updateCounterDisplay();
    }
});

plusButton.addEventListener('click', () => {
    if (!isPaused) {
        counter++;
        updateCounterDisplay();
    }
});

heartButton.addEventListener('click', () => {
    if (!isPaused) {
        likeCounter();
    }
});

pauseButton.addEventListener('click', togglePause);

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText !== '') {
        const commentItem = document.createElement('p');
        commentItem.textContent = commentText;
        commentsList.appendChild(commentItem);
        commentInput.value = '';
    }
});

startCounter();
