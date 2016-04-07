var SearchDashBoard = React.createClass({
  getInitialState: function(){
    return {
      searchResultPanels: undefined,
      searchResults:undefined,
      searched: false,
      userPosition: this.props.user_coords
    }
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
      if (!component.state.userPosition){
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
      console.log(message)
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
        'distance': calculateDistance(currentUserPosition, interviewInfo['location'], true) || 'unknown',
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
    this.setState({searchResultPanels:panels})
  },
  render: function() {
    var panels;
    if (!this.state.searchResultPanels) {
      panels = <div className="panel panel-default empty-result"><h1>Search For Carpool</h1></div>;
    } else {
      if (this.state.searchResultPanels.length) {
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
            <div className="col-sm-12 search-results">
              {panels}
            </div>
          </div>
        </div>
      );
    },
    handleSearch: function(results){
      this.setSearchResultPanels(results);
      this.setState({
        searchResults:results,
        searched: true
      })
    },
    componentDidMount: function(){
      this.setBrowserCoords()
    },
    componentDidUpdate: function(){
      // var searchResults = this.state.searchResults
      // var newArr = _.orderBy(searchResults, ['time'], ['asc']);
      // console.log(newArr)
      console.log(this.state)
    },
    calculateDistance: function(coords1, coords2, isMiles){
      if (coords1 && coords2) {
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
        return (Math.round(d * 10) / 10).toFixed(1);
      } else {
        return null
      }
    }
  });
