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
    resultValue = operate(Number(previousValue), operator, Number(currentValue));
    previousValue = resultValue; 
    currentValue = '';
    displayText = resultValue;
  }
  
  if(currentValue !== '') {
    previousValue = currentValue;
    currentValue = '';
  }

  operator = oper;
  displayText += ` ${oper} `;
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