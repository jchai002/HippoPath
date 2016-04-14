var InterviewDashBoard = React.createClass({
  getInitialState: function(){
    return ({
      interviewPanels:[],
      originalData:undefined,
      currentDataStore:undefined,
      currentlySortingBy: 'date',
      currentlyDisplaying: 'all',
      currentDateSortDirection: 'asc',
      currentHospitalSortDirection: 'asc'
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
            var filteredData = this.switchDataDisplay(this.state.originalData, this.state.currentlyDisplaying);
            var sortedData = this.sortData(filteredData, this.state.currentlySortingBy);
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
        wrapperClass="col-sm-12 col-md-6 col-lg-4 slideFromLeft"
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
  componentDidUpdate: function() {
    this.styleSortButtons();
    this.styleDisplayButtons();
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
  toggleDateSort: function() {
    this.setState({currentlySortingBy:'date'})
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
  toggleHospitalSort: function() {
    this.setState({currentlySortingBy:'hospital'})
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
  displayUpcoming: function(){
    $('.active-filter').removeClass('active-filter');
    $('.upcoming-filter').addClass('active-filter');
    var filteredData = this.getUpcomingInterviews(this.state.originalData);
    var sortedData = this.sortData(filteredData, this.state.currentlySortingBy);
    this.setState({currentDataStore:sortedData})
  },
  displayPast: function(){
    $('.active-filter').removeClass('active-filter');
    $('.past-filter').addClass('active-filter');
    var filteredData = this.getPastInterviews(this.state.originalData);
    var sortedData = this.sortData(filteredData, this.state.currentlySortingBy);
    this.setState({currentDataStore:sortedData})
  },
  displayAll: function(){
    $('.active-filter').removeClass('active-filter');
    $('.all-filter').addClass('active-filter');
    this.setState({currentlyDisplaying:'all'})
    var sortedData = this.sortData(this.state.originalData, this.state.currentlySortingBy);
    this.setState({currentDataStore:sortedData})
  },
  getUpcomingInterviews: function(dataSet) {
    this.setState({currentlyDisplaying:'upcoming'})
    var interviews = dataSet.filter(function(interview){
      var dateTime = interview['date']+' '+interview['time'];
      return moment(dateTime, "MM-DD-YYYY HH:mm").isAfter(moment())
    })
    return interviews
  },
  getPastInterviews: function(dataSet){
    this.setState({currentlyDisplaying:'past'})
    var interviews = dataSet.filter(function(interview){
      var dateTime = interview['date']+' '+interview['time'];
      return moment(dateTime, "MM-DD-YYYY HH:mm").isBefore(moment())
    })
    return interviews
  },
  sortData: function(dataSet, sortBy){
    var sortedData;
    if (sortBy == 'date') {
      sortedData = this.sortByDate(dataSet, this.state.currentDateSortDirection);
    }
    if (sortBy == 'hospital') {
      sortedData = this.sortByHospital(dataSet, this.state.currentHospitalSortDirection);
    }
    return sortedData
  },
  switchDataDisplay: function(dataSet, filterBy){
    var filteredData;
    switch(filterBy) {
    case 'upcoming':
        filteredData = this.getUpcomingInterviews(dataSet);
        break;
    case 'past':
        filteredData = this.getPastInterviews(dataSet);
        break;
    case 'all':
        filteredData = this.state.originalData;
        break;
    }
    return filteredData
  },
  sortByDate: function(dataSet, sortDirection){
    if (sortDirection === 'asc') {
      return _.orderBy(dataSet, ['date'], ['asc'])
    } else {
      return _.orderBy(dataSet, ['date'], ['desc'])
    }
  },
  sortByHospital: function(dataSet, sortDirection){
    if (sortDirection === 'asc') {
      return _.orderBy(dataSet, ['hospital'], ['asc'])
    } else {
      return _.orderBy(dataSet, ['hospital'], ['desc'])
    }
  },
  styleSortButtons: function(){
    $('.active-sort').removeClass('active-sort')
    switch (this.state.currentlySortingBy) {
      case 'date':
        $('.date-sort').addClass('active-sort');
        if (this.state.currentDateSortDirection === 'asc') {
          $('.date-sort').removeClass('desc').addClass('asc')
        } else {
          $('.date-sort').removeClass('asc').addClass('desc')
        }
      break;
      case 'hospital':
        $('.hospital-sort').addClass('active-sort');
        if (this.state.currentHospitalSortDirection === 'asc') {
          $('.hospital-sort').removeClass('desc').addClass('asc')
        } else {
          $('.hospital-sort').removeClass('asc').addClass('desc')
        }
      break;
    }
  },
  styleDisplayButtons: function(){
    $('.active-filter').removeClass('active-filter')
    switch (this.state.currentlyDisplaying) {
      case 'all':
        $('.all-filter').addClass('active-filter');
      break;
      case 'upcoming':
        $('.upcoming-filter').addClass('active-filter');
      break;
      case 'past':
        $('.past-filter').addClass('active-filter');
      break;
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
            <span className="pad-r-5">Sort By:</span>
              <span>
                <span className="label label-buttons mar-r-5 date-sort asc active-sort" onClick={this.toggleDateSort}>Date<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
                <span className="label label-buttons mar-r-5 hospital-sort"  onClick={this.toggleHospitalSort}>Hospital<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
              </span>
            </span>
          <span className="button-group">
            <span className="pad-r-5">Display:</span>
              <span>
                <span className="label label-buttons all-filter mar-r-10 active-filter" onClick={this.displayAll}>All</span>
                <span className="label label-buttons upcoming-filter mar-r-5" onClick={this.displayUpcoming}>Upcoming Interviews</span>
                <span className="label label-buttons past-filter mar-r-5" onClick={this.displayPast}>Past Interviews</span>
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
