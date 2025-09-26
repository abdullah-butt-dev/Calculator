let num1, num2, operator;


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

  console.log(result);

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