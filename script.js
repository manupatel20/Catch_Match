const cards = document.querySelectorAll('.memory-card');
let counter = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// var modal = document.getElementById("pausemodal");

// var img = document.getElementsByClassName("pause");
// img.onclick = function() {
//     modal.style.display = "block";
// }

$(document).ready(function() {
    $("#pop").click(function() {
        $('#pausemodal').modal('show');
    });
});

function resumefunction() {
    $("#pausemodal").modal('hide');

}

function restartfunction() {
    location.reload();
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;

    }

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();


}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();


}

function disableCards() {
    counter = counter + 1;
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    if (counter == 6) {
        $('#exampleModal').modal('show');
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard));