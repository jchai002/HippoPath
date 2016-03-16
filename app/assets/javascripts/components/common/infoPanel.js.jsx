var InfoPanel = React.createClass({
  getInitialState: function(){
    return {
      deleted:false
    }
  },
  render: function() {
    var interviewInfo = this.props.interviewInfo;
    var hospital = interviewInfo.hospital
    var rideStatus = interviewInfo.ride_status;
    var bodyContent = this.props.bodyContent
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
          <div key={header} className="panel panel-default panel-flex-item">
            <div className="panel-heading">{header}</div>
            <div className="panel-body">
              {bodyContent[header]}
            </div>
          </div>
        );
    });

    var url = this.props.url;
    if(!this.state.deleted){
      return (
        <div className={this.props.bootstrapClass}>
          <div className={"panel panel-info"}>
            <div className="panel-heading">
              {hospital}
              <span className={"label mar-x-15 pull-right pad-5 " + labelStyle} >{rideStatus}</span>
            </div>
            <div className="panel-body panel-flex-container pad-x-15 pad-b-0">
              {bodyPanels}
            </div>
            <InterviewButtons key={this.props.key} url={url} data={interviewInfo} handleUpdate={this.props.handleUpdate} handleDelete={this.handleDelete}/>
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
    this.setState({deleted:true})
  }
});
