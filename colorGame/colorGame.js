// Define variables. For future improvement I plan to make a game object and make every key inside
// the object be one of the variables below.


var numberOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var pickedColorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");

var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

pickedColorDisplay.textContent = pickedColor;

// Runs game.
init();

function init() {
  // Mode Buttons event listeners.
  setUpModeButtons();
  setUpSquares();
  reset();
};


function setUpModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
      modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      // Resets mode.
      if (this.textContent === "Easy") {
        numberOfSquares = 3;
      }
      else {
        numberOfSquares = 6;
      }
      reset();
    });
  }
};

function setUpSquares() {
  for (var i = 0; i < squares.length; i++) {

      squares[i].addEventListener("click", function() {
      var clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColorsToCorrect(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play again?"
      }
      else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again";
      }
    })
  }
};

// Function to reset the game.
function reset() {
  // Reset button to original textContent.
  resetButton.textContent = "New Colors";
  // Reset tryagain/correct message to empty string.
  messageDisplay.textContent = "";
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor();
  // Change span inside h1 to pickedColor.
  colorDisplay.textContent = pickedColor;
  for (var i = 0; i < squares.length; i++) {
    // Show every square.
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    }
    // Hide if there is no color in the colors array to match.
    else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
};

//  What mode are we playing. Easy or Hard?  Hardcoded their index.

resetButton.addEventListener("click", function () {
  reset();
});



//  From here below is code to reset squares colors and pick random color.
function changeColorsToCorrect(color) {
  // Change each square to its corresponding color.
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
};

function pickColor() {
  // Pick color out of the bunch.
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

function generateRandomColors(numberOfColors) {
  var arr = [];
  // Adding color to array.
  for (var i = 0; i < numberOfColors; i++) {
    arr.push(randomColor());
  }
  return arr;
};

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

// After each coma there must be a space.
  return "rgb("+r+", "+g+", "+b+")";
};
