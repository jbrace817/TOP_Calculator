//display
let displayDiv = document.getElementsByClassName("display")[0];
let array = [];
// let num1;
// let num2;
let dNumber = 0;
let sign = null;

//Number buttons
const buttons = document.querySelectorAll(".button");
const numbers = document.querySelectorAll(".numbers");
const symbols = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    let pressed = e.target.textContent;
    if (displayDiv.textContent.length < 9) {
      if (displayDiv.textContent[0] === "0") {
        displayDiv.textContent = "";
      }
      if (array.length === 1 && dNumber === "") {
        displayDiv.textContent = "";
      }
      dNumber = displayDiv.textContent += pressed;
      dNumber = parseFloat(dNumber);
    }
  })
);

symbols.forEach((symbol) =>
  symbol.addEventListener("click", (e) => {
    let pressed = e.target.textContent;

    if (displayDiv.textContent[0] === "0") {
      return;
    }
    if (array.length <= 1) {
      sign = pressed;
      array.push(dNumber);
      dNumber = "";
    }

    if (array.length === 2) {
      dNumber = operate(array[0], array[1], sign);
      array = [];
      dNumber = parseFloat(dNumber);
      array.push(dNumber);
      displayDiv.textContent = dNumber;
      dNumber = "";
    }
  })
);

equals.addEventListener("click", () => {
  array.push(dNumber);
  dNumber = operate(array[0], array[1], sign);
  console.log(dNumber);
  array = [];
  dNumber = parseFloat(dNumber);
  array.push(dNumber);
  displayDiv.textContent = dNumber;
  dNumber = "";
});

function operate(num1, num2, op) {
  const operator = op;
  switch (operator) {
    case "+":
      console.log(add(num1, num2));
      return add(num1, num2);
    case "-":
      console.log(subtract(num1, num2));
      return subtract(num1, num2);
  }
}

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
