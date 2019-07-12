module.exports = (config) => {
	config.set({
		mutator:          'javascript',
		packageManager:   'npm',
		reporters:        ['clear-text', 'progress', 'dashboard'],
		testRunner:       'jest',
		transpilers:      ['babel'],
		coverageAnalysis: 'off',
		thresholds:       {
			high:  80,
			low:   60,
			break: 100,
		},
	});
};
