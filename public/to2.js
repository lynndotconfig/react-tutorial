//to2.js
var CommentList = React.createClass({
	render: function(){
		return (
			<div className="commentList">
			Hello, world,I am CommentList
			</div>
			);
	}
});

var CommentForm = React.createClass({
	render: function(){
		return (
			<div className="commentForm">
			Hello, world,I am CommentForm
			</div>
			);
	}
});

var CommentBox = React.createClass({
	render: function(){
		return (
			<div className="commentBox">
			<h1> CommentBox </h1>
			<CommentBox />
			<CommentForm />
			</div>
			);
	}
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);

