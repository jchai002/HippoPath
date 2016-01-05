var TableRow = React.createClass({
    getInitialState: function(){
      return {
        deleted:false
      }
    },
    render: function() {
        if(!this.state.deleted){
          var headers= this.props.headers
          var rowData= this.props.data
          var rowID= rowData.id
          var tableCells= headers.map(function(header){
              return <td>{rowData[header]}</td>
          })
          return (
          <tr>
            {tableCells}
            <td className="buttons"><button type="button" className="btn-xs btn-danger" onClick={this.handleDeleteClick}>Delete</button>

            //modal for edit form
            <button type="button"  data-toggle="modal" data-target={"#myModal"+rowID} className="btn-xs btn-success">Edit</button>

              <div className="modal fade" id={"myModal"+rowID} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title" id="myModalLabel">Edit Interview</h4>
                    </div>
                    <div className="modal-body">
                      <EditInterviewForm data={rowData} />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        );
      }else{
        return <tr></tr>
      }
    },
    handleDeleteClick: function(){
      if (window.confirm("Delete This Interview?")) {
            var url=this.props.url+'/'+this.props.data.id
            $.ajax({
            url: url,
            type: 'DELETE',
            success: function(result) {
              this.setState({deleted:true})
            }.bind(this),
            error: function(xhr, status, err) {
              console.error( status, err.toString());
            }.bind(this)
          })
        }
    }
});
