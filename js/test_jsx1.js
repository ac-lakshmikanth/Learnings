'use strict';

var MyJSXComponent = React.createClass({
	displayName: 'MyJSXComponent',

	render: function render() {
		//var testStyle = {color:red,fontSize:12};
		return React.createElement(
			'form',
			null,
			React.createElement(
				'div',
				{ id: 'div1' },
				React.createElement(
					'label',
					null,
					'LABEL-1'
				),
				' : ',
				React.createElement('input', { type: 'text', id: 'text1' })
			),
			React.createElement(
				'div',
				{ id: 'div2', style: { color: red, fontSize: 13 } },
				React.createElement(
					'label',
					null,
					'LABEL-2'
				),
				' : ',
				React.createElement('input', { type: 'text', id: 'text2' })
			),
			React.createElement(
				'div',
				{ id: function () {
						return 'div3';
					}() },
				'div-3'
			),
			React.createElement('div', null),
			'div-self-closing-tag',
			React.createElement('span', null),
			'span-self-closing-tag',
			React.createElement(
				'div',
				null,
				1 && 'newitem'
			)
		);
	}
});