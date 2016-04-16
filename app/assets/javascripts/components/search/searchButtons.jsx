var SearchButtons = React.createClass({
  getInitialState: function() {
    return {
      saved: _.includes(this.props.savedInterviewIds, this.props.interviewId),
      selectorClass: ''
    }
  },
  render: function() {
    var noContact = this.props.PosterId==this.props.currentUserId
    var messageButton = <a data-toggle="tooltip" title="Message" data-sid={this.props.currentUserId} data-rid={this.props.PosterId} disabled={noContact} className={noContact ? "disabled" : "start-conversation"} ><i className="fa fa-2x fa-wechat"></i></a>;
    var saveButton;
    if (this.state.saved) {
      saveButton = <a data-url={noContact ? "" : "interviews/save/"+this.props.interviewId} data-toggle="tooltip" title="Saved" className={this.state.selectorClass}><i className="fa fa-2x fa-check"></i></a>;
    } else {
      saveButton = <a data-url={noContact ? "" : "interviews/save/"+this.props.interviewId} data-toggle="tooltip" title="Save" className={noContact ? "disabled" : "save-interview"}><i className="fa fa-2x fa-heartbeat" onClick={this.handleSaveClick}></i></a>;
    }
    return (
      <div className="search-buttons">
        {messageButton}
        {saveButton}
      </div>
    );
  },
  handleSaveClick: function() {
    this.setState({
      saved:true,
      selectorClass: 'recently-saved'
    });
  },
  componentDidUpdate: function() {
    if (this.state.selectorClass === 'recently-saved') {
      $('.recently-saved')
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100)
        .promise()
        .done(function(){
          $(this).removeClass('recently-saved');
        });
    }
  }
});
