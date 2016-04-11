var InterviewDashBoard = React.createClass({
  getInitialState: function(){
    return ({
      interviewPanels:[],
      originalResults:undefined,
      modifiedResults:undefined,
      currentDateSortDirection: 'desc',
      currentHospitalSortDirection: 'desc'
    })
  },
  getData: function(){
    $.ajax({
      url: '/interviews',
      dataType: 'json',
      success: function(results) {
        if (results[0]) {
          this.setState({
            originalResults:results,
            modifiedResults:results
          },function(){
            this.orderByDate();
          })
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
        wrapperClass="col-sm-12 col-md-6 col-lg-4"
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
  orderByDate: function(){
    $('.active').removeClass('active');
    $('.date-sort').addClass('active');
    var resultSet = this.state.modifiedResults;
    if (this.state.currentDateSortDirection === 'asc') {
      this.setState({
        modifiedResults: _.orderBy(resultSet, ['date'], ['desc']),
        currentDateSortDirection: 'desc'
      },function(){
        $('.date-sort')
          .removeClass('asc')
          .addClass('desc')
        this.setInterviewPanels(this.state.modifiedResults);
      })
    } else {
      this.setState({
        modifiedResults: _.orderBy(resultSet, ['date'], ['asc']),
        currentDateSortDirection: 'asc'
      },function(){
        $('.date-sort')
          .removeClass('desc')
          .addClass('asc')
        this.setInterviewPanels(this.state.modifiedResults);
      })
    }
  },
  orderByHospital: function(){
    $('.active').removeClass('active');
    $('.hospital-sort').addClass('active');
    var resultSet = this.state.modifiedResults;
    if (this.state.currentHospitalSortDirection === 'asc') {
      this.setState({
        modifiedResults: _.orderBy(resultSet, ['hospital'], ['desc']),
        currentHospitalSortDirection: 'desc'
      },function(){
        $('.hospital-sort')
          .removeClass('asc')
          .addClass('desc')
        this.setInterviewPanels(this.state.modifiedResults);
        console.log('sort', this.state.currentHospitalSortDirection)

      })
    } else {
      this.setState({
        modifiedResults: _.orderBy(resultSet, ['hospital'], ['asc']),
        currentHospitalSortDirection: 'asc'
      },function(){
        $('.hospital-sort')
          .removeClass('desc')
          .addClass('asc')
        this.setInterviewPanels(this.state.modifiedResults);
        console.log('sort', this.state.currentHospitalSortDirection)
      })
    }
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

        <div className="pad-l-15 pad-b-20 filters">
          <span className="filter-group">
          <span className="pad-r-5">Order By:</span>
          <span>
          <span className="label label-info mar-r-5 date-sort active" onClick={this.orderByDate}>Date<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
          <span className="label label-info mar-r-5 hospital-sort"  onClick={this.orderByHospital}>Hospital<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
          </span>
          </span>
          <span>
            <span className="label label-defualt hide-own filter-group" onClick={this.toggleDisplayPastInterviews}>Hide Past Interviews
            </span>
          </span>
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
