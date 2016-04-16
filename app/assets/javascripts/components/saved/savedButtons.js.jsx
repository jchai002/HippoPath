var SavedButtons = React.createClass({
  render: function() {

    return (
      <div className="interview-buttons">
        <button type="button" className="btn btn-danger mar-b-15 mar-l-20 mar-r-15" onClick={this.handleRemoveClick}>Remove</button>
      </div>
    );
  },
  handleRemoveClick: function(){
    if (window.confirm("Remove This Interview From Saved?")) {
      var url='/interviews/remove_from_saved/'+this.props.data.id
      $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
          this.props.handleRemove(this.props.data.id)
        }.bind(this),
        error: function(xhr, status, err) {
          console.error( status, err.toString());
        }.bind(this)
      })
    }
  }
});
