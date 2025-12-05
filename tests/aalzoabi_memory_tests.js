TestRunner.suite('MemoryOps - Memory Functions (Адель)', () => {
	TestRunner.test('memoryAdd: 5 + 3 = 8', () => {
		TestRunner.assertEqual(MemoryOps.memoryAdd(5, 3), 8);
	});

	TestRunner.test('memoryAdd: 0 + 10 = 10', () => {
		TestRunner.assertEqual(MemoryOps.memoryAdd(0, 10), 10);
	});

	TestRunner.test('memoryAdd: negative values', () => {
		TestRunner.assertEqual(MemoryOps.memoryAdd(-5, 3), -2);
	});

	TestRunner.test('memorySubtract: 10 - 3 = 7', () => {
		TestRunner.assertEqual(MemoryOps.memorySubtract(10, 3), 7);
	});

	TestRunner.test('memorySubtract: 5 - 8 = -3', () => {
		TestRunner.assertEqual(MemoryOps.memorySubtract(5, 8), -3);
	});

	TestRunner.test('memoryClear: returns 0', () => {
		TestRunner.assertEqual(MemoryOps.memoryClear(), 0);
	});
	TestRunner.test('memoryRecall: recalls value 42', () => {
		TestRunner.assertEqual(MemoryOps.memoryRecall(42), 42);
	});

	TestRunner.test('memoryRecall: recalls 0', () => {
		TestRunner.assertEqual(MemoryOps.memoryRecall(0), 0);
	});

	TestRunner.test('memoryStore: stores value 15', () => {
		TestRunner.assertEqual(MemoryOps.memoryStore(15), 15);
	});

	TestRunner.test('memoryStore: stores negative -7', () => {
		TestRunner.assertEqual(MemoryOps.memoryStore(-7), -7);
	});
});
