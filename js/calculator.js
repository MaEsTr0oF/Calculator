const BasicOps = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => a / b,
	modulo: (a, b) => a % b
};

const ScientificOps = {
	sin: (a) => Math.sin(a),
	cos: (a) => Math.cos(a),
	pow: (a, b) => Math.pow(a, b),
	sqrt: (a) => Math.sqrt(a),
	reciprocal: (a) => 1 / a
};

const RoundingOps = {
	floor: (a) => Math.floor(a),
	ceil: (a) => Math.ceil(a)
};

const MemoryOps = {
	memoryAdd: (currentMemory, value) => currentMemory + value,
	memorySubtract: (currentMemory, value) => currentMemory - value,
	memoryClear: () => 0,
	memoryRecall: (memory) => memory,
	memoryStore: (value) => value
};

class CalculatorState {
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

		this.currentOperand = computation.toString();
		this.operation = undefined;
		this.previousOperand = '';
		this.shouldResetScreen = true;
	}

	computeSingle(computationFunction) {
		const current = parseFloat(this.currentOperand);
		if (isNaN(current)) return;

		this.currentOperand = computationFunction(current).toString();
		this.shouldResetScreen = true;
	}

	clear() {
		this.currentOperand = '0';
		this.previousOperand = '';
		this.operation = undefined;
	}

	clearEntry() {
		this.currentOperand = '0';
	}

	backspace() {
		if (this.shouldResetScreen) return;
		if (this.currentOperand === '0') return;

		this.currentOperand = this.currentOperand.toString().slice(0, -1);
		if (this.currentOperand === '') {
			this.currentOperand = '0';
		}
	}
}

const calculator = new CalculatorState();

const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

const operationMap = {
	'add': BasicOps.add,
	'subtract': BasicOps.subtract,
	'multiply': BasicOps.multiply,
	'divide': BasicOps.divide,
	'modulo': BasicOps.modulo,
	'pow': ScientificOps.pow
};

const singleOperationMap = {
	'sin': ScientificOps.sin,
	'cos': ScientificOps.cos,
	'sqrt': ScientificOps.sqrt,
	'floor': RoundingOps.floor,
	'ceil': RoundingOps.ceil,
	'reciprocal': ScientificOps.reciprocal
};

function updateDisplay() {
	currentOperandTextElement.innerText = calculator.currentOperand;
	if (calculator.operation != null) {
		previousOperandTextElement.innerText = `${calculator.previousOperand}`;
	} else {
		previousOperandTextElement.innerText = '';
	}
}

function init() {
	document.querySelectorAll('.btn').forEach(button => {
		button.addEventListener('click', () => {
			const action = button.dataset.action;
			const value = button.innerText;

			if (button.classList.contains('number')) {
				calculator.appendNumber(value);
				updateDisplay();
				return;
			}

			if (action === 'clear') {
				calculator.clear();
				updateDisplay();
				return;
			}

			if (action === 'clear-entry') {
				calculator.clearEntry();
				updateDisplay();
				return;
			}

			if (action === 'backspace') {
				calculator.backspace();
				updateDisplay();
				return;
			}

			if (action === 'calculate') {
				calculator.compute();
				updateDisplay();
				return;
			}

			if (operationMap[action]) {
				calculator.chooseOperation(operationMap[action]);
				updateDisplay();
				return;
			}

			if (singleOperationMap[action]) {
				calculator.computeSingle(singleOperationMap[action]);
				updateDisplay();
				return;
			}

			if (action === 'memory-add') {
				calculator.memory = MemoryOps.memoryAdd(calculator.memory, parseFloat(calculator.currentOperand));
			}
			if (action === 'memory-subtract') {
				calculator.memory = MemoryOps.memorySubtract(calculator.memory, parseFloat(calculator.currentOperand));
			}
			if (action === 'memory-clear') {
				calculator.memory = MemoryOps.memoryClear();
			}
			if (action === 'memory-recall') {
				calculator.currentOperand = MemoryOps.memoryRecall(calculator.memory).toString();
				calculator.shouldResetScreen = true;
				updateDisplay();
			}
			if (action === 'memory-store') {
				calculator.memory = MemoryOps.memoryStore(parseFloat(calculator.currentOperand));
			}
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	init();
});
