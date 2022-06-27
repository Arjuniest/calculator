let displayValue = 0;
const buttons = document.querySelectorAll('button')
let firstOperator = null;
let secondOperator = null;
let firstOperand = null;
let secondOperand = null;
let result = null;

// considering the operands as numbers and operators as the arithmetic functions

function changeDisplay(){
    const display = document.getElementById('display');
    display.innerText = displayValue;
}

changeDisplay();

function clickButton(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', function(){
            if(buttons[i].classList.contains('operand')){
                inputOperand(buttons[i].value);
                changeDisplay();
            } else if(buttons[i].classList.contains('operator')){
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')){
                inputEquals(buttons[i].value);
                changeDisplay();
            } else if(buttons[i].classList.contains('decimal')){
                inputDecimal(buttons[i].value);
                changeDisplay();
            } else if(buttons[i].classList.contains('sign')){
                inputSign(displayValue);
                changeDisplay();
            } else if(buttons[i].classList.contains('clear')){
                clearDisplay();
                changeDisplay();
            }

        })
    }
}

clickButton();

function inputOperand(operand){
    if(firstOperator === null){
        if(displayValue === '0' || displayValue === 0){
            //this is the first click
            displayValue = operand;
        } else if (displayValue === firstOperand){
            displayValue = operand;
        } else {
            displayValue += operand; 
        }
    } else {
        if(displayValue === firstOperand){
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator){
    if(firstOperator != null && secondOperator == null){
        //
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = result;
        firstOperand = displayValue; //first operand is changed 
        result = null;
    } else if (firstOperator != null && secondOperator != null){
        //6th click == new second operator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = result;
        firstOperand = displayValue;
        result = null;
    } else {
        //2nd click - handles first operator input and display it
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals(){
    //clicking equal for the first time before operate() :
    if(firstOperator === null){
        displayValue = displayValue;
    } else if(secondOperator != null){
        //handle the final result 
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === "Ouch"){
            displayValue = "Ouch";
        } else {
            displayValue = result.toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handle first operation :
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === "Ouch"){
            displayValue = "Ouch";
        } else {
            displayValue = result.toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputSign(num){
    displayValue = (num * -1).toString();
}

function clearDisplay (){
    displayValue = '0';
    firstOperand = null;
    firstOperator = null;
    secondOperand = null;
    secondOperator = null;
    result = null;
}

function inputDecimal(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand){
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)){
        displayValue += dot;
    }
}


function operate(a, b, op){ //taking two numbers and operator.
    if(op === '+'){
        return (a + b);
    }
    else if(op === '-'){
        return (a - b);
    }
    else if(op === '*'){
        return (a * b);
    }
    else if(op === '/'){
        if(b === 0){
            return 'Ouch';
        }
        return (a / b);
    }
}