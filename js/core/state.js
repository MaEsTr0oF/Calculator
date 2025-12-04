export class CalculatorState {
	constructor() {
		this.currentOperand = '0';
		this.previousOperand = '';
		this.operation = undefined;
		this.memory = 0;
		this.shouldResetScreen = false;
	}

	appendNumber(number) {
		if (this.shouldResetScreen) {
			this.currentOperand = '';
			this.shouldResetScreen = false;
		}
		if (number === '.' && this.currentOperand.includes('.')) return;
		if (this.currentOperand === '0' && number !== '.') {
			this.currentOperand = number.toString();
		} else {
			this.currentOperand = this.currentOperand.toString() + number.toString();
		}
	}

	chooseOperation(operationFunction) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operationFunction;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(current)) return;

		if (this.operation) {
			computation = this.operation(prev, current);
		} else {
			return;
		}

		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
		this.shouldResetScreen = true;
	}

	computeSingle(computationFunction) {
		const current = parseFloat(this.currentOperand);
		if (isNaN(current)) return;

		this.currentOperand = computationFunction(current);
		this.shouldResetScreen = true;
	}

	clear() {
		this.currentOperand = '0';
		this.previousOperand = '';
		this.operation = undefined;
	}

	delete() {
		if (this.shouldResetScreen) return;
		if (this.currentOperand === '0') return;

		this.currentOperand = this.currentOperand.toString().slice(0, -1);
		if (this.currentOperand === '') {
			this.currentOperand = '0';
		}
	}
}
