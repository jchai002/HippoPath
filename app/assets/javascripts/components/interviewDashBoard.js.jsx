var InterviewDashBoard = React.createClass({
  getInitialState: function(){
    return ({
      interviewPanels:[],
      originalResults:undefined,
      upcomingInterviews:undefined,
      pastInterviews:undefined,
      currentlySortingBy: 'date',
      currentDateSortDirection: 'desc',
      currentHospitalSortDirection: 'desc',
      hidingPastInterviews:true
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
            upcomingInterviews:results
          },function(){
            this.sortThenDisplay(this.state.upcomingInterviews);
          })
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInterviewPanels: function(data){
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
    console.log(panels)
    return panels
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
  sortThenDisplay: function(resultSet){
    if (this.state.currentlySortingBy == 'date') {
      this.orderByDate(resultSet);
    }
    if (this.state.currentlySortingBy == 'hospital') {
      this.orderByHospital(resultSet);
    }
  },
  orderByDate: function(resultSet){
    $('.active').removeClass('active');
    $('.date-sort').addClass('active');
    this.setState({currentlySortingBy:'date'})
    if (this.state.currentDateSortDirection === 'asc') {
      this.setState({
        upcomingInterviews: _.orderBy(resultSet, ['date'], ['desc']),
        currentDateSortDirection: 'desc'
      },function(){
        $('.date-sort')
          .removeClass('asc')
          .addClass('desc')
      })
    } else {
      this.setState({
        upcomingInterviews: _.orderBy(resultSet, ['date'], ['asc']),
        currentDateSortDirection: 'asc'
      },function(){
        $('.date-sort')
          .removeClass('desc')
          .addClass('asc')
      })
    }
  },
  orderByHospital: function(resultSet){
    $('.active').removeClass('active');
    $('.hospital-sort').addClass('active');
    this.setState({currentlySortingBy:'hospital'})
    if (this.state.currentHospitalSortDirection === 'asc') {
      this.setState({
        upcomingInterviews: _.orderBy(resultSet, ['hospital'], ['desc']),
        currentHospitalSortDirection: 'desc'
      },function(){
        $('.hospital-sort')
          .removeClass('asc')
          .addClass('desc')
      })
    } else {
      this.setState({
        upcomingInterviews: _.orderBy(resultSet, ['hospital'], ['asc']),
        currentHospitalSortDirection: 'asc'
      },function(){
        $('.hospital-sort')
          .removeClass('desc')
          .addClass('asc')
      })
    }
  },
  render: function() {
    if (this.state.upcomingInterviews && this.state.upcomingInterviews.length > 0) {
      panels = this.getInterviewPanels(this.state.upcomingInterviews)
    } else {
      panels = <div className="panel panel-default empty-result"><div className="slideDown"><i className="fa fa-list fa-3x mar-b-20"></i></div><div className="slideUp"><h1>No Interviews To Show</h1></div></div>;
    }
    var component = this;
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
            <span className="label label-info mar-r-5 date-sort active" onClick={component.orderByDate.bind(this,component.state.upcomingInterviews)}>Date<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
            <span className="label label-info mar-r-5 hospital-sort"  onClick={component.orderByHospital.bind(this,component.state.upcomingInterviews)}>Hospital<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
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
  },
  toggleDisplayPastInterviews: function() {
    component = this;
    function isNotPastInterview(interviewObject) {
      var date =  interviewObject['date']
      var time = interviewObject['time']
      var dateTime = date+' '+time
      return moment(dateTime, "MM-DD-YYYY HH:mm").isAfter(moment())
    }
    var completeResults = component.state.originalResults;
    var resultsWithHiddenInterviews = null;
    if (completeResults) {
      resultsWithHiddenInterviews = completeResults.filter(isNotPastInterview);
    }
    if (!component.state.hidingPastInterviews) {
      component.setState({
        upcomingInterviews:resultsWithHiddenInterviews,
        hidingPastInterviews:true
      }, function(){
        component.sortThenDisplay(component.state.upcomingInterviews);
      })
    } else {
      component.setState({
        upcomingInterviews:completeResults,
        hidingPastInterviews:false
      }, function(){
        component.sortThenDisplay(component.state.upcomingInterviews);
      })
    }
  },
  toggleHidePastInterviewsButton: function(){
    if (this.state.hidingOwnResults) {
      $('.hide-past')
        .addClass('hide-past-active')
        .text('Show Past Interviews');
    } else {
      $('.hide-past')
        .removeClass('hide-past-active')
        .text('Hide Past Interviews');
    }
  },
  componentDidUpdate: function(){
    this.toggleHidePastInterviewsButton();
  }
});
