//tutorial8.js
// to access data model.
var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
      )
  }
})

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
      <Comment author={comment.author}>
        {comment.text}
      </Comment>
      );
    });

    return (
    <div className="commentList">
    {commentNodes}
    </div>
    );
  }
})

var CommentForm = React.createClass({
  render: function(){
    return (
      <div className="commentForm">
        <h1> Hello, I am a CommentForm.</h1>
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function(){
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup};
  },

  render: function(){
    return (
      <div className="comment">
        <h2 className="commntAuthor">
        {this.props.author}
        </h2>
         <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
})


ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);