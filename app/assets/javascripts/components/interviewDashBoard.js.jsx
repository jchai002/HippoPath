var InterviewDashBoard = React.createClass({
  getInitialState: function(){
    return ({
      interviewPanels:[]
    })
  },
  getData: function(){
    console.log('requesting data...')
    $.ajax({
      url: '/interviews',
      dataType: 'json',
      success: function(results) {
        if (results[0]) {
          this.setInterviewPanels(results)
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  setInterviewPanels: function(data){
    var handleUpdate = this.handleUpdate;
    var handleDelete = this.handleDelete;
    var panels = data.map(function(interviewInfo){
      var bodyContent = {};
      bodyContent['date'] = interviewInfo['date'] || 'unknown';
      bodyContent['time'] = interviewInfo['time'] || 'unknown';
      return <InfoPanel
        url="/interviews"
        id={interviewInfo.id}
        key={interviewInfo.id}
        layoutType='interview'
        interviewInfo={interviewInfo}
        bodyContent={bodyContent}
        wrapperClass="col-sm-12 col-md-6 col-lg-4 fadein-grow"
        flexBoxClass="panel-flex-container-2"
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        />
    })
    this.setState({interviewPanels:panels})
  },
  componentWillMount: function() {
    this.getData();
  },
  handleUpdate: function(){
    this.getData();
  },
  handleDelete: function(deletedItemId){
    var panels = this.state.interviewPanels.filter(function(panelItem){
      return panelItem.props.id != deletedItemId
    })
    this.setState({interviewPanels:panels})
  },
  render: function() {
    if (this.state.interviewPanels.length > 0) {
      panels = this.state.interviewPanels;
    } else {
      panels = <div className="panel panel-default empty-result"><div className="slideDown"><i className="fa fa-list fa-3x mar-b-20"></i></div><div className="slideUp"><h1>You Have No Interviews</h1></div></div>;
    }
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
              {panels}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
