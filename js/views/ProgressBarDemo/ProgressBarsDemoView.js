define([
	'ractive',
	'l18n!app/js/views/ProgressBarDemo/nls/ProgressBarLabels',
	'app/js/templates/button/ButtonView',
	'app/js/templates/select/SelectView',
	'app/js/templates/progressbar/ProgressBarView',
	'rv!app/js/views/ProgressBarDemo/templates/ProgressBarsDemo'
	],function(Ractive,l18n,ButtonView,SelectView,ProgressBarView,ProgressBarsDemo){
	
		return Backbone.View.extend({
		
			el: '#testForm',

			model: null,
			ractive: null,
			
			l18n: l18n,
		
			initialize: function(args) {			
				this.model = args.model;				
				this.undelegateEvents();
				this.events = {
					"click button#resetBtn": this.reset
				};
				this.on('EVT_TEST_ACTION',this.triggerAction);
				this.delegateEvents();								
				this.render(this.getDefaultViewData(),this);
			},
			
			triggerAction: function(elementName,data) {
				console.log('-------UPDATE triggerred from [RACTIVE] view TO [BACKBONE] view ::: '+elementName+' = '+data+'---------');
			},
			
			reset: function() {
				this.model.defaults = this.model.getDefaultData();
				this.model.set(this.model.defaults);
				this.ractive.resetView(this.getDefaultViewData());
			},			
			
			getDefaultViewData: function() {
				return _.extend(this.model.toJSON(),this.l18n);
			},
			
			render: function(defaultAttr,backboneObj) {
			
				this.ractive = new Ractive({
					
					// view container
					el: '.ProgressBarDisplay',
					
					// set the template to be used for this ractive component
					template: ProgressBarsDemo,
					
					components: {
						ProgressBarComponent: ProgressBarView,
						ButtonComponent: ButtonView,
						SelectComponent: SelectView
					},

					// animation duration in milliseconds
					progressAnimDuration: 270,

					// animation style
					progressAnimStyle: 'easeInOut',
					
					data: defaultAttr,

					// this method is called firstime when ractive initiates this component 
					oninit: function() {						
						var eventHandlerName = this.get('buttonEventName'),
							eventName = 'ButtonComponent.'+eventHandlerName;
							
						this[eventHandlerName] = this.onChangeProgress;
						this.on(eventName,this[eventHandlerName]);
					},
					
					resetView: function(modelAttr) {
						this.set(modelAttr);
					},

					// this is the event called with click of each button that changes state of progress bar
					onChangeProgress: function(event,changeByValue) {

						changeByValue = parseInt(changeByValue,10);
						var currentProgressBar = this.get('selectedProgressBar');
						var currentValue = parseInt(this.get('progressBars')[currentProgressBar].progressBarValue,10);
						var updateObj = this.getProgressBarNewState(changeByValue,currentValue);
						
						var changeW = this.animate('progressBars.'+currentProgressBar+'.width',updateObj.newValue,{duration:this.progressAnimDuration,easing:this.progressAnimStyle});
						var changeP = this.animate('progressBars.'+currentProgressBar+'.progressBarValue',updateObj.newState,{duration:0,easing:this.progressAnimStyle});
						changeW.then(function(){
							console.log('---width--');
						});
						changeP.then(function(){
							console.log('---progress--');
						});
						backboneObj.trigger('EVT_TEST_ACTION',currentProgressBar,updateObj.newState);
					},

					// calculation logic is seperated to ensure that test cases can be tested without depending on DOM
					getProgressBarNewState: function(changeByValue,currentValue) {
						var newValue = 0, newState=0,
						calcValue = parseInt((currentValue+changeByValue),10),
						isExceeded = false;
						if(calcValue>100) {
							newValue = 100;
							newState = calcValue;
							isExceeded = true;
						} else if(calcValue<=0) {
							newValue = 0;
							newState = 0;
						} else {
							newValue = calcValue;
							newState = calcValue;
						}
						return {newValue:newValue, newState:newState, isExceeded:isExceeded};
					}
				});
			}			
		});
		
});