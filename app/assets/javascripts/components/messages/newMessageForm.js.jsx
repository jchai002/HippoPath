var NewMessageForm = React.createClass({
  getInitialState: function(){
    return ({
      body: null
    })
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className="form-group">
          <input type="text" onChange={this.handleInput} className="form-control" id="formGroupExampleInput" placeholder="Message..." />
          <input type="submit" value="send" />
        </fieldset>
      </form>
    );
  },
  handleInput: function(event){
    this.setState({
      body: event.target.value
    })
  },
  handleSubmit: function(event){
      event.preventDefault()

      var url="/messages"
      var formData = {
        conversation_id: this.props.data.id,
        message: {
          body: this.state.body
        }
      }
        $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: formData,
        success: function(data) {
          console.log(data)
        },
        error: function(xhr, status, err) {
          console.error( status, err.toString());
        }
      });
  },
  componentDidUpdate: function(){
    console.log(this.state)
  }
});
