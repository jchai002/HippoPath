var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var SearchDashBoard = React.createClass({
  getInitialState: function(){
    return {
      searchResultPanels: undefined,
      originalData:this.props.data || null,
      currentDataStore:this.props.data || null,
      userPosition: this.props.current_user_coords,
      resultsPerPage: 6,
      currentPage: null,
      hidingOwnInterviews: false,
      currentlySortingBy: 'distance',
      filters: [],
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
    return panels
  },
  render: function() {
    if (this.state.resultsToDisplay && this.state.resultsToDisplay.length > 0) {
      panels = this.setSearchResultPanels(this.state.resultsToDisplay);
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
              <span className="pad-r-5">Sort By:</span>
              <span>
              <span className="label label-info mar-r-5 distance-sort active-sort" onClick={this.activateDistanceSort}>Distance From Me</span>
              <span className="label label-info mar-r-5 created-at-sort"  onClick={this.toggleCreatedAtSort}>Most Recent<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
              <span className="label label-info mar-r-5 time-sort" onClick={this.toggleTimeSort}>Time<i className="fa fa-caret-down mar-l-5"></i><i className="fa fa-caret-up mar-l-5"></i></span>
              </span>
            </span>
            <span>
              <span className="label label-defualt hide-own button-group">Hide My Own Interviews
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
        this.setState({
          searched: true,
          originalData:results
          },function(){
          this.state.originalData.map((interviewObject) => {
            this.setDistance(interviewObject,true)
          })
          var filteredData = this.filterData(this.state.originalData, this.state.filters);
          var sortedData = this.sortData(filteredData, this.state.currentlySortingBy);
          this.setState({
            currentDataStore:sortedData
          },function(){
            this.handleDataDisplay();
          })
        })
      },
      handleDataDisplay: function() {
        if (Object.size(this.state.currentDataStore) > this.state.resultsPerPage) {
          this.displayPaginateResults(this.state.currentDataStore,Object.size(this.state.currentDataStore),this.state.resultsPerPage);
        } else {
          this.setState({resultsToDisplay:this.state.currentDataStore})
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
        console.log(dataSet)
        if (sortDirection === 'asc') {
          return _.orderBy(dataSet, ['created-at'], ['asc'])
        } else {
          return _.orderBy(dataSet, ['created-at'], ['desc'])
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
        this.setState({currentlySortingBy:'time'})
        var dataSet = this.state.currentDataStore;
        var sortedData;
        if (this.state.currentTimeSortDirection === 'asc') {
          sortedData = this.sortByTime(dataSet,'desc')
          this.setState({
            currentDataStore: sortedData,
            currentTimeSortDirection:'desc'
          }, function(){
            this.handleDataDisplay();
          });
        } else {
          sortedData = this.sortByTime(dataSet,'asc')
          this.setState({
            currentDataStore: sortedData,
            currentTimeSortDirection:'asc'
          }, function(){
            this.handleDataDisplay();
          });
        }
      },
      toggleCreatedAtSort: function() {
        $('.active-sort').removeClass('active-sort');
        $('.created-at-sort').addClass('active-sort');
        this.setState({currentlySortingBy:'created_at'})
        var dataSet = this.state.currentDataStore;
        var sortedData;
        if (this.state.currentCreatedAtSortDirection === 'asc') {
          sortedData = this.sortByCreatedAt(dataSet,'desc')
          this.setState({
            currentDataStore: sortedData,
            currentCreatedAtSortDirection:'desc'
          }, function(){
            this.handleDataDisplay();
          });
        } else {
          sortedData = this.sortByCreatedAt(dataSet,'asc')
          this.setState({
            currentDataStore: sortedData,
            currentCreatedAtSortDirection:'asc'
          }, function(){
            this.handleDataDisplay();
          });
        }
      },
      activateDistanceSort: function(){
        $('.active-sort').removeClass('active-sort');
        $('.direction-sort').addClass('active-sort');
        var dataSet = this.state.currentDataStore;
        sortedData = this.sortByDistance(dataSet);
        this.setState({
          currentlySortingBy:'direction',
          currentDataStore: sortedData
        }, function(){
          this.handleDataDisplay();
        });
      },
      filterBySchool: function(dataSet){
        var component = this;
        var interviews = dataSet.filter(function(interview){
          return interview['school'].toLowerCase() == component.props.current_user_school.toLowerCase()
        })
        return interviews
      },
      filterBySpecialty: function(dataSet){
        var component = this;
        var interviews = dataSet.filter(function(interview){
          return interview['specialty'].toLowerCase() === component.props.current_user_specialty.toLowerCase()
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
      filterData: function(dataSet, filters){
        if (filters.length) {
          var component = this;
          var counter = 0;
          var filteredResult;
          function recursiveFilter(dataToFilter) {
            if (counter === filters.length) {
              filteredResult = dataToFilter
              return
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
          recursiveFilter(dataSet);
          return filteredResult
        } else {
          return dataSet
        }
      },
      styleSortDirectionButtons: function(){
        switch (this.state.currentlySortingBy) {
          case 'time':
            if (this.state.currentTimeSortDirection === 'asc') {
              $('.time-sort').removeClass('desc').addClass('asc')
            } else {
              $('.time-sort').removeClass('asc').addClass('desc')
            }
          break;
          case 'created_at':
            if (this.state.currentCreatedAtSortDirection === 'asc') {
              $('.created-at-sort').removeClass('desc').addClass('asc')
            } else {
              $('.created-at-sort').removeClass('asc').addClass('desc')
            }
          break;
        }
      },
      componentDidUpdate: function(){
        this.styleSortDirectionButtons();
      }
    });

    Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };
