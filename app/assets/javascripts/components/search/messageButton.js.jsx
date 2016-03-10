var MessageButton = React.createClass({
  render: function() {
    return (
      <td className="buttons">
        <form action="/conversations" method="post" >
          <input type="hidden" name="authenticity_token" value={this.props.token} />
          <input type="hidden" name="interview_poster_id" value={this.props.data.poster_id} />
          <input type="submit" value="Message" className="btn-xs btn-primary" />
        </form>
      </td>
    );
  }
});
