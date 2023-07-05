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

//Calculator buttons
const buttons = document.querySelectorAll(".button");
const numbers = document.querySelectorAll(".numbers");
const symbols = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const posNeg = document.querySelector(".posNeg");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    let pressed = e.target.textContent;
    if (
      displayDiv.textContent[0] === "0" &&
      !displayDiv.textContent.includes(".")
    ) {
      displayDiv.textContent = "";
    }
    if (array.length === 1 && temp === 0) {
      displayDiv.textContent = "";
      clicked = false;
    }
    if (sign == "" && temp == 0) {
      array.splice(0, 1);
    }
    temp = displayDiv.textContent += pressed;
    temp = temp.substring(0, 9);
    // temp = round(temp, 15);
    displayDiv.textContent = temp;
    temp = parseFloat(temp);
    clicked = false;
  })
);

symbols.forEach((symbol) =>
  symbol.addEventListener("click", (e) => {
    let pressed = e.target.textContent;
    applyOperators();
    sign = pressed;
  })
);

equals.addEventListener("click", () => {
  applyOperators();
  sign = "";
});

posNeg.addEventListener("click", (e) => {
  if (temp !== 0) {
    displayDiv.textContent = displayDiv.textContent * -1;
    // temp = round(displayDiv.textContent, 15);
    temp = parseFloat(displayDiv.textContent);
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

    // temp = round(displayDiv.textContent, 15);
    temp = parseFloat(displayDiv.textContent);
  }
  if (array.length === 1 && temp === 0) {
    displayDiv.textContent = displayDiv.textContent * 0.01;
    temp = parseFloat(displayDiv.textContent);
    array.splice(0, 1, temp);
    temp = 0;
  }
  stringToNum = parseFloat(displayDiv.textContent);
  // if (displayDiv.textContent.length > 9) {
  //   displayDiv.textContent = stringToNum.toExponential(3);
  // }
  expNotation(displayDiv.textContent.length, stringToNum);
});

decimal.addEventListener("click", () => {
  if (!displayDiv.textContent.includes(".")) {
    displayDiv.textContent = displayDiv.textContent + ".";
  }
  if (clicked) {
    displayDiv.textContent = "";
    displayDiv.textContent = displayDiv.textContent + "0.";
    temp = displayDiv.textContent;
  }
  // if (temp !== 0) {
  //   displayDiv.textContent = displayDiv.textContent + ".";
  // } else if (displayDiv.textContent[0] === "0") {
  //   displayDiv.textContent = displayDiv.textContent + ".";
  // }
});

clear.addEventListener("click", () => {
  array = [];
  numToString = "";
  temp = 0;
  dNumber = 0;
  displayDiv.textContent = "0";
});

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
  if (length > 9) {
    displayDiv.textContent = num.toExponential(3);
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
      // if (numToString.length > 9) {
      //   displayDiv.textContent = dNumber.toExponential(3);
      // }
      // dNumber = round(dNumber, 15);
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
