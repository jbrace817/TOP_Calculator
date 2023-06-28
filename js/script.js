//display
const displayDiv = document.getElementsByClassName("display")[0];
let display = 0;
displayDiv.textContent = display;
let num1;

//Number buttons
const buttons = document.querySelectorAll(".button");
const numbers = document.querySelector(".numbers");

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    let pressed = e.target.innerText;
    let toNum = parseFloat(pressed);
    display = toNum;
    if (displayDiv.innerHTML === "0") {
      displayDiv.textContent = "";
    }
    if (
      displayDiv.textContent.length < 9 &&
      button.classList.contains("numbers")
    ) {
      console.log();
      num1 = displayDiv.textContent += display;
      if (button.classList.contains("operator")) {
      }
    }
    console.log(num1);
    console.log(button.textContent);
  })
);

function operate(num1, num2, operator) {}

//Functions for basic math operators

function add(num1, num2) {
  sum = num1 + num2;
  return sum;
}
function subtract(num1, num2) {
  sum = num1 - num2;
  return sum;
}
function multiply(num1, num2) {
  sum = num1 * num2;
  return sum;
}
function divide(num1, num2) {
  sum = num1 / num2;
  return sum;
}
