var game = [
  {question:"What team eliminated the USA in the past two world cups?", correct:"Gana",answers:["Gana","Italy","Japan","Germany"]},
  {question:"Which player scored the most goals in a single World Cup edition?", correct: "Just Fontaine", answers:["Just Fontaine","Ronaldo","Lukas Podolski","Klose"]},
  {question:"Which team had the least amount of losses in the 1978 World Cup?", correct: "Brazil",answers:["Brazil","Argentina","Netherlands","Poland"]},
  {question:"Who is the youngest player to ever play in a World Cup?" ,correct:"Norman Whiteside" , answers: ["Norman Whiteside","Pele","Steven Gerrard", "Jurgen Klinsmann"]},
  {question:"Which player has played the most World Cup matches?", correct: "Lothar Matthaus", answers:["Lothar Matthaus","Gianluigi Buffon","Francesco Totti", "Pele"]},
  {question:"Second place 1986 World Cup:", correct:"West Germany" , answers: ["West Germany","Argentina","France","Belgium"]},
  {question:"Who was the only manager to win the FIFA World Cup twice? " , correct:"Vittorio Pozzo" , answers: ["Vittorio Pozzo","Vicente Feola","Carlos Bilardo","Alberto Suppici"]},
  {question:"What was the original name of the FIFA World Cup Jules Rimet trophy? " , correct:"Victory" , answers: ["Victory","Georges Pompidou","Coupe du Monde","Rimet"]},
  {question:"Who received the golden ball in the 2002 World Cup?" , correct:"Oliver Kahn" , answers: ["Oliver Kahn","Ronaldo","Ronaldinho","Phillip Lahm"]},
  {question:"Who received the golden boot in the 2010 World Cup?" , correct:"Thomas Muller" , answers: ["Thomas Muller","James Rodriguez","David Villa","Wesley Sneijder"]},
  {question:"Which team received the most entertaining team award in the 2002 World Cup?" , correct: "South Korea" , answers: ["Brazil","South Korea","Turkey","France"]},
  {question:"In what year was the first World Cup held, and in which country?" , correct:"Uruguay, 1930" , answers: ["Uruguay, 1930", "Uruguay, 1928", "Italy, 1928", "Brazil, 1934"]},
  {question:"How many countries participated in the first World Cup?" , correct:"13" , answers: ["13","16","14","20"]},
  {question:"Which was the first team to win the World Cup twice?" , correct:"Italy" , answers: ["Italy","Brazil","Germany","Spain"]},
  {question:"Who is the oldest player to appear in the World Cup?" , correct:"Faryd Mondragon" , answers: ["Faryd Mondragon","Gianluigi Buffon","Dino Zoff","Roger Milla"]},
  {question:"Who is the only player to score a hattrick in a World Cup final?" , correct:"Geoffrey Hurst" , answers: ["Just Fontaine","Geoffrey Hurst","Roger Milla", "Lothar Matthaus"]},
  {question:"In which World Cup did players first wear jerseys with their surname on the back?" , correct:"1994" , answers: ["1990","1994","1998","1986"]},
  {question:"When will the new format of 48 teams competition start?" , correct:"2026" , answers: ["2026","2022","2030","2034"]},
  {question:"How many times has the USA classified for the World Cup?" , correct:"10" , answers: ["8","10","15","12"]},
  {question:"1990 Runner up:" , correct:"Argentina" , answers: ["Argentina","Germany","England","Italy"]},
  {question:"2002 Third Place:" , correct:"Turkey" , answers: ["Turkey","South Korea","USA","Japan"]},
  {question:"1994 4th Place:" , correct:"Bulgaria" , answers: ["Bulgaria","Belgium","Sweden","Russia"]},
  {question:"Germany's coach in 1970:" , correct:"Helmut Schön" , answers: ["Helmut Schön","Angelo Niculescu","Josef Marko","Alf Ramsey"]},
  {question:"Golden Ball 1986:" , correct:"Diego Maradona" , answers: ["Diego Maradona","Paolo Rossi","Giuseppe Galderisi","Luis Islas"]},
  {question:"Golden Ball 2014:" , correct:"Lionel Messi" , answers: ["Lionel Messi","Thomas Muller","Arjen Robben","Iniesta"]},
  {question:"Which World Cup had the highest average attendance?" , correct:"2014" , answers: ["2014","2010","2002","1994"]},
  {question:"When Buffon played made his debut for Italy this player was not yet born:" , correct:"Kylian Mbappe" , answers: ["Kylian Mbappe","Paulo Dybala","Leroy Sané","Dele Alli"]},
  {question:"Nation with the most World Cup third place trophies:" , correct:"Germany" , answers: ["Germany","Brazil","Argentina","Italy"]},
  {question:"Which is the only CONMEBOL nation to never qualify for the World Cup?" , correct:"Venezuela" , answers:["Venezuela","Peru","Panama","Guatemala"]},
  {question:"Which team is Russia playing in the opening match in the 2018 World Cup?", correct:"Saudi Arabia" , answers: ["Saudi Arabia","Egypt","Uruguay","Portugal"]},
  {question:"Most expensive squad in the 2018 World Cup:", correct:"Brazil" , answers: ["Brazil","Germany","France","Spain"]},
  {question:"All time best World Cup attack:" , correct:"Germany" , answers: ["Brazil","Germany","Argentina","Italy"]},
];


var jumbo = document.querySelector(".jumbotron");
var questionDisplay = document.querySelector("#question")

var rightAnswers = 0;
var wrongAnswers = 0;

var rightDisplay = document.querySelector("#rightAnswers");
var wrongDisplay = document.querySelector("#wrongAnswers")

var question = document.querySelector(".next");
var guess = document.querySelectorAll(".choice");
var correctAnswer;
var randomQuestion;

var shuffledGame = shuffle(game);
var lengthOfGame = game.length;

// Run game.
init();

//
function init() {
  chooseQuestion();
  makeAguess();
}

// Change question displayed and buttons text.
function changeQuestion() {
    chooseQuestion();
    jumbo.classList.remove("right");
    jumbo.classList.remove("wrong");
}

// Change text in each button to the corresponding element in same index from shuffled answers array.
function changeButtonsText() {
  var shuffledAnswers = shuffle(game[randomQuestion].answers);
  for (var i = 0; i < guess.length; i++) {
    guess[i].textContent = shuffledAnswers[i];
  }
};

// Shuffle possible answers.
function shuffle(array) {
  for (var i = array.length - 1; i > 0 ; i--) {
    var j = Math.floor(Math.random() * (i+1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};


// Pick a random question from the bunch.
function generateQuestion() {
  return Math.floor(Math.random() * game.length)
};

// Player's guess.
function makeAguess() {
  for (var i = 0; i < guess.length; i++) {
    guess[i].addEventListener("click", function() {
      var clickedColor = this.textContent;

      if (clickedColor === correctAnswer) {
        correctChoice();
      }
      else {
        wrongChoice();
      }
    })
  }
};

// Either keeping choosing questions or end the game.
function chooseQuestion() {
  if (game.length === 0) {
    gameOver();
  }
  else {
    gameNotOver();
  }
};

// This function determines if players choice was the correct choice.
// If it is the correct choice it adds a point to the rightAnswers, disables enableButtons
// and transitions to next question.
function correctChoice() {
  jumbo.classList.add("right");
  rightAnswers++;
  rightDisplay.textContent = rightAnswers;
  disableButtons();
  transitionToNext();
};

//  See correctChoice. This function is if player chooses wrong choice.
function wrongChoice() {
  jumbo.classList.add("wrong");
  wrongAnswers++;
  wrongDisplay.textContent = wrongAnswers;
  disableButtons();
  transitionToNext();
};

// Disables buttons in order for players not to be able to click multiple times on the same option.
function disableButtons() {
  for (var i = 0; i < guess.length; i++) {
    guess[i].disabled = true;
  }
};

// Enables Buttons.
function enableButtons() {
  for (var i = 0; i < guess.length; i++) {
    guess[i].disabled = false;
  }
};

// textContent based on players score.
function gameOver() {
  var gameScore = rightAnswers/wrongAnswers;

  if (wrongAnswers === 0) {
    questionDisplay.textContent = "YOU'RE A WALKING SOCCER ENCICLOPEDIA! " + "CORRECT:" + rightAnswers + " " + "INCORRECT:" + wrongAnswers;
  }
  else if (gameScore === 1) {
    questionDisplay.textContent = "Not Bad...Not Good...GAME OVER! " + "CORRECT:" + rightAnswers + " " + "INCORRECT:" + wrongAnswers;
  }
  else if (gameScore > 1) {
    questionDisplay.textContent = "You a soccer fan huh? Well Done. " + "CORRECT:" + rightAnswers + " " + "INCORRECT:" + wrongAnswers;
  }
  else {
    questionDisplay.textContent = "GO STUDY SOME WORLD CUP HISTORY! " + "CORRECT:" + rightAnswers + " " + "INCORRECT:" + wrongAnswers;
  }

  for (var i = 0; i < guess.length; i++) {
    guess[i].classList.add("hide");
  }
}

// If game is not over repeat the process of generateQuestion, display, and wait for player choice.
// Note that at the end, the question chosen is removed from the game object, in order to avoid repetition.
function gameNotOver() {
  randomQuestion = generateQuestion();
  var i = game.indexOf(game[randomQuestion]);
  questionDisplay.textContent = game[randomQuestion].question;
  correctAnswer = game[randomQuestion].correct;
  changeButtonsText();
  game.splice(i, 1);
}

// 1s wait time to transition to next question.
function transitionToNext() {
  setTimeout(function() {
    changeQuestion();
    enableButtons();
  },1000);
};
