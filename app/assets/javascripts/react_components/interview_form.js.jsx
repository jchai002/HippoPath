var InterviewForm = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Add a Note</div>
        <div className="panel-body">
          <form className="commentForm " onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label" forName="authorInput">Author</label>
              <input type="text" id="authorInput" className="form-control" placeholder="Your name" ref="author" />
            </div>
            <div className="form-group">
              <label className="control-label" forName="commentInput">Comment</label>
              <textarea className="form-control" id="commentInput" rows="3" placeholder="Say something..." ref="text" />
            </div>
            <input type="submit" className="btn btn-primary" value="Post" />
          </form>
        </div>
      </div>
    );
  }
});
