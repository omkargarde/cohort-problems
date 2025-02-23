const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#display")!;
let firstOperand = 0;
let secondOperand = 0;
let operation = "";
let actionSymbol = "";

buttons.forEach((button) => {
  button.addEventListener("click", (event: Event) => {
    const key = event.target as HTMLElement;
    const action = key.dataset.action;
    if (!action) {
      setOperand(Number(key.innerHTML));
    } else {
      if (action === "equals") {
        calculate();
      }
      if (action === "clear") {
        firstOperand = 0;
        secondOperand = 0;
        operation = "";
        actionSymbol = "";
      }
      setActionSymbol(action);
    }
    setDisplay();
  });
});

function setDisplay() {
  if (firstOperand) {
    display.innerHTML = `${firstOperand}`;
  }
  if (actionSymbol) {
    display.innerHTML = `${firstOperand} ${actionSymbol}`;
  }
  if (secondOperand) {
    display.innerHTML = `${firstOperand} ${actionSymbol} ${secondOperand}`;
  }
}
function setOperand(value: number) {
  if (!actionSymbol) {
    firstOperand = firstOperand * 10 + value;
  } else {
    secondOperand = secondOperand * 10 + value;
  }
}

function setActionSymbol(value: string) {
  operation = value;
  switch (value) {
    case "addition":
      actionSymbol = "+";
      break;
    case "subtract":
      actionSymbol = "-";
      break;
    case "multiply":
      actionSymbol = "*";
      break;
    case "divide":
      actionSymbol = "/";
      break;
  }
  console.log(actionSymbol);
}

function calculate() {
  switch (operation) {
    case "addition":
      firstOperand = firstOperand + secondOperand;
      break;
    case "subtract":
      firstOperand = firstOperand - secondOperand;
      break;
    case "multiply":
      firstOperand = firstOperand * secondOperand;
      break;
    case "divide":
      if (secondOperand === 0) {
        throw new Error("Cannot divide by zero");
      }
      firstOperand = firstOperand / secondOperand;
      break;
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
  operation = "";
  actionSymbol = "";
  secondOperand = 0;
}
