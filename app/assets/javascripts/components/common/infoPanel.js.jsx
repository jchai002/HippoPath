var InfoPanel = React.createClass({
  getInitialState: function(){
    return {
      deleted:false
    }
  },
  render: function() {
    var interviewInfo = this.props.interviewInfo;
    var rideStatus = interviewInfo.ride_status;
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

    var panels = Object.keys(interviewInfo).map(function(header){
      if (header==="date" || header==="time") {
        return (
          <div key={header} className="panel panel-default panel-flex-item">
            <div className="panel-heading">{header}</div>
            <div className="panel-body">
              {interviewInfo[header]}
            </div>
          </div>
        );
      }
    });

    var url = this.props.url;
    if(!this.state.deleted){
      return (
        <div className={this.props.bootstrapClass}>
          <div className={"panel panel-info"}>
            <div className="panel-heading">
              {this.props.interviewInfo.hospital}
              <span className={"label mar-x-15 pull-right pad-5 " + labelStyle} >{rideStatus}</span>
            </div>
            <div className="panel-body panel-flex-container pad-x-15 pad-b-0">
              {panels}
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
