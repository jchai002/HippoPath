// setSearchResultPanels: function(data){
//   var handleUpdate = this.handleUpdate;
//   var token = this.props.token;
//   var currentUserId = this.props.current_user_id;
//   var calculateDistance = this.calculateDistance;
//   var currentUserPosition = this.state.userPosition;
//   var panels = data.map(function(interviewInfo){
//     var bodyContent = {};
//     bodyContent['date'] = interviewInfo['date'] || 'unknown';
//     bodyContent['time'] = interviewInfo['time'] || 'unknown';
//     bodyContent['interviewee'] = {
//       'name':interviewInfo['name'] || 'unknown',
//       'gender':interviewInfo['gender'] || 'unknown',
//       'school':interviewInfo['school'] || 'unknown',
//       'specialty': interviewInfo['specialty'] || 'unknown',
//       'avatar':  interviewInfo['avatar'] || '',
//       'distance': interviewInfo['distance'],
//       'cssClass': 'panel-flex-item-large'
//     }
//     return <InfoPanel
//       url="/interviews"
//       key={interviewInfo.id}
//       layoutType='search'
//       interviewInfo={interviewInfo}
//       bodyContent={bodyContent}
//       wrapperClass="col-sm-12 col-md-6 col-lg-4 slideFromLeft"
//       flexBoxClass="panel-flex-container-2"
//       token={token}
//       currentUserId={currentUserId}
//       />
//   })
//   return panels
// },
