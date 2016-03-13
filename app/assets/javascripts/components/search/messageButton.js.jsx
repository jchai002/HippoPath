var MessageButton = React.createClass({
  render: function() {
    var messageDisallowed = this.props.data.poster_id==this.props.currentUserId
    return (
      <td className="buttons">
        <form action="/conversations" method="post" >
          <input type="hidden" name="authenticity_token" value={this.props.token} />
          <input type="hidden" name="interview_poster_id" value={this.props.data.poster_id} />
          <input type="submit" disabled={messageDisallowed} value="Message" className={messageDisallowed ? "btn-xs btn-primary disabled" : "btn-xs btn-primary"} />
        </form>
      </td>
    );
  }
});
