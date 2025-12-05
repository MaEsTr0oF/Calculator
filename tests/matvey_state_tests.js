TestRunner.suite('RoundingOps - Rounding Functions (Матвей)', () => {
	TestRunner.test('floor: floor(4.7) = 4', () => {
		TestRunner.assertEqual(RoundingOps.floor(4.7), 4);
	});

	TestRunner.test('floor: floor(4.1) = 4', () => {
		TestRunner.assertEqual(RoundingOps.floor(4.1), 4);
	});

	TestRunner.test('floor: floor(-2.3) = -3', () => {
		TestRunner.assertEqual(RoundingOps.floor(-2.3), -3);
	});

	TestRunner.test('floor: floor(5) = 5', () => {
		TestRunner.assertEqual(RoundingOps.floor(5), 5);
	});

	TestRunner.test('ceil: ceil(4.1) = 5', () => {
		TestRunner.assertEqual(RoundingOps.ceil(4.1), 5);
	});

	TestRunner.test('ceil: ceil(4.9) = 5', () => {
		TestRunner.assertEqual(RoundingOps.ceil(4.9), 5);
	});

	TestRunner.test('ceil: ceil(-2.3) = -2', () => {
		TestRunner.assertEqual(RoundingOps.ceil(-2.3), -2);
	});

	TestRunner.test('ceil: ceil(7) = 7', () => {
		TestRunner.assertEqual(RoundingOps.ceil(7), 7);
	});
});

TestRunner.suite('CalculatorState - State Management (Матвей)', () => {
	TestRunner.test('constructor: initializes with correct defaults', () => {
		const calc = new CalculatorState();
		TestRunner.assertEqual(calc.currentOperand, '0');
		TestRunner.assertEqual(calc.previousOperand, '');
		TestRunner.assertEqual(calc.operation, undefined);
		TestRunner.assertEqual(calc.memory, 0);
		TestRunner.assertEqual(calc.shouldResetScreen, false);
	});

	TestRunner.test('appendNumber: adds digit to current operand', () => {
		const calc = new CalculatorState();
		calc.appendNumber('5');
		TestRunner.assertEqual(calc.currentOperand, '5');
	});

	TestRunner.test('appendNumber: concatenates multiple digits', () => {
		const calc = new CalculatorState();
		calc.appendNumber('1');
		calc.appendNumber('2');
		calc.appendNumber('3');
		TestRunner.assertEqual(calc.currentOperand, '123');
	});

	TestRunner.test('appendNumber: handles decimal point', () => {
		const calc = new CalculatorState();
		calc.appendNumber('5');
		calc.appendNumber('.');
		calc.appendNumber('5');
		TestRunner.assertEqual(calc.currentOperand, '5.5');
	});

	TestRunner.test('appendNumber: prevents multiple decimal points', () => {
		const calc = new CalculatorState();
		calc.appendNumber('5');
		calc.appendNumber('.');
		calc.appendNumber('5');
		calc.appendNumber('.');
		TestRunner.assertEqual(calc.currentOperand, '5.5');
	});

	TestRunner.test('appendNumber: resets screen after calculation', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '10';
		calc.shouldResetScreen = true;
		calc.appendNumber('5');
		TestRunner.assertEqual(calc.currentOperand, '5');
		TestRunner.assertEqual(calc.shouldResetScreen, false);
	});

	TestRunner.test('chooseOperation: sets operation and moves to previous', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '5';
		calc.chooseOperation(BasicOps.add);
		TestRunner.assertEqual(calc.previousOperand, '5');
		TestRunner.assertEqual(calc.currentOperand, '');
		TestRunner.assertEqual(calc.operation, BasicOps.add);
	});

	TestRunner.test('chooseOperation: computes if previous operation exists', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '5';
		calc.chooseOperation(BasicOps.add);
		calc.currentOperand = '3';
		calc.chooseOperation(BasicOps.multiply);
		TestRunner.assertEqual(calc.previousOperand, '8');
		TestRunner.assertEqual(calc.operation, BasicOps.multiply);
	});

	TestRunner.test('compute: performs addition', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '5';
		calc.chooseOperation(BasicOps.add);
		calc.currentOperand = '3';
		calc.compute();
		TestRunner.assertEqual(calc.currentOperand, '8');
		TestRunner.assertEqual(calc.shouldResetScreen, true);
	});

	TestRunner.test('compute: performs multiplication', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '6';
		calc.chooseOperation(BasicOps.multiply);
		calc.currentOperand = '7';
		calc.compute();
		TestRunner.assertEqual(calc.currentOperand, '42');
	});

	TestRunner.test('compute: handles division', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '15';
		calc.chooseOperation(BasicOps.divide);
		calc.currentOperand = '3';
		calc.compute();
		TestRunner.assertEqual(calc.currentOperand, '5');
	});

	TestRunner.test('compute: handles invalid input (NaN)', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '';
		calc.previousOperand = '';
		calc.operation = BasicOps.add;
		calc.compute();
		TestRunner.assertEqual(calc.currentOperand, '');
	});

	TestRunner.test('computeSingle: calculates sqrt', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '16';
		calc.computeSingle(ScientificOps.sqrt);
		TestRunner.assertEqual(calc.currentOperand, '4');
		TestRunner.assertEqual(calc.shouldResetScreen, true);
	});

	TestRunner.test('computeSingle: calculates reciprocal', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '4';
		calc.computeSingle(ScientificOps.reciprocal);
		TestRunner.assertEqual(calc.currentOperand, '0.25');
	});

	TestRunner.test('computeSingle: handles floor', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '4.7';
		calc.computeSingle(RoundingOps.floor);
		TestRunner.assertEqual(calc.currentOperand, '4');
	});

	TestRunner.test('clear: resets all values', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '123';
		calc.previousOperand = '456';
		calc.operation = BasicOps.add;
		calc.clear();
		TestRunner.assertEqual(calc.currentOperand, '0');
		TestRunner.assertEqual(calc.previousOperand, '');
		TestRunner.assertEqual(calc.operation, undefined);
	});

	TestRunner.test('clearEntry: clears only current operand', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '123';
		calc.previousOperand = '456';
		calc.clearEntry();
		TestRunner.assertEqual(calc.currentOperand, '0');
		TestRunner.assertEqual(calc.previousOperand, '456');
	});

	TestRunner.test('backspace: removes last digit', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '123';
		calc.backspace();
		TestRunner.assertEqual(calc.currentOperand, '12');
	});

	TestRunner.test('backspace: sets to 0 when empty', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '1';
		calc.backspace();
		TestRunner.assertEqual(calc.currentOperand, '0');
	});

	TestRunner.test('backspace: does nothing when shouldResetScreen is true', () => {
		const calc = new CalculatorState();
		calc.currentOperand = '123';
		calc.shouldResetScreen = true;
		calc.backspace();
		TestRunner.assertEqual(calc.currentOperand, '123');
	});
});
