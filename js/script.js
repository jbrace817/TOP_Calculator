//Display
let displayDiv = document.getElementsByClassName("display")[0];

//Global Variables
let array = [];
let numToString;
let temp = 0;
let dNumber = 0;
let sign = null;
let clicked = false;
let dot = false;
let type;

//Calculator buttons
const buttons = document.querySelectorAll(".button");
const numbers = document.querySelectorAll(".numbers");
const symbols = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const posNeg = document.querySelector(".posNeg");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");

//Event Listeners

//Keyboard support
window.addEventListener("keydown", function (e) {
  // let pressed;
  if (isFinite(e.key)) {
    console.log(true);
    displayNum(e);
  }
  if (e.key === ".") {
    console.log(true);
    decimalBtn();
  }
  let regex = new RegExp('["*", "+", "\\-", "/"]');
  if (regex.test(e.key)) {
    console.log(true);
    symbolBtn(e);
  }
  if (e.key === "Enter") {
    console.log(true);
    equalBtn();
  }
});

numbers.forEach((number) => number.addEventListener("click", displayNum));

symbols.forEach((symbol) => symbol.addEventListener("click", symbolBtn));

equals.addEventListener("click", equalBtn);

posNeg.addEventListener("click", (e) => {
  if (temp !== 0) {
    displayDiv.textContent = displayDiv.textContent * -1;
    temp = parseFloat(displayDiv.textContent);
    expNotation(displayDiv.textContent.length, temp);
  }
  if (array.length === 1 && temp == 0) {
    array.splice(0, 1, array[0] * -1);
    displayDiv.textContent = displayDiv.textContent * -1;
    temp = 0;
  }
});

percent.addEventListener("click", () => {
  let stringToNum;
  if (temp !== 0) {
    displayDiv.textContent = displayDiv.textContent * 0.01;
    console.log(displayDiv.textContent.length);
    temp = parseFloat(displayDiv.textContent);
  }
  if (array.length === 1 && temp === 0) {
    displayDiv.textContent = displayDiv.textContent * 0.01;
    temp = parseFloat(displayDiv.textContent);
    array.splice(0, 1, temp);
    temp = 0;
  }
  stringToNum = parseFloat(displayDiv.textContent);
  expNotation(displayDiv.textContent.length, stringToNum);
});

decimal.addEventListener("click", decimalBtn);

clear.addEventListener("click", () => {
  array = [];
  numToString = "";
  temp = 0;
  dNumber = 0;
  displayDiv.textContent = "0";
  // displayDiv.style.fontSize = "5.80rem";
  expNotation(displayDiv.textContent.length, displayDiv.textContent);
});

//Calculator Functions

function displayNum(e) {
  let pressed;
  if (e.type == "click") {
    pressed = e.target.textContent;
  } else {
    if (isFinite(e.key)) {
      pressed = e.key;
    } else {
      return;
    }
  }
  if (
    displayDiv.textContent[0] === "0" &&
    !displayDiv.textContent.includes(".")
  ) {
    displayDiv.textContent = "";
  }
  if (array.length === 1 && temp === 0 && !dot) {
    displayDiv.textContent = "";
    clicked = false;
  }
  if (sign == "" && temp == 0) {
    array.splice(0, 1);
  }
  temp = displayDiv.textContent += pressed;
  displayDiv.textContent = temp;
  temp = parseFloat(temp);
  expNotation(displayDiv.textContent.length, temp);
  clicked = false;
}

function symbolBtn(e) {
  let pressed;
  let regex = new RegExp("[*+-/]");
  if (e.type == "click") {
    pressed = e.target.textContent;
  } else {
    if (regex) {
      pressed = e.key;
    }
  }
  applyOperators();
  sign = pressed;
  dot = false;
}

function equalBtn() {
  applyOperators();
  sign = "";
  dot = false;
}

function decimalBtn() {
  if (!displayDiv.textContent.includes(".")) {
    displayDiv.textContent = displayDiv.textContent + ".";
  }
  if (clicked) {
    displayDiv.textContent = "";
    displayDiv.textContent = displayDiv.textContent + "0.";
    console.log(displayDiv.textContent);
    dot = true;
    temp = displayDiv.textContent;
  }
}

function applyOperators() {
  if (!clicked) {
    if (array.length === 1) {
      displayDiv.textContent = "";
    }
    array.push(temp);
    temp = 0;

    if (array.length === 2) {
      operate(array[0], array[1], sign);
    }
    clicked = true;
  }
}

function expNotation(length, num) {
  const mediaQuery = window.matchMedia("(max-width: 576px)");

  if (mediaQuery.matches) {
    if (length < 9) {
      displayDiv.style.fontSize = "4rem";
    }
    if (length > 9) {
      displayDiv.style.fontSize = "3rem";
    }
    if (length > 12) {
      displayDiv.style.fontSize = "2.4rem";
    }
    if (length > 15) {
      displayDiv.textContent = num.toExponential(3);
      displayDiv.style.fontSize = "4rem";
    }
  } else {
    if (length < 9) {
      displayDiv.style.fontSize = "5.80rem";
    }
    if (length > 9) {
      displayDiv.style.fontSize = "4.30rem";
    }
    if (length > 12) {
      displayDiv.style.fontSize = "3.30rem";
    }
    if (length > 15) {
      displayDiv.textContent = num.toExponential(3);
      displayDiv.style.fontSize = "5.80rem";
    }
  }
}

//Operate Function
function operate(num1, num2, op) {
  const operator = op;

  switch (operator) {
    case "+":
      dNumber = add(num1, num2);
      displayDiv.textContent = dNumber;
      numToString = dNumber.toString();
      console.log("length: " + numToString.length);
      expNotation(numToString.length, dNumber);
      array.splice(0, 2, dNumber);
      clicked = false;
      console.log(add(num1, num2));
      return add(num1, num2);
    case "-":
      dNumber = subtract(num1, num2);
      displayDiv.textContent = dNumber;
      numToString = dNumber.toString();
      console.log("length: " + numToString.length);
      expNotation(numToString.length, dNumber);
      array.splice(0, 2, dNumber);
      console.log(subtract(num1, num2));
      clicked = false;
      return subtract(num1, num2);
    case "*":
      dNumber = multiply(num1, num2);
      console.log(typeof dNumber);
      displayDiv.textContent = dNumber;
      numToString = dNumber.toString();
      console.log("length: " + numToString.length);
      expNotation(numToString.length, dNumber);
      array.splice(0, 2, dNumber);
      console.log(multiply(num1, num2));
      clicked = false;
      sign = "";
      return multiply(num1, num2);
    case "/":
      dNumber = divide(num1, num2);
      displayDiv.textContent = dNumber;
      numToString = dNumber.toString();
      console.log("length: " + numToString.length);
      expNotation(numToString.length, dNumber);
      array.splice(0, 2, dNumber);
      console.log(divide(num1, num2));
      clicked = false;
      sign = "";
      console.log(divide(num1, num2));
      return divide(num1, num2);
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
