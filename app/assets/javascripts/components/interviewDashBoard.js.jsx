var InterviewDashBoard = React.createClass({
  getInitialState: function(){
    return ({
      interviewPanels:null
    })
  },
  getData: function(){
    console.log('requesting data...')
    $.ajax({
      url: '/interviews',
      dataType: 'json',
      success: function(results) {
        this.setInterviewPanels(results)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  setInterviewPanels: function(data){
    var handleUpdate = this.handleUpdate
    var panels = data.map(function(interviewInfo){
      return <InfoPanel url="/interviews" key={interviewInfo.id} interviewInfo={interviewInfo} bootstrapClass="col-sm-12 col-md-6" handleUpdate={handleUpdate} />
    })
    this.setState({interviewPanels:panels})
  },
  componentWillMount: function() {
    this.getData();
  },
  handleUpdate: function(){
    this.getData();
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <NewInterviewForm />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="row pad-x-15">
              {this.state.interviewPanels}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
