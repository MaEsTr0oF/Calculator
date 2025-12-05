TestRunner.suite('BasicOps - Basic Arithmetic Operations (Сергей)', () => {
	TestRunner.test('add: 2 + 3 = 5', () => {
		TestRunner.assertEqual(BasicOps.add(2, 3), 5);
	});

	TestRunner.test('add: negative numbers -5 + 3 = -2', () => {
		TestRunner.assertEqual(BasicOps.add(-5, 3), -2);
	});

	TestRunner.test('add: decimals 0.1 + 0.2 ≈ 0.3', () => {
		TestRunner.assertAlmostEqual(BasicOps.add(0.1, 0.2), 0.3, 5);
	});

	TestRunner.test('subtract: 10 - 4 = 6', () => {
		TestRunner.assertEqual(BasicOps.subtract(10, 4), 6);
	});

	TestRunner.test('subtract: negative result 3 - 8 = -5', () => {
		TestRunner.assertEqual(BasicOps.subtract(3, 8), -5);
	});

	TestRunner.test('multiply: 6 × 7 = 42', () => {
		TestRunner.assertEqual(BasicOps.multiply(6, 7), 42);
	});

	TestRunner.test('multiply: by zero 5 × 0 = 0', () => {
		TestRunner.assertEqual(BasicOps.multiply(5, 0), 0);
	});

	TestRunner.test('multiply: negative -3 × 4 = -12', () => {
		TestRunner.assertEqual(BasicOps.multiply(-3, 4), -12);
	});

	TestRunner.test('divide: 15 ÷ 3 = 5', () => {
		TestRunner.assertEqual(BasicOps.divide(15, 3), 5);
	});

	TestRunner.test('divide: result is decimal 7 ÷ 2 = 3.5', () => {
		TestRunner.assertEqual(BasicOps.divide(7, 2), 3.5);
	});

	TestRunner.test('divide: by zero results in Infinity', () => {
		TestRunner.assertEqual(BasicOps.divide(5, 0), Infinity);
	});

	TestRunner.test('modulo: 10 % 3 = 1', () => {
		TestRunner.assertEqual(BasicOps.modulo(10, 3), 1);
	});

	TestRunner.test('modulo: 15 % 5 = 0', () => {
		TestRunner.assertEqual(BasicOps.modulo(15, 5), 0);
	});

	TestRunner.test('modulo: negative -10 % 3 = -1', () => {
		TestRunner.assertEqual(BasicOps.modulo(-10, 3), -1);
	});
});
