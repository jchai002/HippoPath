var SavedDashBoard = React.createClass({
  getInitialState: function(){
    return {
      data:this.props.data || null,
      userPosition: this.props.current_user_coords
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
      component.setState({
        userPosition: [position.coords.latitude,position.coords.longitude]
      })
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
      return Number((Math.round(d * 10) / 10).toFixed(1));
    } else {
      return 99999
    }
  },
  componentWillMount: function(){
    var setDistance = this.setDistance;
    this.props.data.forEach((interviewObject) => {
      interviewObject['distance'] = setDistance(interviewObject,true);
    });
  },
  componentDidMount: function(){
    if (!this.state.userPosition || !this.arrayNotBlank(this.state.userPosition)){
      this.setBrowserCoords();
    }
  },
  handleRemove: function(deletedItemId) {
    var interviewsToKeep = this.state.data.filter(function(interivew){
      return interivew['id'] != deletedItemId
    })
    this.setState({data:interviewsToKeep})
  },
  render: function(){
    var handleRemove = this.handleRemove;
    var token = this.props.token;
    var currentUserId = this.props.current_user_id;
    var currentUserPosition = this.state.userPosition;
    var setDistance=this.setDistance;
    var panels = this.state.data.map(function(interviewInfo){
      var bodyContent = {};
      bodyContent['date'] = interviewInfo['date'] || 'unknown';
      bodyContent['time'] = interviewInfo['time'] || 'unknown';
      bodyContent['interviewee'] = {
        'name':interviewInfo['name'] || 'unknown',
        'gender':interviewInfo['gender'] || 'unknown',
        'school':interviewInfo['school'] || 'unknown',
        'specialty': interviewInfo['specialty'] || 'unknown',
        'avatar':  interviewInfo['avatar'] || '',
        'distance': interviewInfo['distance']
      }
      return <InfoPanel
        key={interviewInfo.id}
        handleRemove={handleRemove}
        layoutType='saved'
        interviewInfo={interviewInfo}
        bodyContent={bodyContent}
        wrapperClass="col-sm-12 col-md-6 col-lg-4 slideFromLeft saved-interviews"
        flexBoxClass="panel-flex-container"
        token={token}
        currentUserId={currentUserId}
        />
    })
    var display;
    if (panels && panels.length > 0) {
      display = panels;
    } else {
      display = <div className="panel panel-default empty-result"><div className="slideDown"><i className="fa fa-save fa-3x mar-b-20"></i></div><div className="slideUp"><h1>No Saved Interviews</h1></div></div>
    }
    console.log(panels)
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 mar-t-30">
            {display}
          </div>
        </div>
      </div>
    )
  }
});
