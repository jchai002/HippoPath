var MessageButton = React.createClass({
  render: function() {
    var cssClass = "btn btn-primary mar-b-15 mar-x-15 pull-right"
    var messageDisallowed = this.props.data.poster_id==this.props.currentUserId
    return (
      <div className="buttons">
        <form action="/conversations" method="post" >
          <input type="hidden" name="authenticity_token" value={this.props.token} />
          <input type="hidden" name="interview_poster_id" value={this.props.data.poster_id} />
          <input type="submit" disabled={messageDisallowed} value="Message" className={messageDisallowed ? cssClass + " disabled" : cssClass} />
        </form>
      </div>
    );
  }
});
