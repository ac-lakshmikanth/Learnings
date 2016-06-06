define(['app/js/controllers/min/ProgressBarDemo/ProgressBarController'],function(Controller) {

	// expose it through window. for debugging purposes...
	window.controller = new Controller();	
	
	describe('TestSuite_for_progress_bars_demo',function () {
		
		var verifyInput = controller.view.ractive.getProgressBarNewState,
			result = {};	
	
		it('Testcase_limit_min_zero',function () {
			result = verifyInput(-25,10);
			expect(result.newValue).toBe(0);
			expect(result.newState).toBe(0);
			//done();
		});

		it('Testcase_limit_valid_range',function () {
			result = verifyInput(25,10);
			expect(result.newValue).toBe(35);
			expect(result.newState).toBe(35);
			//done();
		});

		it('Testcase_limit_max_value',function () {
			result = verifyInput(25,95);
			expect(result.newValue).toBe(100);
			expect(result.newState).toBe(120);
			//done();
		});

	});
});