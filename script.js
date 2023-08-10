const resultElement = document.getElementById('result');
const deleteBtn = document.getElementById('delete-button');
const clearBtn = document.getElementById('allclear-button');
const divideBtn = document.getElementById('divide-button');
const percentBtn = document.getElementById('percent-button');
const rootBtn = document.getElementById('root-button');
const multiplyBtn = document.getElementById('multiply-button');
const addBtn = document.getElementById('add-button');
const minusBtn = document.getElementById('minus-button');
const decimalBtn = document.getElementById('decimal-button');
const plusminuBtn = document.getElementById('plus-minus-button');
const equalBtn = document.getElementById('equal-button');
const numberBtns = document.querySelectorAll('.number');

//initialize the variables
let result = '';
let operation = '';
let previousOperand = 0;

// function to append number
const appendNumber = (number) => {
    if (number === '.' && result.includes('.')) return;
       result += number;
       updateDisplay();
}
//function to update display
const updateDisplay = () => {
    if(operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else{
        resultElement.innerText = result;
    }
    }
// function to select operator
const selectOperator = (operatorValue) =>{
    if (result === '') return;

    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}
// function to claculate result
const calculateResult = () => {
    let evalutedResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);

    if(isNaN(prev)|| isNaN(current)) return;

    switch (operation) {
        case '+':
            evalutedResult = prev + current;
            break;
        case '-':
            evalutedResult = prev - current;
            break;
        case '*':
            evalutedResult = prev * current;
            break;
        case '/':
            evalutedResult = prev / current;
            break;
        case '%':
            evalutedResult = (current||prev)/100;
            break;
        case '√':
            evalutedResult = Math.sqrt(current||prev);
            break;    
        default:
            return;
    }

    result = evalutedResult.toString();
    operation = '';
    previousOperand = '';
}
// Add event listener to number buttons

numberBtns.forEach(button=>{
    button.addEventListener('click',()=>{
        appendNumber(button.innerText);
    });
    });

// function to clear display
const cleardisplay = () => {
    result = '';
    previousOperand = '';
    operation = '';
    updateDisplay();
}
// function for delete last digit
const deletelastDigit = () => {
    if(result === '') return;
    result = result.slice(0, -1);
    updateDisplay();
}

decimalBtn.addEventListener('click',() => appendNumber('.'));    
addBtn.addEventListener('click',() => selectOperator('+'));    
minusBtn.addEventListener('click',() => selectOperator('-'));    
divideBtn.addEventListener('click',() => selectOperator('/'));
multiplyBtn.addEventListener('click',() => selectOperator('*'));
percentBtn.addEventListener('click',() => selectOperator('%'));
rootBtn.addEventListener('click',() => selectOperator('√'));
equalBtn.addEventListener('click',() => {
    if(result=='') return;
    calculateResult();
    updateDisplay();
});
clearBtn.addEventListener('click', cleardisplay);
deleteBtn.addEventListener('click', deletelastDigit);
