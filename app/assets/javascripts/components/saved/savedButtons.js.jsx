var SavedButtons = React.createClass({
  render: function() {

    return (
      <div className="interview-buttons">
        <button type="button" className="btn btn-danger mar-b-15 mar-l-20 mar-r-15" onClick={this.handleRemoveClick}>Remove</button>
      </div>
    );
  },
  handleRemoveClick: function(){
    this.props.handleRemove(this.props.data.id);
  }
});
