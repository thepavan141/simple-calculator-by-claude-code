let currentInput = "";
let currentOp = null;
let previousInput = "";

function appendNum(num) {
    // Prevent multiple decimals
    if (num === '.' && currentInput.includes('.')) return;

    currentInput += num;
    updateDisplay();
}

function setOp(op) {
    if (currentInput === "" && previousInput === "") return;

    // If user types an operator while a number is already there,
    // we move the current number to "previous"
    if (currentInput !== "") {
        previousInput = currentInput;
        currentInput = "";
    }

    currentOp = op;
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    currentOp = null;
    updateDisplay();
}

function deleteNumber() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    if (currentInput === "") {
        display.innerText = previousInput + (currentOp ? ` ${currentOp} ` : "");
    } else {
        display.innerText = previousInput + (currentOp ? ` ${currentOp} ` : "") + currentInput;
    }
}

function calculate() {
    if (currentInput === "" || currentOp === null) return;

    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (currentOp) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        default:
            return;
    }

    // Format result to avoid long decimals
    if (typeof result === 'number') {
        result = Math.round(result * 1000000) / 1000000;
    }

    document.getElementById('display').innerText = result;

    // Reset for next calculation
    currentInput = result.toString();
    previousInput = "";
    currentOp = null;
}
