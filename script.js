const displayContainer = document.querySelector('.js-display');


let currentValue = '';
let previousValue = '';
let operator = '';
let resultValue = '';
let displayText = '';
let justCalculated = false;


function appendValue(value) {
  if(justCalculated) {
    currentValue = '';
    displayText = '';
    justCalculated = false;
  }
  currentValue += value;
  displayText += `${value}`;
  displayContainer.textContent = displayText;
}

function appendOperator(oper) {
  // If we just finished a calculation, keep the result in previousValue
  if (justCalculated) {
    justCalculated = false;
    currentValue = ''; // result is already in previousValue
  }

  // Case: no number yet, just change the operator
  if (currentValue === '' && previousValue !== '') {
    displayText = previousValue + ` ${oper} `;
    operator = oper;
    displayContainer.textContent = displayText;
    return;
  }

  // Case: user has typed both sides -> compute first
  if (currentValue !== '' && previousValue !== '') {
    resultValue = operate(Number(previousValue), operator, Number(currentValue)).toFixed(1);
    previousValue = resultValue;
    currentValue = '';
    displayText = resultValue;
  }

  // Case: first operator after entering a number
  if (currentValue !== '') {
    previousValue = currentValue;
    currentValue = '';
  }

  operator = oper;
  displayText = previousValue + ` ${oper} `;
  displayContainer.textContent = displayText;

  // Always reset dot button after an operator
  document.querySelector('.dot').disabled = false;
}




function operate(num1, operator, num2) {

  let result;

  switch(operator) {
    case '+': 
      result = add(num1, num2);
      break;    
    
    case '-':
      result = sub(num1, num2);
      break; 

    case '*': 
      result = mul(num1, num2);
      break;    
    
    case '/':
      result = div(num1, num2);
      break; 
  }

  return result;

}

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

function div(num1, num2) {
  if(num2 !== 0) return Number((num1 / num2).toFixed(6));
  else return 0;
}

function calculate() {
  if(currentValue !== '' && previousValue !== '') {
    resultValue = operate(Number(previousValue), operator, Number(currentValue));
    previousValue = resultValue; 
    currentValue = '';
    displayText = resultValue;
    displayContainer.textContent = displayText;
    justCalculated = true;
    document.querySelector('.dot').disabled = false; 
  }
}

function undoLast() {
  displayText = displayText.slice(0, -1);

  if(currentValue) {
    currentValue = currentValue.slice(0, -1);
  }

  if(!currentValue && /[+\-*/]$/.test(displayText.trim())) {
    operator = '';    
  }

  displayContainer.textContent = displayText || '0';
}

function clear() {
  previousValue = ''
  operator = '';
  currentValue = '';
  resultValue = '';
  displayText = '';
  document.querySelector('.dot').disabled = false;
  displayContainer.textContent = '0';
}

document.querySelector('.zero').addEventListener('click', () => appendValue(0));
document.querySelector('.one').addEventListener('click', () => appendValue(1));
document.querySelector('.two').addEventListener('click', () => appendValue(2));
document.querySelector('.three').addEventListener('click', () => appendValue(3));
document.querySelector('.four').addEventListener('click', () => appendValue(4));
document.querySelector('.five').addEventListener('click', () => appendValue(5));
document.querySelector('.six').addEventListener('click', () => appendValue(6));
document.querySelector('.seven').addEventListener('click', () => appendValue(7));
document.querySelector('.eight').addEventListener('click', () => appendValue(8));
document.querySelector('.nine').addEventListener('click', () => appendValue(9));

document.querySelector('.plus').addEventListener('click', () => appendOperator('+'));
document.querySelector('.minus').addEventListener('click', () => appendOperator('-'));
document.querySelector('.multiply').addEventListener('click', () => appendOperator('*'));
document.querySelector('.divide').addEventListener('click', () => appendOperator('/'));


document.querySelector('.equal').addEventListener('click', () => calculate());
document.querySelector('.clear').addEventListener('click', () => clear());
document.querySelector('.backspace').addEventListener('click', () => undoLast());
document.querySelector('.dot').addEventListener('click', () => {
  
  const dotButton = document.querySelector('.dot');
  
  if(!currentValue.includes('.')) appendValue('.');

  dotButton.disabled = currentValue.includes('.');

})

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) && key !== ' ') {
    appendValue(key);
  }

  if(key === '.') {
    if(!currentValue.includes('.')) appendValue('.');

    document.querySelector('.dot').disabled = currentValue.includes('.'); 
  }

  if(key === 'Backspace') {
    undoLast();
  }

  if(key === 'Escape') {
    clear();
  }

  if(key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
  }

   if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  }
    
})