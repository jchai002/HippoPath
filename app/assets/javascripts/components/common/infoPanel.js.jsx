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

    var buttons;
    if (this.props.layoutType === 'interview') {
      buttons = <InterviewButtons key={this.props.key} url={this.props.url} data={interviewInfo} handleUpdate={this.props.handleUpdate} handleDelete={this.handleDelete} />
    }
    if (this.props.layoutType === 'search') {
      buttons = <MessageButton data={interviewInfo} token={this.props.token} currentUserId={this.props.currentUserId} />
    }

    var url = this.props.url;
    if(!this.state.deleted){
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
              {buttons}
          </div>
        </div>
      );
    } else {
      return <div></div>
    }
  },
  handleUpdate: function(event){
    this.props.handleUpdate();
  },
  handleDelete: function(){
    this.setState({deleted:true});
  }
});
