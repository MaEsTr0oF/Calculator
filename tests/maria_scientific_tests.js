TestRunner.suite('ScientificOps - Scientific Functions (Мария)', () => {
	TestRunner.test('sin: sin(0) = 0', () => {
		TestRunner.assertAlmostEqual(ScientificOps.sin(0), 0, 10);
	});

	TestRunner.test('sin: sin(π/2) ≈ 1', () => {
		TestRunner.assertAlmostEqual(ScientificOps.sin(Math.PI / 2), 1, 10);
	});

	TestRunner.test('sin: sin(π) ≈ 0', () => {
		TestRunner.assertAlmostEqual(ScientificOps.sin(Math.PI), 0, 10);
	});

	TestRunner.test('cos: cos(0) = 1', () => {
		TestRunner.assertAlmostEqual(ScientificOps.cos(0), 1, 10);
	});

	TestRunner.test('cos: cos(π/2) ≈ 0', () => {
		TestRunner.assertAlmostEqual(ScientificOps.cos(Math.PI / 2), 0, 10);
	});

	TestRunner.test('cos: cos(π) ≈ -1', () => {
		TestRunner.assertAlmostEqual(ScientificOps.cos(Math.PI), -1, 10);
	});

	TestRunner.test('pow: 2^3 = 8', () => {
		TestRunner.assertEqual(ScientificOps.pow(2, 3), 8);
	});

	TestRunner.test('pow: 5^0 = 1', () => {
		TestRunner.assertEqual(ScientificOps.pow(5, 0), 1);
	});

	TestRunner.test('pow: 10^-2 = 0.01', () => {
		TestRunner.assertEqual(ScientificOps.pow(10, -2), 0.01);
	});

	TestRunner.test('pow: 4^0.5 = 2', () => {
		TestRunner.assertEqual(ScientificOps.pow(4, 0.5), 2);
	});

	TestRunner.test('sqrt: √16 = 4', () => {
		TestRunner.assertEqual(ScientificOps.sqrt(16), 4);
	});

	TestRunner.test('sqrt: √0 = 0', () => {
		TestRunner.assertEqual(ScientificOps.sqrt(0), 0);
	});

	TestRunner.test('sqrt: √2 ≈ 1.414', () => {
		TestRunner.assertAlmostEqual(ScientificOps.sqrt(2), 1.414213562373095, 10);
	});

	TestRunner.test('sqrt: √-1 = NaN', () => {
		TestRunner.assert(isNaN(ScientificOps.sqrt(-1)), 'sqrt of negative should be NaN');
	});

	TestRunner.test('reciprocal: 1/2 = 0.5', () => {
		TestRunner.assertEqual(ScientificOps.reciprocal(2), 0.5);
	});

	TestRunner.test('reciprocal: 1/4 = 0.25', () => {
		TestRunner.assertEqual(ScientificOps.reciprocal(4), 0.25);
	});

	TestRunner.test('reciprocal: 1/0.5 = 2', () => {
		TestRunner.assertEqual(ScientificOps.reciprocal(0.5), 2);
	});

	TestRunner.test('reciprocal: 1/0 = Infinity', () => {
		TestRunner.assertEqual(ScientificOps.reciprocal(0), Infinity);
	});
});
