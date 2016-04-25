var CommentBox = React.createClass({
  loadCommentsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache:false,
      success: function(data){
        this.setState({data:data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, error.toString());
      }.bind(this),
    });
  },

  handleCommitSubmit: function(comment){
    //TODO: submit to the server and refresh the list
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data:[]};
  },

  componentDidMount: function(){
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    console.log(this.state.data)
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommitSubmit} />
      </div>
      )
  }
})

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
      <Comment action={comment.action}>
        {comment.target}
        {comment.action}
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
  handleSubmit: function(e) {
    e.preventDefault();
    var action = this.refs.action.value.trim();
    var target = this.refs.target.value.trim();
    if (!target || !action) {
      return;
    }

    //send request to the server
    this.props.onCommentSubmit({action: action, target: target});
    this.refs.action.value = '';
    this.refs.target.value = '';
    return;
  },
  render: function(){
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your action" ref="action" />
        <input type="text" placeholder="Your target..." ref="target" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function(){
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup};
  },

  render: function(){
    console.log('comment props:')
    console.log(this.props)
    return (
      <div className="comment">
        <h2 className="commntAction">
        {this.props.action}
        </h2>
         {this.props.children}
      </div>
    );
  }
})


ReactDOM.render(
  <CommentBox url="http://lvlive.gstarcloud.com:50080/griver/api/actions/" pollInterval={2000}/>,
  document.getElementById('content')
);
