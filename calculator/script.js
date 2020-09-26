const arrowRight = document.querySelector('.right'),
  arrowLeft = document.querySelector('.left'),
  moreComputions = document.querySelector('.more-computions'),
  numberButtons = document.querySelectorAll('[data-number]'),
  operationButtons = document.querySelectorAll('[data-operation]'),
  equalsButton = document.querySelector('[data-equals]'),
  deleteButton = document.querySelector('[data-delete]'),
  allClearButton = document.querySelector('[data-all-clear]'),
  previousOperandTextElement = document.querySelector('[data-previous-operand]'),
  currentOperandTextElement = document.querySelector('[data-current-operand]');
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  }
  computation;
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.readyToReset = false;
  }

  delete() {
    
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
  
  }
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (number === '+/-') this.currentOperand = this.currentOperand * (-1);
    else this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }

      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
  

  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break
      case '-':
        computation = prev - current;
        break
      case '*':
        computation = prev * current;
        break
      case '÷':
        computation = prev / current;
        break
        case 'x^y':
          computation = +(Math.pow(prev, current)).toFixed(5);
          break
      case '√':
        if(prev < 0) alert('Error: irrational number');
        computation = +(Math.pow(prev, (1 / current))).toFixed(5);
        break
      default:
        return;
    }
    if (!Number.isInteger(current) && (!Number.isInteger(prev))) {
      computation = +computation.toFixed(10)
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
    if (this.operation === '√') {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
  button.addEventListener("click", () => {

    if (calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
      calculator.readyToReset) {
      calculator.currentOperand = "";
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})

arrowRight.addEventListener('click', function () {
  arrowRight.classList.add('hide');
  arrowLeft.classList.remove('hide')
  moreComputions.classList.toggle('open')

});
arrowLeft.addEventListener('click', function () {
  arrowRight.classList.remove('hide');
  arrowLeft.classList.add('hide')
  moreComputions.classList.toggle('open')

})