var SearchButtons = React.createClass({
  render: function() {
    var noContact = this.props.PosterId==this.props.currentUserId
    return (
      <div className="search-buttons">
        <a data-toggle="tooltip" title="Message" data-sid={this.props.currentUserId} data-rid={this.props.PosterId} disabled={noContact} className={noContact ? "disabled" : "start-conversation"} ><i className="fa fa-2x fa-wechat"></i></a>
        <a data-toggle="tooltip" title="Save" disabled={noContact} className={noContact ? "disabled" : ""}><i className="fa fa-2x fa-heartbeat"></i></a>
      </div>
    );
  }
});
