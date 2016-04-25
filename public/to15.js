// add model data from api
//to9.js

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
        <CommentForm />
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
  render: function(){
    return (
      <form className="commentForm">
        <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Say something..." />
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
  <CommentBox url="http://lvlive.gstarcloud.com:50080/griver/api/actions" pollInterval={2000}/>,
  document.getElementById('content')
);
