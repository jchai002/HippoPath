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
    if (rideStatus=="Need Ride") {
      labelStyle = "label-danger";
    }
    else if (rideStatus=="Offering Ride") {
      labelStyle = "label-success";
    }
    else if (rideStatus=="Either") {
      labelStyle = "label-warning";
    }
    var bodyPanels = Object.keys(bodyContent).map(function(header){
        return (
          <SubPanel key={header} header={header} content={bodyContent[header]} />
        );
    });
    var actions;
    if (this.props.layoutType === 'interview') {
      var searchButton = <a className="btn btn-primary mar-b-15 mar-l-20 mar-r-5" href={"/interview_search/?hospital="+hospital+"&ride_status="+rideStatus+"&date="+date}>Search Match</a>
      actions = <div className="panel-flex-container"><span>{searchButton}</span><InterviewButtons key={this.props.key} url={this.props.url} data={interviewInfo} handleUpdate={this.props.handleUpdate} handleDelete={this.props.handleDelete} /></div>
    }
    if (this.props.layoutType === 'search') {
      actions = <div className="panel-flex-container"><span className="dark-gray mar-l-15 mar-b-10">posted {postedTime}</span><MessageButton data={interviewInfo} token={this.props.token} currentUserId={this.props.currentUserId} /></div>;
    }

    var url = this.props.url;
      return (
        <div className={this.props.wrapperClass}>
          <div className="panel panel-info">
            <div className="panel-heading">
              {hospital}
              <span className={"label mar-x-15 pull-right pad-5 " + labelStyle} >{rideStatus}</span>
            </div>
            <div className={"panel-body pad-x-15 pad-b-0 " + this.props.flexBoxClass}>
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
