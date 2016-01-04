var Panel = React.createClass({
  getInitialState: function(){
    return ({
      interviews:''
    })
  },
  componentDidMount: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
          this.setState({interviews:data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var interviewArray=[]
    for (var key in this.state.interviews){
      interviewArray.push(this.state.interviews[key])
    }

    var interviewList= interviewArray.map(function(interviewProps){
        return <ContentRow interview={interviewProps} key={interviewProps.id} />
    })

    console.log(interviewList)

    return (
        <div className="widget widget-nopad col-sm-6">
          <div className="widget-header"> <i className="icon-list-alt"></i>
          <h3> My Intervews</h3>
        </div>

        <div className="widget-content">
          <ul className="news-items">
            {interviewList}
          </ul>
        </div>

  </div>
);
}
});
