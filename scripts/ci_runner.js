const fs = require('fs');
const path = require('path');
const vm = require('vm');

const sandbox = {
	window: {},
	document: {
		getElementById: () => ({ innerText: '' }),
		querySelectorAll: () => [],
		createElement: () => ({ className: '', innerHTML: '', appendChild: () => { } }),
		addEventListener: (event, callback) => {
		}
	},
	console: console,
	Math: Math,
	parseFloat: parseFloat,
	isNaN: isNaN
};
sandbox.window = sandbox;

vm.createContext(sandbox);

const loadFile = (filePath) => {
	let code = fs.readFileSync(filePath, 'utf8');

	if (filePath.includes('calculator.js')) {
		code += `
            window.BasicOps = BasicOps; 
            window.ScientificOps = ScientificOps; 
            window.RoundingOps = RoundingOps; 
            window.MemoryOps = MemoryOps; 
            window.CalculatorState = CalculatorState; 
            window.calculator = calculator;
            window.operationMap = operationMap;
            window.singleOperationMap = singleOperationMap;
        `;
	}
	if (filePath.includes('test_framework.js')) {
		code += '\nwindow.TestRunner = TestRunner;';
	}

	vm.runInContext(code, sandbox);
};

try {
	console.log("Loading application...");
	loadFile(path.join(__dirname, '../js/calculator.js'));

	console.log("Loading test framework...");
	loadFile(path.join(__dirname, 'test_framework.js'));

	sandbox.TestRunner.render = function () {
		console.log('\n=== Test Results ===');
		this.results.forEach(suite => {
			console.log(`\nSuite: ${suite.name}`);
			suite.tests.forEach(test => {
				if (test.passed) {
					console.log(`  ✓ ${test.name}`);
				} else {
					console.log(`  ✗ ${test.name}`);
					console.log(`    Error: ${test.error}`);
				}
			});
		});

		console.log('\n-------------------');
		console.log(`Total: ${this.totalTests}`);
		console.log(`Passed: ${this.passedTests}`);
		console.log(`Failed: ${this.failedTests}`);

		if (this.failedTests > 0) {
			console.log('\nTests FAILED');
			process.exit(1);
		} else {
			console.log('\nTests PASSED');
			process.exit(0);
		}
	};

	const testDir = __dirname;
	fs.readdirSync(testDir).forEach(file => {
		if (file.endsWith('.js') && file !== 'test_framework.js' && file !== 'ci_runner.js') {
			console.log(`Loading tests: ${file}`);
			loadFile(path.join(testDir, file));
		}
	});

	console.log("Executing tests...");
	sandbox.TestRunner.render();

} catch (e) {
	console.error("Error running tests:", e);
	process.exit(1);
}
