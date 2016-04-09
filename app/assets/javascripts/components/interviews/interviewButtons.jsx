var InterviewButtons = React.createClass({
  render: function() {
    var rowData= this.props.data
    var rowID= rowData.id
    return (
      <div className="buttons">
        <button type="button" className="btn btn-danger mar-b-15 mar-l-20 mar-r-5" onClick={this.handleDeleteClick}>Delete</button>
        <button type="button"  data-toggle="modal" data-target={"#myModal"+rowID} className="btn btn-success edit-button mar-b-15 mar-r-20 mar-l-5">Edit</button>

        <div className="modal fade" id={"myModal"+rowID} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Edit Interview</h4>
              </div>
              <div className="modal-body">
                <EditInterviewForm handleUpdate={this.props.handleUpdate} data={rowData} key={rowID} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  handleDeleteClick: function(){
    if (window.confirm("Delete This Interview?")) {
      var url=this.props.url+'/'+this.props.data.id
      $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
          this.props.handleDelete(this.props.data.id)
        }.bind(this),
        error: function(xhr, status, err) {
          console.error( status, err.toString());
        }.bind(this)
      })
    }
  }
});
