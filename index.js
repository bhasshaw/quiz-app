'use strict';

let quizScore = -1;
let quizProgress = -1;

function questionTemplate () {
 if (quizProgress < STORE.length) {
 	 	return `<div class='questionOutline col-12'>
				<form class="questionSelect">
					<fieldset>
						<legend><h2>${STORE[quizProgress].question}</h2></legend>
						<label class="answerOptions">
							<input value="${STORE[quizProgress].answers[0]}" type="radio" name="answer" required>
							<span>${STORE[quizProgress].answers[0]}</span>
						</label>
						<label class="answerOptions">
							<input value="${STORE[quizProgress].answers[1]}" type="radio" name="answer" required>
							<span>${STORE[quizProgress].answers[1]}</span>
						</label>
						<label class="answerOptions">
							<input value="${STORE[quizProgress].answers[2]}" type="radio" name="answer" required>
							<span>${STORE[quizProgress].answers[2]}</span>
						</label>
						<label class="answerOptions">
							<input value="${STORE[quizProgress].answers[3]}" type="radio" name="answer" required>
							<span>${STORE[quizProgress].answers[3]}</span>
						</label>
						<button type="submit" class="submitButton full-width">Submit</button>
					</fieldset>
				</form>
			</div>`;
} else {
	renderResults();
	$('.quizProgress').text(10);
}
}

function updateQuizScore () {
	quizScore++;
}

function updateQuizProgress () {
	quizProgress++;
	$('.quizProgress').text(quizProgress+1);
}

function handleStartButton () {
	$('.startButton').on('click', function () {
		updateQuizProgress();
		renderQuestion();
		userSelectAnswer();
	});
}

function renderQuestion () {
	$('.quizHolder').html(questionTemplate());
}

function userSelectAnswer () {
	$('form').on('submit', function(event) {
		event.preventDefault();
		let selected = $('input[type=radio]:checked').val();
		let correctAnswer = `${STORE[quizProgress].correctAnswer}`;
		if (selected === correctAnswer) {
			feedBackCorrect();
		} else {
			feedBackIncorrect();
		}
	});
}

function feedBackCorrect () {
	$('.quizHolder').html(feedBackCorrectTemp());
}

function feedBackIncorrect () {
	$('.quizHolder').html(feedBackIncorrectTemp());
}

function feedBackCorrectTemp () {
	updateQuizScore();
	$('.quizScore').text(quizScore+1);
	return `<div class="correctTemplate col-12">
				<h2>Correct!</h2>
				<button type=button class="nextButton full-width">Next</button>
			</div>`
}

function feedBackIncorrectTemp () {
	return `<div class="incorrectTemplate col-12">
				<h2>Sorry!</h2>
				<p>The correct answer is ${STORE[quizProgress].correctAnswer}!</p>
				<button type=button class="nextButton full-width">Next</button>
			</div>`
}

function handleNextButton () {
	$('main').on('click', '.nextButton', function(event) {
		updateQuizProgress();
    	renderQuestion();
    	userSelectAnswer();
	});
}

function renderResults () {
	$('.quizHolder').html(`<div class="submitPage">
								<h2>You scored a ${quizScore+1} out of 10!</h2>
								<button type=button class="restartButton full-width">Restart</button>
						   </div>`);
}

function handleRestartButton () {
	$('main').on('click', '.restartButton', function(event) {
		location.reload();
	});
}


function initializeQuiz () {
	handleStartButton();
	userSelectAnswer();
	handleNextButton();
	handleRestartButton();
}

initializeQuiz();
