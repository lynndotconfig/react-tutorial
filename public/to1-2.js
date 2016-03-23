//to2.js
var CommentBOx = React.createClass({displayName: 'CommentBOx',
	render: function () {
	    return (
	    	React.createElement('div', {className: 'commentBox'},
	    		"Hello, world! I am a commentBox")
	    	);
	}
})

ReactDom.render(
	React.createElement(CommentBOx, null),
	document.getElementById('content')
	);