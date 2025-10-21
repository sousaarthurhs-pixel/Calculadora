const display = document.querySelector(".display");
const btns = document.querySelectorAll(".btn");

let currentValue = '';
let firstValue = null;
let operator = null;
let restart = false;

const update = (originClear = false) => {
    display.innerText = originClear ? 0 : currentValue.replace(".", ",");
}

const addDigit = (digit) => {
    if (addDigit === "," && (currentValue.includes(",") || !currentValue))
        return;

    if (restart) {
        currentValue = digit;
        restart = false;
    } else {
        currentValue += digit;
    }

    update();
}

const calculate = () => {
    if (operator === null || firstValue === null) display;
    let secondValue = parseFloat(currentValue.replace(",", "."));
    let lastValue;

    switch (operator) {
        case "+":
            lastValue = firstValue + secondValue;
            break;

        case "-":
            lastValue = firstValue - secondValue;
            break;

        case "×"||"*":
            lastValue = firstValue * secondValue;
            break;
        case "÷"||"/":
            lastValue = firstValue / secondValue;
            break;
        default:
            return;

    }

    if (lastValue.toString().split(".")[1]?.length > 5) {
        currentValue = parseFloat(lastValue.toFixed(5)).toString();
    } else {
        currentValue = lastValue.toString();
    }
    operator = null;
    firstValue = null;
    restart = true;
    update();
}

const setPercentage = () => {
    let display = parseFloat(currentValue) / 100;

    if (["+", "-"].includes(operator)) {
        display = display * (firstValue || 1);
    }

    if (display.toString().split(".")[1]?.length > 5) {
        display = display.toFixed(5).toString();
    }

    currentValue = display.toString();
    update();
}

const clearDisplay = () => {
    firstValue = null;
    currentValue = '';
    operator = null;
    update(true);
}

const setOperator = (newOpe) => {
    if (currentValue) {
        calculate();
        firstValue = parseFloat(currentValue);
        currentValue = "";
    }
    operator = newOpe;
}

document.onkeyup = function (e) {
    console.log(e.key);
    
    const textValue = e.key;
        if (/^[0-9]+$/.test(textValue)) {
            addDigit(textValue);
        } else if (["*", "-", "/", "+"].includes(textValue)) {
            setOperator(textValue);
        } else if (textValue == "Enter") {
            calculate()
        } else if (textValue == "Delete") {
            clearDisplay();
        } else if (textValue == "%") {
            setPercentage();
        } else if (textValue == "," || textValue == ".") {
            addDigit(textValue);
        }
    
}

btns.forEach((value) => {
    value.addEventListener("click", () => {
        const textValue = value.innerText;
        if (/^[0-9]+$/.test(textValue)) {
            addDigit(textValue);
        } else if (["+", "-", "÷", "×"].includes(textValue)) {
            setOperator(textValue);
        } else if (textValue == "=") {
            calculate()
        } else if (textValue == "C") {
            clearDisplay();
        } else if (textValue == "%") {
            setPercentage();
        } else if (textValue == ",") {
            addDigit(textValue);
        }
    })
});