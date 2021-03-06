var InfoPanel = React.createClass({
  getInitialState: function(){
    return {
      deleted:false
    }
  },
  render: function() {
    var interviewInfo = this.props.interviewInfo;
    var hospital = interviewInfo.hospital;
    var rideStatus = interviewInfo.ride_status;
    var date = interviewInfo.date;
    var postedTime = moment(interviewInfo.created_at).fromNow();
    var bodyContent = this.props.bodyContent;
    var labelStyle;
    switch (rideStatus) {
      case 'Need Ride':
        labelStyle = "label-danger";
      break;
      case 'Offering Ride':
        labelStyle = "label-success";
      break;
      case 'Either':
        labelStyle = "label-warning";
      break;
    }
    var bodyPanels = Object.keys(bodyContent).map(function(header){
        return (
          <SubPanel key={header} header={header} content={bodyContent[header]} />
        );
    });
    var actions;
    if (this.props.layoutType === 'interview') {
      var searchButton = <a className="btn btn-primary mar-b-15 mar-l-20 mar-r-20" href={"/interviews/search/?hospital="+hospital+"&ride_status="+rideStatus+"&date="+date}>Find Match</a>
      actions = <div className="panel-actions-flex-container"><span className="button-group">{searchButton}</span><InterviewButtons key={this.props.key} url={this.props.url} data={interviewInfo} handleUpdate={this.props.handleUpdate} handleDelete={this.props.handleDelete}
      handleDisable={this.props.handleDisable} disabled={this.props.disabled}/></div>
    }
    if (this.props.layoutType === 'saved') {
      console.log(this.props.posterId)
      actions = <div className="panel-actions-flex-container"><span className="dark-gray mar-l-15 mar-b-10">posted {postedTime}</span><SavedButtons data={interviewInfo} token={this.props.token} currentUserId={this.props.currentUserId}
      posterId={this.props.posterId}
      handleRemove={this.props.handleRemove}/></div>;
    }
    var url = this.props.url;
      return (
        <div className={this.props.wrapperClass}>
          <div className={this.props.disabled === true ? 'disabled-interview panel panel-info' : 'panel panel-info'}>
            <div className="panel-heading flex-space-between">
              <span className="panel-title" data-toggle="tooltip" title={hospital} >{hospital}</span>
              <span className={"label pad-5 ride-status " + labelStyle} >{rideStatus}</span>
            </div>
            <div className={"panel-body pad-x-10 pad-b-0 " + this.props.contentClass}>
              {bodyPanels}
            </div>
            <hr className="mar-y-15"></hr>
              {actions}
          </div>
        </div>
      );
  },
  handleUpdate: function(event){
    this.props.handleUpdate();
  }
});
