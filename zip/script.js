let lists = document.getElementsByClassName("list");
let codeGaps = document.querySelectorAll(".code-gap");
const expectedContent = window.pageExpectedContent;


for (let list of lists) {
  list.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text/plain", list.textContent.trim());
  });
}

codeGaps.forEach(function (gap) {
  gap.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  gap.addEventListener("drop", function (e) {
    let selected = e.dataTransfer.getData("text/plain");
    gap.textContent = selected;
  });
});

// Getting excercise indexes

const exercisePages = ["ask1.html", "ask2.html", "ask3.html", "ask4.html"];

// Get the current exercise index from storage or initialize to 0
let currentExerciseNumber = window.currentExerciseNumber;

document.getElementById("checkButton").addEventListener("click", function () {
  let filledContent = Array.from(codeGaps).map(gap => gap.textContent.trim());

  let isCorrect = true;
  for (let i = 0; i < filledContent.length; i++) {
    if (filledContent[i] !== expectedContent[i]) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect) {
    alert("Correct order and content!");

    // Increment the current exercise number
    currentExerciseNumber++;

    // Update the global variable with the new exercise number
    window.currentExerciseNumber = currentExerciseNumber;

    // Check if there's a next exercise
    if (currentExerciseNumber <= exercisePages.length) {
      const nextExercisePage = exercisePages[currentExerciseNumber - 1]; // Subtract 1 to get the correct index
      window.location.href = nextExercisePage;
    } else {
      alert("Congratulations! You've completed all exercises.");
      // Optionally, redirect to a completion page or take other actions
    }
  } else {
    alert("Wrong order or content. Please re-evaluate.");
  }
});


const showInfoButton = document.getElementById('show-info-button');
const hints = document.querySelectorAll('#info-content p');

let hintIndex = 0;

showInfoButton.addEventListener('click', function () {
  if (hintIndex < hints.length) {
    hints[hintIndex].style.display = 'block';
    hintIndex++;
    if (hintIndex === hints.length) {
        showInfoButton.disabled = true; // Disable the button when all hints are displayed
      }
    }
  });

