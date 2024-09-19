const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  //bug 8 found: validate if number is entered by raising alert when input is blank
  if (!guess){
    alert("Please enter a number.");
  }
  //validate number is between 1 and 99, raise alert if not
  else if (guess < 1 || guess > 99) {
    alert("Please enter a number between 1 and 99.");
  }
  else {
    attempts = attempts + 1;
    hideAllMessages();

  if (guess === targetNumber) {
    //this is not displaying anywhere but instructions do not indicate that it should be so not changing for now
    numberOfGuessesMessage.style.display = '';
    //changed display message to guess if only 1 attempt was made 
    if (attempts === 1) {
      numberOfGuessesMessage.innerHTML = `You made ${attempts} guess`;
    }
    else {
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    }

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }
  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      //bug 5 found: tooLowMessage displayed for both too low and too high, changed to toohighMessage
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    //changed messaging so if 1 attempt remaining, message will read '1 guess remaining'
    if (attempts === (maxNumberOfAttempts - 1)) {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    }
    else {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }
  }
  //bug 1 found: extra equal sign 
  if (attempts === maxNumberOfAttempts) {
    //bug 7: max number of guesses message not displaying
    maxGuessesMessage.style.display = '';
    //disable too high and too low message so 'try again' is not displayed 
    tooHighMessage.style.display = 'none';
    tooLowMessage.style.display = 'none';
    submitButton.disabled = true;
    guessInput.disabled = true;
  }
  //added if number was guessed on fifth try results, disabling max number guesses message and too high too low message
  if ((guess === targetNumber) && (attempts === maxNumberOfAttempts)) {
    maxGuessesMessage.style.display = 'none';

    tooHighMessage.style.display = 'none';
    tooLowMessage.style.display = 'none';

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';
  resetButton.style.display = '';
}
}

function hideAllMessages() {
  //bug 3 found: elementIndex should be < newArray.length, not <=
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

//bug 2 found: function missing a c
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; 
  //bug 4: maxNumberOfAttempts was being reset to 0, changed reset variable to attempts 
  //maxNumberOfAttempts = 5;

  // Enable the input and submit button
  //bug 6: disabled was misspelled 
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
