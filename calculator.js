const currentDisplay = document.querySelector('#current-display');
const previousDisplay = document.querySelector('#previous-display');
let currentValue = '0';
let previousValue = '';
let operation = null;
let replaceDisplay = false;

function updateDisplay() {
    currentDisplay.textContent = currentValue;

    previousDisplay.textContent = operation && previousValue ? `${previousValue} ${symbolFor(operation)}` : '';
		
}


function symbolFor(selectedOperation) {
    return {
        add: '+',
        subtract: '-',
        multiply: '*',
        divide: '/'
    }[selectedOperation];
}

function inputNumber(number) {
     if (replaceDisplay) {
    currentValue = number === '.' ? '0.' : number;
    replaceDisplay = false;
} else if (number === '.' && currentValue.includes('.')) {
    return;
} else if (currentValue === '0' && number !== '.') {
    currentValue = number;
} else {
    currentValue += number;
}
    updateDisplay();
}

function chooseOperation(selectedOperation) {

	  if (operation && !replaceDisplay) {
        calculate();
    }
		previousValue = currentValue;
    operation = selectedOperation;
    replaceDisplay = true;

		updateDisplay();

}

function calculate() {
    if (!operation || previousValue === '') {
        return;
    }
		const first = Number(previousValue);
		const second = Number(currentValue);
		let result = 0;
		switch (operation) {
			case 'add':
				result = first + second;
				break;
			case 'subtract':
				result = first - second;
				break;
			case 'multiply':
				result = first * second;
				break;
			case 'divide':
				result = second === 0 ? NaN : first / second;
				break;
		}
		
		currentValue = Number.isFinite(result) ? String(Number(result.toFixed(10))) : 'Error';
		previousValue = '';
		operation = null;
		replaceDisplay = true;

updateDisplay();
		
updateDisplay();
	}
function clearcalculator() {
	currentValue = '0';
	previousValue = '';
	operation = null;
	replaceDisplay = false;
	updateDisplay();
}
document.querySelectorAll('.keys button').forEach((button) => {
    button.addEventListener('click', () => {
        if (button.dataset.number !== undefined) {
            inputNumber(button.dataset.number);
        }

        if (button.dataset.operation) {
            chooseOperation(button.dataset.operation);
        }

        if (button.dataset.action === 'equals') {
            calculate();
        }

        if (button.dataset.action === 'clear') {
            clearcalculator();
        }
    });
});