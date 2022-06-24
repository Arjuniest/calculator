

function Operate(a, b, op){ //taking two numbers and operator.
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