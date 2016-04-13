var SearchDashBoard = React.createClass({
  getInitialState: function(){
    return {
      searchResultPanels: undefined,
      originalData:this.props.data || null,
      currentDataStore:this.props.data || null,
      userPosition: this.props.current_user_coords,
      resultsPerPage: 10,
      currentPage: null,
      hidingOwnInterviews: false,
      currentlySortingBy: 'distance',
      filters: ['hide-own'],
      currentTimeSortDirection: 'asc',
      currentCreatedAtSortDirection: 'asc'
    }
  },
  arrayNotBlank: function(array) {
    return array[0] && array[1]
  },
  setBrowserCoords: function() {
    component = this;
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 120000
      }
    );
    function onSuccess(position) {
      if (!component.state.userPosition || !component.arrayNotBlank(component.state.userPosition)){
        component.setState({
          userPosition: [position.coords.latitude,position.coords.longitude]
        })
      }
    }
    function onError(err) {
      var message;
      switch (err.code) {
        case 0:
        message = 'Unknown error: ' + err.message;
        break;
        case 1:
        message = 'You denied permission to retrieve a position.';
        break;
        case 2:
        message = 'The browser was unable to determine a position: ' + error.message;
        break;
        case 3:
        message = 'The browser timed out before retrieving the position.';
        break;
      }
    }
  },
  componentDidMount: function(){
    if (this.state.originalData) {
      var interviews = this.state.originalData.map((interviewObject) => {
        return this.setDistance(interviewObject,true)
      });
    }
    var processedData = this.processData();
    this.setCurrentDataStore(processedData);
    this.setBrowserCoords();
  },
  setDistance: function(interviewObject, isMiles){
    var coords1 = this.state.userPosition;
    var coords2 = interviewObject['location'];
    if (coords1 && this.arrayNotBlank(coords1) && coords2 && this.arrayNotBlank(coords2)) {
      function toRad(x) {
        return x * Math.PI / 180;
      }
      var lat1 = coords1[0];
      var long1 = coords1[1];
      var lat2 = coords2[0];
      var long2 = coords2[1];
      var R = 6371; // km
      var x1 = lat2 - lat1;
      var dLat = toRad(x1);
      var x2 = long2 - long1;
      var dLong = toRad(x2)
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      if(isMiles) d /= 1.60934;
      interviewObject['distance'] = Number((Math.round(d * 10) / 10).toFixed(1));
    } else {
      interviewObject['distance'] = 99999
    }
    return interviewObject
  },
  processData: function() {
    var filteredData = this.filterData(this.state.originalData, this.state.filters);
    return this.sortData(filteredData, this.state.currentlySortingBy);
  },
  handleSearch: function(results){
    this.setState({
      searched: true,
      originalData:results
    },function(){
      var interviews = this.state.originalData.map((interviewObject) => {
        return this.setDistance(interviewObject,true)
      });
      var processedData = this.processData();
      this.setCurrentDataStore(processedData)
    })
  },
  handleDataDisplay: function(dataSet) {
    if (Object.size(dataSet) > this.state.resultsPerPage) {
      this.displayPaginateResults(dataSet,Object.size(dataSet),this.state.resultsPerPage);
    } else {
      $('.pagination-flex-container').html('')
      this.setState({resultsToDisplay:dataSet})
    }
  },
  displayPaginateResults: function(resultSet, totalResultsCount, resultsPerPage) {
    $('.pagination-flex-container').html('<ul id="search-pagination" class="pagination-sm"></ul>');
    component = this;
    var dataToReturn;
    var maxPages = Math.ceil(totalResultsCount/resultsPerPage);
    var visible;
    if (maxPages > 5) {
      visible = 5;
    } else {
      visible = maxPages
    }
    $('#search-pagination').twbsPagination({
      totalPages: maxPages,
      visiblePages: visible,
      onPageClick: function (event, page) {
        $('#page-content').text('Page ' + page);
        component.setState({currentPage:page})
        if (resultSet) {
          var groupSize = resultsPerPage;
          var groups = _.map(resultSet, function(item, index){
            return index % groupSize === 0 ? resultSet.slice(index, index + groupSize) : null;
          })
          .filter(function(item){
            return item;
          });
          component.setState({resultsToDisplay:groups[page-1]})
        }
      }
    });
  },
  sortByDistance: function(dataSet) {
    return _.sortBy(dataSet, ['distance'])
  },
  sortByCreatedAt: function(dataSet, sortDirection) {
    if (sortDirection === 'asc') {
      return _.orderBy(dataSet, ['created_at'], ['asc'])
    } else {
      return _.orderBy(dataSet, ['created_at'], ['desc'])
    }
  },
  sortByTime: function(dataSet, sortDirection){
    dataSet.forEach(function(data){
      data['formattedTime'] = moment(data['time'],["h:mm A"]).format("HH:mm");
    })
    if (sortDirection === 'asc') {
      return _.orderBy(dataSet, ['formattedTime'], ['asc'])
    } else {
      return _.orderBy(dataSet, ['formattedTime'], ['desc'])
    }
  },
  sortData: function(dataSet, sortBy){
    var sortedData;
    switch(sortBy) {
      case 'distance':
      sortedData = this.sortByDistance(dataSet);
      break;
      case 'created_at':
      sortedData = this.sortByCreatedAt(dataSet, this.state.currentCreatedAtSortDirection);
      break;
      case 'time':
      sortedData = this.sortByTime(dataSet, this.state.currentTimeSortDirection);
      break;
    }
    return sortedData
  },
  toggleTimeSort: function() {
    $('.active-sort').removeClass('active-sort');
    $('.time-sort').addClass('active-sort');
    this.setState({currentlySortingBy:'time'});
    var dataSet = this.state.currentDataStore;
    var sortedData;
    if (this.state.currentTimeSortDirection === 'asc') {
      sortedData = this.sortByTime(dataSet,'desc');
      this.setState({currentTimeSortDirection:'desc'});
      this.setCurrentDataStore(sortedData);
    } else {
      sortedData = this.sortByTime(dataSet,'asc');
      this.setState({currentTimeSortDirection:'asc'});
      this.setCurrentDataStore(sortedData);
    }
  },
  toggleCreatedAtSort: function() {
    this.setState({currentlySortingBy:'created_at'})
    var dataSet = this.state.currentDataStore;
    var sortedData;
    if (this.state.currentCreatedAtSortDirection === 'asc') {
      this.setState({currentCreatedAtSortDirection:'desc'})
      sortedData = this.sortByCreatedAt(dataSet,'desc');
      this.setCurrentDataStore(sortedData);
    } else {
      this.setState({currentCreatedAtSortDirection:'asc'});
      sortedData = this.sortByCreatedAt(dataSet,'asc');
      this.setCurrentDataStore(sortedData);
    }
  },
  activateDistanceSort: function(){
    $('.active-sort').removeClass('active-sort');
    $('.direction-sort').addClass('active-sort');
    var dataSet = this.state.currentDataStore;
    this.setState({currentlySortingBy:'distance'});
    sortedData = this.sortByDistance(dataSet);
    this.setCurrentDataStore(sortedData);
  },
  filterBySchool: function(dataSet){
    var component = this;
    var interviews = dataSet.filter(function(interview){
      if (interview['school'] && component.props.current_user_school) {
        return interview['school'].toLowerCase() == component.props.current_user_school.toLowerCase()
      }
    })
    return interviews
  },
  filterBySpecialty: function(dataSet){
    var component = this;
    var interviews = dataSet.filter(function(interview){
      if (interview['specialty'] && component.props.current_user_specialty) {
        return interview['specialty'].toLowerCase() == component.props.current_user_specialty.toLowerCase()
      }
    })
    return interviews
  },
  filterOwnInterviews: function(dataSet) {
    var component = this;
    var interviews = dataSet.filter(function(interviewObject){
      return interviewObject['poster_id'] != component.props.current_user_id
    })
    return interviews
  },
  toggleFilterBySchool: function(){
    var currentFilters = this.state.filters;
    if (_.includes(currentFilters,'school')) {
      _.pull(currentFilters, 'school');
      this.setState({
        filters:currentFilters
      },function(){
        var processedData = this.processData();
        this.setCurrentDataStore(processedData);
      })
    } else {
      currentFilters.push('school');
      this.setState({
        filters:currentFilters
      },function(){
        var processedData = this.processData();
        this.setCurrentDataStore(processedData);
      })
    }
  },
  toggleFilterBySpecialty: function(){
    var currentFilters = this.state.filters;
    if (_.includes(currentFilters,'specialty')) {
      _.pull(currentFilters, 'specialty');
      this.setState({
        filters:currentFilters
      },function(){
        var processedData = this.processData();
        this.setCurrentDataStore(processedData);
      })
    } else {
      currentFilters.push('specialty');
      this.setState({
        filters:currentFilters
      },function(){
        var processedData = this.processData();
        this.setCurrentDataStore(processedData);
      })
    }
  },
  toggleFilterOwnInterviews: function(){
    var currentFilters = this.state.filters;
    if (_.includes(currentFilters,'hide-own')) {
      _.pull(currentFilters, 'hide-own');
      this.setState({
        filters:currentFilters
      },function(){
        var processedData = this.processData();
        this.setCurrentDataStore(processedData);
      })
    } else {
      currentFilters.push('hide-own');
      this.setState({
        filters:currentFilters
      },function(){
        var processedData = this.processData();
        this.setCurrentDataStore(processedData);
      })
    }
  },
  filterData: function(dataSet, filters){
    if (!dataSet) {
      var dataSet = [];
    }
    var component = this;
    var counter = 0;
    var filteredResult;
    function recursiveFilter(dataToFilter) {
      if (counter === filters.length) {
        filteredResult = dataToFilter
      } else {
        var filterBy = filters[counter];
        var filteredData;
        switch(filterBy) {
          case 'school':
          filteredData = component.filterBySchool(dataToFilter);
          break;
          case 'specialty':
          filteredData = component.filterBySpecialty(dataToFilter);
          break;
          case 'hide-own':
          filteredData = component.filterOwnInterviews(dataToFilter);
          break;
        }
        counter++
        recursiveFilter(filteredData);
      }
    }
    recursiveFilter(dataSet)
    return filteredResult
  },
  styleSortButtons: function(){
    $('.active-sort').removeClass('active-sort')
    switch (this.state.currentlySortingBy) {
      case 'time':
      $('.time-sort').addClass('active-sort');
      if (this.state.currentTimeSortDirection === 'asc') {
        $('.time-sort').removeClass('desc').addClass('asc')
      } else {
        $('.time-sort').removeClass('asc').addClass('desc')
      }
      break;
      case 'created_at':
      $('.created-at-sort').addClass('active-sort');
      if (this.state.currentCreatedAtSortDirection === 'asc') {
        $('.created-at-sort').removeClass('desc').addClass('asc')
      } else {
        $('.created-at-sort').removeClass('asc').addClass('desc')
      }
      break;
      case 'distance':
      $('.distance-sort').addClass('active-sort');
      break;
    }
  },
  styleFilterButtons: function(){
    $('.active-filter').removeClass('active-filter')
    this.state.filters.forEach(function(filterName){
      $('.'+filterName+'-filter').addClass('active-filter');
    })
  },
  componentDidUpdate: function(){
    this.styleSortButtons();
    this.styleFilterButtons();
  },
  setCurrentDataStore: function(dataSet){
    this.setState({
      currentDataStore:dataSet
    }, function(){
      this.handleDataDisplay(this.state.currentDataStore);
    })
  },
  render: function() {
    var display;
    if (this.state.resultsToDisplay && this.state.resultsToDisplay.length > 0) {
      display = <Table data={this.state.resultsToDisplay} currentUserId={this.props.current_user_id}/>
    } else {
      display = <div className="panel panel-default empty-result"><div className="slideDown"><i className="fa fa-battery-empty fa-3x mar-b-20"></i></div><div className="slideUp"><h1>No Results Found</h1></div></div>;
    }
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <InterviewSearchForm handleSearch={this.handleSearch}/>
            </div>
          </div>
          <div className="row">
            <div className="pad-l-30 pad-b-20 sort-filter">
              <span className="button-group">
                <span className="pad-r-5">Sort By:</span>
                <span>
                  <span className="label label-buttons mar-r-5 distance-sort active-sort" onClick={this.activateDistanceSort}>Closest To Me</span>
                  <span className="label label-buttons mar-r-5 created-at-sort"  onClick={this.toggleCreatedAtSort}>Most Recent<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
                  <span className="label label-buttons mar-r-5 time-sort" onClick={this.toggleTimeSort}>Time<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
                </span>
              </span>
              <span>
                <span className="pad-r-5">Filters:</span>
                <span>
                  <span className="label label-buttons school-filter mar-r-10" onClick={this.toggleFilterBySchool}>My School</span>
                  <span className="label label-buttons specialty-filter mar-r-5" onClick={this.toggleFilterBySpecialty}>My Specialty</span>
                  <span className="label label-buttons hide-own-filter mar-r-5" onClick={this.toggleFilterOwnInterviews}>Hide My Own Interviews</span>
                </span>
              </span>
            </div>
            <div className="col-sm-12">
              {display}
            </div>
          </div>
          <div className="row">
            <div className="pagination-flex-container"></div>
          </div>
        </div>
      );
    }
  });
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
