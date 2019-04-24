let questionNumber = 0;
let score = 0;
//generate question html
function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <br>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <br>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <br>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <br>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <br><br>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

//increment question number
function changeQuestionNumber () {
  //if (questionNumber < STORE.length) {
    questionNumber ++;
  //}
  $('.questionNumber').text(questionNumber+1);
}

//increment score
function changeScore () {
  score ++;
}

//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.img').remove();
    renderQuestion();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
  });
}
function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('.questionAnswerForm').on('submit', 'form', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    console.log(answer, 'user selected answer');
    console.log(correctAnswer, 'correct');

    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="https://www.respectablereviews.com/wp-content/uploads/2016/04/best-youth-baseball-glove-1024x469.jpg" alt="baseball and glove"/></div><p><b>You got it right!</b></p><br><button type=button class="nextButton">Next</button></div>`);
}

//user feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  // let iconImage = `${STORE[questionNumber].icon}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="http://www.stillyvalleylittleleague.com/imagedata/Umpirethirdstrike_crop_north.jpg" alt="umpire calling you out"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><br><button type=button class="nextButton">Next</button></div>`);
}

//update score text
function updateScore () {
  changeScore();
  $('.score').text(score);
}

//when quiz is over this is the html for the page
function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You're on base!</h3> <p>You got ${score} / 10</p><p>You're ready to play in the majors!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Almost there!</h3> <p>You got ${score} / 10</p><p>Batting practice can help you get to the majors.</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Consider finding a different sport.</h3> <p>You got ${score} / 10</p><p>Practice, practice, practice and take the quiz again!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

//what happens when the user clicks next
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    //userSelectAnswer();
  });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz functions
function createQuiz () {
  startQuiz();
 // renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);

