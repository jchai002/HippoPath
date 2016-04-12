var InterviewDashBoard = React.createClass({
  getInitialState: function(){
    return ({
      interviewPanels:[],
      originalData:undefined,
      currentDataStore:undefined,
      currentlySortingBy: 'date',
      currentlyFilteringBy: 'all',
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
            var filteredData = this.handleFilter(this.state.originalData, this.state.currentlyFilteringBy);
            var sortedData = this.handleSort(filteredData);
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
  toggleHospitalSort: function() {
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
  toggleFilterByUpcoming: function(){
    $('.active-filter').removeClass('active-filter');
    $('.upcoming-filter').addClass('active-filter');
    var filteredData = this.getUpcomingInterviews(this.state.originalData);
    var sortedData = this.handleSort(filteredData);
    this.setState({currentDataStore:sortedData})
  },
  toggleFilterByPast: function(){
    $('.active-filter').removeClass('active-filter');
    $('.past-filter').addClass('active-filter');
    var filteredData = this.getPastInterviews(this.state.originalData);
    var sortedData = this.handleSort(filteredData);
    this.setState({currentDataStore:sortedData})
  },
  toggleFilterByAll: function(){
    $('.active-filter').removeClass('active-filter');
    $('.all-filter').addClass('active-filter');
    this.setState({currentlyFilteringBy:'all'})
    var sortedData = this.handleSort(this.state.originalData);
    this.setState({currentDataStore:sortedData})
  },
  getUpcomingInterviews: function(dataSet) {
    this.setState({currentlyFilteringBy:'upcoming'})
    var interviews = dataSet.filter(function(interview){
      var dateTime = interview['date']+' '+interview['time'];
      return moment(dateTime, "MM-DD-YYYY HH:mm").isAfter(moment())
    })
    return interviews
  },
  getPastInterviews: function(dataSet){
    this.setState({currentlyFilteringBy:'past'})
    var interviews = dataSet.filter(function(interview){
      var dateTime = interview['date']+' '+interview['time'];
      return moment(dateTime, "MM-DD-YYYY HH:mm").isBefore(moment())
    })
    return interviews
  },
  handleSort: function(dataSet){
    var sortedData;
    if (this.state.currentlySortingBy == 'date') {
      sortedData = this.sortByDate(dataSet, this.state.currentDateSortDirection);
    }
    if (this.state.currentlySortingBy == 'hospital') {
      sortedData = this.sortByHospital(dataSet, this.state.currentHospitalSortDirection);
    }
    return sortedData
  },
  handleFilter: function(dataSet, filterBy){
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
    this.setState({currentlySortingBy:'date'})
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
    this.setState({currentlySortingBy:'hospital'})
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
                <span className="label label-info mar-r-5 date-sort active-sort" onClick={this.toggleDateSort}>Date<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
                <span className="label label-info mar-r-5 hospital-sort"  onClick={this.toggleHospitalSort}>Hospital<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
              </span>
            </span>
          <span>
            <span className="pad-r-5">Filter By:</span>
              <span>
                <span className="label label-defualt all-filter mar-r-10 active-filter" onClick={this.toggleFilterByAll}>All</span>
                <span className="label label-defualt upcoming-filter mar-r-5" onClick={this.toggleFilterByUpcoming}>Upcoming Interviews</span>
                <span className="label label-defualt past-filter mar-r-5" onClick={this.toggleFilterByPast}>Past Interviews</span>
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
