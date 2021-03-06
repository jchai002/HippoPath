var InterviewButtons = React.createClass({
  render: function() {
    var rowData= this.props.data
    var rowID= rowData.id
    var disableButtonText = this.props.disabled ? 'Enable' : 'Disable'
    return (
      <div className="interview-buttons">
        <button type="button" className="btn btn-danger mar-b-15 mar-l-20 mar-r-5" onClick={this.handleDeleteClick}>Delete</button>
        <button type="button" className="btn btn-warning mar-b-15 mar-l-5 mar-r-5" onClick={this.handleDisableClick}>{disableButtonText}</button>
        <button type="button"  data-toggle="modal" data-target={"#myModal"+rowID} className="btn btn-success edit-button mar-b-15 mar-r-20 mar-l-5">Edit</button>

        <div className="modal fade" id={"myModal"+rowID} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Edit Interview</h4>
              </div>
              <div className="modal-body">
                <EditInterviewForm handleUpdate={this.props.handleUpdate} data={rowData} key={rowID} displayMessage={this.displayMessage}/>
              </div>
              <div className="modal-footer relative">
                <span className="label label-success success-message"><i className="fa fa-refresh fa-spin mar-r-5"></i><span className="success-message-content"></span></span>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  handleDeleteClick: function(){
    this.props.handleDelete(this.props.data.id);
  },
  handleDisableClick: function(){
    var action = this.props.disabled ? 'enable' : 'disable'
    this.props.handleDisable(this.props.data.id, action);
  },
  displayMessage: function(data){
    $('.success-message-content').text(data['message']);
    $('.success-message')
      .fadeIn(150)
      .delay(1000)
      .fadeOut(150)
      .promise()
      .done(function(){
        $('.modal').modal('hide');
      })
  }
});
