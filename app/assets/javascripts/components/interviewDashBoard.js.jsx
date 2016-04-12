var InterviewDashBoard = React.createClass({
  getInitialState: function(){
    return ({
      interviewPanels:[],
      originalData:undefined,
      currentDataStore:undefined,
      currentlySortingBy: 'date',
      currentDateSortDirection: 'asc',
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
            originalData:results
          },function(){
            var filteredData = this.getUpcomingInterviews(this.state.originalData);
            var sortedData;
            var sortingBy = this.state.currentlySortingBy;
            if (sortingBy==='date') {
              sortedData = this.sortData(filteredData,sortingBy,this.state.currentDateSortDirection);
            }
            if (sortingBy==='hospital') {
              sortedData = this.sortData(filteredData,sortingBy,this.stacurrentHospitalSortDirectionion);
            }
            this.setState({currentDataStore:sortedData});
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
    return panels
  },
  componentWillMount: function() {
    this.getData();
  },
  handleUpdate: function(){
    this.getData();
  },
  handleDelete: function(deletedItemId){
    var interviewsToKeep = this.state.currentDataStore.filter(function(interivew){
      return interivew['id'] != deletedItemId
    })
    this.setState({currentDataStore:interviewsToKeep})
  },
  handleDateSortClick: function() {
    $('.active-sort').removeClass('active-sort');
    $('.date-sort').addClass('active-sort');
    var dataSet = this.state.currentDataStore;
    var sortedData;
    if (this.state.currentDateSortDirection === 'asc') {
      sortedData = this.sortByDate(dataSet,'desc')
      this.setState({
        currentDataStore: sortedData,
        currentDateSortDirection:'desc'
      })
    } else {
      sortedData = this.sortByDate(dataSet,'asc')
      this.setState({
        currentDataStore: sortedData,
        currentDateSortDirection:'asc'
      })
    }
  },
  handleHospitalSortClick: function() {
    $('.active-sort').removeClass('active-sort');
    $('.hospital-sort').addClass('active-sort');
    var dataSet = this.state.currentDataStore;
    var sortedData;
    if (this.state.currentHospitalSortDirection === 'asc') {
      sortedData = this.sortByHospital(dataSet,'desc')
      this.setState({
        currentDataStore: sortedData,
        currentHospitalSortDirection:'desc'
      })
    } else {
      sortedData = this.sortByHospital(dataSet,'asc')
      this.setState({
        currentDataStore: sortedData,
        currentHospitalSortDirection:'asc'
      })
    }
  },
  handleUpcomingFilterClick: function(){
    $('.active-filter').removeClass('active-filter');
    $('.upcoming-filter').addClass('active-filter');
    var filteredData = this.getUpcomingInterviews(this.state.originalData);
    var sortBy = this.state.currentlySortingBy;
    var sortDirection;
    if (sortBy === 'date') {
      sortDirection = this.state.currentDateSortDirection;
    }
    if (sortBy === 'hospital') {
      sortDirection = this.state.currentHospitalSortDirection;
    }
    var sortedData = this.sortData(filteredData, sortBy, sortDirection);
    this.setState({currentDataStore:sortedData})
  },
  handlePastFilterClick: function(){
    $('.active-filter').removeClass('active-filter');
    $('.past-filter').addClass('active-filter');
    var filteredData = this.getPastInterviews(this.state.originalData);
    var sortBy = this.state.currentlySortingBy;
    var sortDirection;
    if (sortBy === 'date') {
      sortDirection = this.state.currentDateSortDirection;
    }
    if (sortBy === 'hospital') {
      sortDirection = this.state.currentHospitalSortDirection;
    }
    var sortedData = this.sortData(filteredData, sortBy, sortDirection);
    this.setState({currentDataStore:sortedData})
  },
  handleAllFilterClick: function(){
    $('.active-filter').removeClass('active-filter');
    $('.all-filter').addClass('active-filter');
    var dataSet = this.state.originalData;
    var sortBy = this.state.currentlySortingBy;
    var sortDirection;
    if (sortBy === 'date') {
      sortDirection = this.state.currentDateSortDirection;
    }
    if (sortBy === 'hospital') {
      sortDirection = this.state.currentHospitalSortDirection;
    }
    var sortedData = this.sortData(dataSet, sortBy, sortDirection);
    this.setState({currentDataStore:sortedData})
  },
  getUpcomingInterviews: function(dataSet) {
    var interviews = dataSet.filter(function(interview){
      var dateTime = interview['date']+' '+interview['time'];
      return moment(dateTime, "MM-DD-YYYY HH:mm").isAfter(moment())
    })
    return interviews
  },
  getPastInterviews: function(dataSet){
    var interviews = dataSet.filter(function(interview){
      var dateTime = interview['date']+' '+interview['time'];
      return moment(dateTime, "MM-DD-YYYY HH:mm").isBefore(moment())
    })
    return interviews
  },
  sortData: function(dataSet, sortBy, sortDirection){
    var sortedData;
    if (sortBy == 'date') {
      sortedData = this.sortByDate(dataSet, sortDirection);
    }
    if (sortBy == 'hospital') {
      sortedData = this.sortByHospital(dataSet, sortDirection);
    }
    return sortedData
  },
  sortByDate: function(dataSet, sortDirection){
    if (sortDirection === 'asc') {
      $('.date-sort')
        .removeClass('asc')
        .addClass('desc');
      return _.orderBy(dataSet, ['date'], ['desc'])
    } else {
      $('.date-sort')
        .removeClass('desc')
        .addClass('asc')
      return _.orderBy(dataSet, ['date'], ['asc'])
    }
  },
  sortByHospital: function(dataSet, sortDirection){
    if (sortDirection === 'asc') {
      $('.hospital-sort')
        .removeClass('asc')
        .addClass('desc');
      return _.orderBy(dataSet, ['hospital'], ['desc'])
    } else {
      $('.hospital-sort')
        .removeClass('desc')
        .addClass('asc')
      return _.orderBy(dataSet, ['hospital'], ['asc'])
    }
  },
  render: function() {
    if (this.state.currentDataStore && this.state.currentDataStore.length > 0) {
      panels = this.getInterviewPanels(this.state.currentDataStore);
    } else {
      panels = <div className="panel panel-default empty-result"><div className="slideDown"><i className="fa fa-list fa-3x mar-b-20"></i></div><div className="slideUp"><h1>No Interviews To Show</h1></div></div>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <NewInterviewForm />
          </div>
        </div>

        <div className="pad-l-15 pad-b-20 sort-filter">
          <span className="button-group">
            <span className="pad-r-5">Order By:</span>
              <span>
                <span className="label label-info mar-r-5 date-sort active-sort" onClick={this.handleDateSortClick}>Date<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
                <span className="label label-info mar-r-5 hospital-sort"  onClick={this.handleHospitalSortClick}>Hospital<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
              </span>
            </span>
          <span>
            <span className="pad-r-5">Filter By:</span>
              <span>
                <span className="label label-defualt upcoming-filter active-filter mar-r-5" onClick={this.handleUpcomingFilterClick}>Upcoming Interviews</span>
                <span className="label label-defualt past-filter mar-r-5" onClick={this.handlePastFilterClick}>Past Interviews</span>
                <span className="label label-defualt all-filter mar-r-10" onClick={this.handleAllFilterClick}>All</span>
              </span>
          </span>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="row pad-x-15 slide-from-left">
              {panels}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
