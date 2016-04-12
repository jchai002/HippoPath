var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var SearchDashBoard = React.createClass({
  getInitialState: function(){
    return {
      searchResultPanels: undefined,
      originalResults:this.props.data || null,
      currentDataStore:this.props.data || null,
      userPosition: this.props.current_user_coords,
      resultsPerPage: 6,
      currentPage: 1,
      hidingOwnInterviews: false,
      currentlySortingBy: 'distance',
      originalData:undefined,
      currentDataStore:undefined,
      currentlySortingBy: 'date',
      filters: [],
      currentTimeSortDirection: 'asc',
      currentCreatedAtSortDirection: 'asc'
    }
  },
  componentWillMount: function(){
    console.log(this.props)
    //results come from a html request, auto hide own results
    if (this.state.currentDataStore) {
      this.toggleDisplayOwnInterviews();
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
        console.log('finished setting location', component.state.userPosition)
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
      console.log(message)
    }
  },
  componentDidMount: function(){
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
  },
  setSearchResultPanels: function(data){
    var handleUpdate = this.handleUpdate;
    var token = this.props.token;
    var currentUserId = this.props.current_user_id;
    var calculateDistance = this.calculateDistance;
    var currentUserPosition = this.state.userPosition;
    var panels = data.map(function(interviewInfo){
      var bodyContent = {};
      bodyContent['date'] = interviewInfo['date'] || 'unknown';
      bodyContent['time'] = interviewInfo['time'] || 'unknown';
      bodyContent['interviewee'] = {
        'name':interviewInfo['name'] || 'unknown',
        'gender':interviewInfo['gender'] || 'unknown',
        'school':interviewInfo['school'] || 'unknown',
        'specialty': interviewInfo['specialty'] || 'unknown',
        'avatar':  interviewInfo['avatar'] || '',
        'distance': interviewInfo['distance'],
        'cssClass': 'panel-flex-item-large'
      }
      return <InfoPanel
        url="/interviews"
        key={interviewInfo.id}
        layoutType='search'
        interviewInfo={interviewInfo}
        bodyContent={bodyContent}
        wrapperClass="col-sm-12 col-md-6 col-lg-4"
        flexBoxClass="panel-flex-container-2"
        token={token}
        currentUserId={currentUserId}
        />
    })

    if (panels.length > 0) {
      this.setState({searchResultPanels:panels})
    } else {
      this.setState({searchResultPanels:null})
    }
  },
  render: function() {
    var panels;
    if (this.state.searchResultPanels) {
      panels = this.state.searchResultPanels;
    } else {
      panels = <div className="panel panel-default empty-result"><div className="slideDown"><i className="fa fa-battery-empty fa-3x mar-b-20"></i></div><div className="slideUp"><h1>No Results Found</h1></div></div>;
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
              <span className="pad-r-5">Order By:</span>
              <span>
              <span className="label label-info mar-r-5 distance-sort active" onClick={this.sortByDistance}>Distance From Me</span>
              <span className="label label-info mar-r-5 most-recent-sort"  onClick={this.sortByCreatedAt}>Most Recent</span>
              </span>
            </span>
            <span>
              <span className="label label-defualt hide-own button-group" onClick={this.toggleDisplayOwnInterviews}>Hide My Own Interviews
              </span>
            </span>
          </div>
          <div className="col-sm-12 search-results">
            <ReactCSSTransitionGroup transitionName="slide-in" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
              {panels}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
      },
      handleSearch: function(results){
        $('.pagination-flex-container').html('')
        component = this;
        this.setState({
          searched: true,
          hidingOwnInterviews: false,
          originalResults:results,
          currentPage: 1
        },function(){
          component.state.originalResults.map((interviewObject) => {
          component.setDistance(interviewObject,true)
          })
          component.setState({
            currentDataStore:component.state.originalResults
          },function(){
            component.sortThenDisplay();
          })
        })
      },
      handleResultsDisplay: function() {
        if (Object.size(this.state.currentDataStore) > this.state.resultsPerPage) {
          this.displayPaginatedResults(this.state.currentDataStore, Object.size(this.state.currentDataStore),this.state.resultsPerPage);
        } else{
          this.setSearchResultPanels(this.state.currentDataStore);
        }
      },
      displayPaginatedResults: function(resultSet, totalResultsCount, resultsPerPage) {
        $('.pagination-flex-container').html('<ul id="search-pagination" class="pagination-sm"></ul>');
        component = this;
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
            component.setState({currentPage: page});
            if (resultSet) {
              var groupSize = resultsPerPage;
              var groups = _.map(resultSet, function(item, index){
                return index % groupSize === 0 ? resultSet.slice(index, index + groupSize) : null;
              })
              .filter(function(item){
                return item;
              });
              var resultsToShow = groups[page-1]
              component.setSearchResultPanels(resultsToShow);
            }
          }
        });
      },
      sortByDistance: function(dataSet) {
        this.setState({currentlySortingBy:'distance'})
        return _.sortBy(dataSet, ['distance'])
      },
      sortByCreatedAt: function(dataSet, sortDirection) {
        this.setState({currentlySortingBy:'created_at'})
        if (sortDirection === 'asc') {
          $('.created-at-sort')
            .removeClass('asc')
            .addClass('desc');
          return _.orderBy(dataSet, ['created-at'], ['desc'])
        } else {
          $('.created-at-sort')
            .removeClass('desc')
            .addClass('asc')
          return _.orderBy(dataSet, ['created-at'], ['asc'])
        }
      },
      sortByTime: function(dataSet, sortDirection){
        this.setState({currentlySortingBy:'time'})
        if (sortDirection === 'asc') {
          $('.time-sort')
            .removeClass('asc')
            .addClass('desc');
          return _.orderBy(dataSet, ['time'], ['desc'])
        } else {
          $('.time-sort')
            .removeClass('desc')
            .addClass('asc')
          return _.orderBy(dataSet, ['time'], ['asc'])
        }
      },
      handleSort: function(dataSet){
        var sortedData;
        switch(this.state.currentlySortingBy) {
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
      filterBySchool: function(dataSet){
        var interviews = dataSet.filter(function(interview){
          return interview['school'] == this.props.current_user_school
        })
        return interviews
      },
      filterBySpecialty: function(dataSet){
        var interviews = dataSet.filter(function(interview){
          return interview['specialty'] == this.props.current_user_spectialty
        })
        return interviews
      },
      handleFilter: function(dataSet, filters){
        var filteredArray = []
        filters.forEach(function(filterBy){
          switch(filterBy) {
          case 'school':
              filteredData = this.filterBySchool(dataSet);
              break;
          case 'specialty':
              filteredData = this.filterBySpecialty(dataSet);
              break;
          }
          filteredArray.push(filteredData);
        })
      },
      sortThenDisplay: function(){
        if (this.state.currentlySortingBy == 'distance') {
          this.sortByDistance();
        }
        if (this.state.currentlySortingBy == 'created_at') {
          this.sortByCreatedAt();
        }
      },
      toggleDisplayOwnInterviews: function() {
        component = this;
        function isNotOwnInterview(interviewObject) {
          return interviewObject['poster_id'] != component.props.current_user_id
        }
        var completeResults = component.state.originalResults;
        var resultsWithHiddenInterviews = null;
        if (completeResults) {
          resultsWithHiddenInterviews = completeResults.filter(isNotOwnInterview);
        }
        if (!component.state.hidingOwnInterviews) {
          component.setState({
            currentDataStore:resultsWithHiddenInterviews,
            hidingOwnInterviews:true
          }, function(){
            component.sortThenDisplay();
          })
        } else {
          component.setState({
            currentDataStore:completeResults,
            hidingOwnInterviews:false
          }, function(){
            component.sortThenDisplay();
          })
        }
      },
      toggleHideOwnInterviewsButton: function(){
        if (this.state.hidingOwnInterviews) {
          $('.hide-own')
            .addClass('hide-own-active')
            .text('Show My Own Interviews');
        } else {
          $('.hide-own')
            .removeClass('hide-own-active')
            .text('Hide My Own Interviews');
        }
      },
      componentDidUpdate: function(){
        this.toggleHideOwnInterviewsButton();
      }
    });

    Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };
