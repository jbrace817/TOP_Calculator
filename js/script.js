//display
const displayDiv = document.getElementsByClassName("display")[0];
displayDiv.style.font;
let display = 0;
displayDiv.textContent = display;

//buttons
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    if (display === 0) {
      displayDiv.textContent = "";
    }
    if (displayDiv.textContent.length < 9) {
      let pressed = e.target.innerText;
      display = parseFloat(pressed);
      displayDiv.textContent += display;
      console.log(typeof parseFloat(display));
    }
  })
);

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
