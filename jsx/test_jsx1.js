var MyJSXComponent = React.createClass({
	render: function () {
		//var testStyle = {color:red,fontSize:12};
		return (
			<form>
				<div id='div1'><label>LABEL-1</label> : <input type='text' id='text1'/></div>
				<div id='div2' style={{color:red,fontSize:13}}><label>LABEL-2</label> : <input type='text' id='text2'/></div>
				<div id={(function(){return 'div3';})()}>div-3</div>
				<div/>div-self-closing-tag
				<span/>span-self-closing-tag
				<div>{(1 && 'newitem')}</div>
			</form>
		)
	}
});