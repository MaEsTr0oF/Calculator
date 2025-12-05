const TestRunner = {
	totalTests: 0,
	passedTests: 0,
	failedTests: 0,
	currentSuite: null,
	results: [],

	suite(name, fn) {
		this.currentSuite = { name, tests: [] };
		fn();
		this.results.push(this.currentSuite);
		this.currentSuite = null;
	},

	test(name, fn) {
		this.totalTests++;
		try {
			fn();
			this.passedTests++;
			this.currentSuite.tests.push({ name, passed: true });
		} catch (error) {
			this.failedTests++;
			this.currentSuite.tests.push({ name, passed: false, error: error.message });
		}
	},

	assert(condition, message) {
		if (!condition) {
			throw new Error(message || 'Assertion failed');
		}
	},

	assertEqual(actual, expected, message) {
		if (actual !== expected) {
			throw new Error(message || `Expected ${expected}, but got ${actual}`);
		}
	},

	assertAlmostEqual(actual, expected, decimals = 10, message) {
		const multiplier = Math.pow(10, decimals);
		const actualRounded = Math.round(actual * multiplier) / multiplier;
		const expectedRounded = Math.round(expected * multiplier) / multiplier;
		if (actualRounded !== expectedRounded) {
			throw new Error(message || `Expected ${expected}, but got ${actual}`);
		}
	},

	render() {
		const resultsDiv = document.getElementById('results');
		const summaryDiv = document.getElementById('summary');

		this.results.forEach(suite => {
			const suiteDiv = document.createElement('div');
			suiteDiv.className = 'test-suite';
			suiteDiv.innerHTML = `<h2>${suite.name}</h2>`;

			suite.tests.forEach(test => {
				const testDiv = document.createElement('div');
				testDiv.className = `test-case ${test.passed ? 'pass' : 'fail'}`;
				testDiv.innerHTML = `
                    <div class="test-name">
                        ${test.passed ? '✓' : '✗'} ${test.name}
                    </div>
                    ${test.error ? `<div class="test-error">${test.error}</div>` : ''}
                `;
				suiteDiv.appendChild(testDiv);
			});

			resultsDiv.appendChild(suiteDiv);
		});

		const coverage = ((this.passedTests / this.totalTests) * 100).toFixed(1);
		summaryDiv.className = `summary ${this.failedTests === 0 ? 'all-pass' : 'has-fail'}`;
		summaryDiv.innerHTML = `
            <h2>Test Summary</h2>
            <div class="stat">Total: ${this.totalTests}</div>
            <div class="stat">Passed: ${this.passedTests}</div>
            <div class="stat">Failed: ${this.failedTests}</div>
            <div class="stat">Coverage: ${coverage}%</div>
        `;
	}
};

document.addEventListener('DOMContentLoaded', () => {
	TestRunner.render();
});
