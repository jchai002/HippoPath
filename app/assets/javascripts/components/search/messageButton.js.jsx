var MessageButton = React.createClass({
  render: function() {

    return (
      <td className="buttons">
        <button type="button" onClick={this.handleClick} className="btn-xs btn-primary">Message</button>
      </td>
    );
  },
  handleClick: function(){
    console.log(this.props)
  }
});
