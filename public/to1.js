//to.js
var CommentBox = React.createClass({
	render: function(){
		return (
			<div className="commentBox">
			Hello, world,I am CommentBox
			</div>
			);
	}
});
ReactDOM.render(
	<CommentBox />,
	document.getElementById('content')
);