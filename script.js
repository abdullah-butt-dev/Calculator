const displayContainer = document.querySelector('.js-display');

let currentValue = '';
let previousValue = '';
let operator = '';
let resultValue = '';
let displayText = '';


function appendValue(value) {
  currentValue += value;
  displayText += `${value}`;
  displayContainer.textContent = displayText;
}

function appendOperator(oper) {
  if(currentValue !== '' && previousValue !== '') {
    resultValue = operate(currentValue, operator, previousValue);
    previousValue = resultValue; 
    currentValue = ''
  }
  
  if(currentValue !== '') {
    previousValue = currentValue;
    currentValue = '';
  }

  operator = oper;
  displayText += ` ${value} `;
  displayContainer.textContent = displayText;
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
  if(num2 !== 0) return num1 / num2;
  else 'ERROR';
}