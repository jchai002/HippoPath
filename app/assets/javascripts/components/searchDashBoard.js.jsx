var SearchDashBoard = React.createClass({
  getInitialState: function(){
    return {
      searchResultPanels: undefined,
      originalResults:undefined,
      modifiedResults:undefined,
      searched: false,
      userPosition: this.props.user_coords,
      resultsPerPage: 6,
      currentPage: 1,
      hidingOwnResults: false,
      currentSortingBy: 'distance'
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
    if (!this.state.searched) {
      panels = <div className="panel panel-default empty-result"><h1>Search For Carpool</h1></div>;
      } else {
        if (this.state.searchResultPanels) {
          panels = this.state.searchResultPanels;
        } else {
          panels = <div className="panel panel-default empty-result"><h1>0 Search Results</h1></div>;
          }
        }
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <InterviewSearchForm handleSearch={this.handleSearch}/>
              </div>
            </div>
            <div className="row">
              <div className="pad-l-30 pad-b-20 search-filters">

                <span className="filter-group">
                <span className="pad-r-5">Order By:</span>
                <span>
                <span className="label label-info mar-r-5 distance active" onClick={this.orderByDistance}>Distance From Me</span>
                <span className="label label-info mar-r-5 most-recent"  onClick={this.orderByPostDate}>Most Recent</span>
                </span>
                </span>
                <span>
                  <span className="label label-defualt hide-own filter-group" onClick={this.toggleHideOwnInterviews}>Hide My Own Interviews
                  </span>
                </span>
              </div>
              <div className="col-sm-12 search-results">
                {panels}
              </div>
            </div>
          </div>
        );
      },
      handleSearch: function(results){
        $('.pagination-flex-container').html('')
        $('.hide-own')
          .removeClass('hide-own-active')
          .text('Hide My Own Interviews')
        component = this;
        this.setState({
          searched: true,
          hidingOwnResults: false,
          originalResults:results,
          currentPage: 1
        },function(){
          component.state.originalResults.map((interviewObject) => {
          component.setDistance(interviewObject,true)
          })
          component.setState({
            modifiedResults:component.state.originalResults
          },function(){
            console.log('hiding results?', component.state.hidingOwnResults)
            if (component.state.hidingOwnResults) {
              component.toggleHideOwnInterviews();
            } else {
              component.sortThenDisplay();
            }
          })
        })
      },
      handleResultsDisplay: function() {
        if (Object.size(this.state.modifiedResults) > this.state.resultsPerPage) {
          this.displayPaginatedResults(this.state.modifiedResults, Object.size(this.state.modifiedResults),this.state.resultsPerPage);
        } else{
          this.setSearchResultPanels(this.state.modifiedResults);
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
      orderByDistance: function() {
        $('.active').removeClass('active');
        $('.distance').addClass('active');
        var resultSet = this.state.modifiedResults;
        this.setState({
          modifiedResults: _.sortBy(resultSet, ['distance']),
          currentSortingBy: 'distance'
        },function(){
          this.handleResultsDisplay();
        })
      },
      orderByPostDate: function() {
        $('.active').removeClass('active');
        $('.most-recent').addClass('active');
        var resultSet = this.state.modifiedResults;
        this.setState({
          modifiedResults: _.orderBy(resultSet, ['created_at'], ['desc']),
          currentSortingBy: 'created_at'
        },function(){
          this.handleResultsDisplay();
        })
      },
      sortThenDisplay: function(){
        console.log(this.state)
        if (this.state.currentSortingBy == 'distance') {
          this.orderByDistance();
        }
        if (this.state.currentSortingBy == 'created_at') {
          this.orderByPostDate();
        }
      },
      toggleHideOwnInterviews: function() {
        component = this;
        $('.hide-own')
          .toggleClass('hide-own-active')
          .text(component.state.hidingOwnResults ? 'Hide My Own Interviews' : 'Show My Own Interviews');
        function isNotOwnInterview(interviewObject) {
          return interviewObject['poster_id'] != component.props.current_user_id
        }
        var completeResults = component.state.originalResults;
        var resultsWithHiddenInterviews = null;
        if (completeResults) {
          resultsWithHiddenInterviews = completeResults.filter(isNotOwnInterview);
        }
        if (!component.state.hidingOwnResults) {
          component.setState({
            modifiedResults:resultsWithHiddenInterviews,
            hidingOwnResults:true
          }, function(){
            component.sortThenDisplay();
          })
        } else {
          component.setState({
            modifiedResults:completeResults,
            hidingOwnResults:false
          }, function(){
            component.sortThenDisplay();
          })
        }
      },
    });

    Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };
