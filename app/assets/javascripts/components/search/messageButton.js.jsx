var MessageButton = React.createClass({
  render: function() {
    var cssClass = "btn btn-primary mar-b-15 mar-x-15 pull-right start-conversation"
    var messageDisallowed = this.props.data.poster_id==this.props.currentUserId
    return (
      <div className="buttons">
          <a data-sid={this.props.currentUserId} data-rip={this.props.data.poster_id} disabled={messageDisallowed} value="Message" className={messageDisallowed ? cssClass + " disabled" : cssClass} >Send Message</a>
      </div>
    );
  }
});
