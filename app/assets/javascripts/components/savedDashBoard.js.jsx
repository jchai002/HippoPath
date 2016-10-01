var SavedDashBoard = React.createClass({
  getInitialState: function(){
    return {
      data:this.props.data || null
    }
  },
  arrayNotBlank: function(array) {
    return array[0] && array[1]
  },
  setDistance: function(interviewObject, isMiles){
    var coords1 = this.props.current_user_coords;
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
  handleRemove: function(deletedItemId) {
    var component = this;
    swal({
      title: "Remove This Interview From Saved?",
      text: "You will have to go find it again!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: "No, cancel it!",
      closeOnConfirm: true,
      closeOnCancel: false
    }, function(isConfirm) {
      if (isConfirm) {
        $.ajax({
          url: '/interviews/remove_from_saved/'+deletedItemId,
          type: 'DELETE',
          success: function() {
            var interviewsToKeep = component.state.data.filter(function(interivew){
              return interivew['id'] != deletedItemId
            })
            component.setState({data:interviewsToKeep})
          },
          error: function(xhr, status, err) {
            console.error( status, err.toString());
          }
        });
      } else {
        swal("Cancelled", "Your interivew is safe :)", "error");
      }
    });
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
      posterId = interviewInfo['poster_id'];
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
        contentClass="panel-container"
        token={token}
        currentUserId={currentUserId}
        posterId={posterId}
        />
    })
    var display;
    if (panels && panels.length > 0) {
      display = panels;
    } else {
      display = <div className="panel panel-default empty-result"><div className="slideDown"><i className="fa fa-save fa-3x mar-b-20"></i></div><div className="slideUp"><h1>No Saved Interviews</h1></div></div>
    }
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
