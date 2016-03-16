var InfoPanel = React.createClass({
  render: function() {
    var interviewInfo = this.props.interviewInfo
    var rideStatus = interviewInfo.ride_status
    var labelStyle;
    if (rideStatus=="Need Ride") {
      labelStyle = "label-danger";
    }
    else if (rideStatus=="Offering Ride") {
      labelStyle = "label-success"
    }
    else if (rideStatus=="Either") {
      labelStyle = "label-warning"
    }

    var panels = Object.keys(interviewInfo).map(function(header){
      if (header==="date" || header==="time") {
        return (
          <div className="panel panel-default panel-flex-item">
            <div className="panel-heading">{header}</div>
            <div className="panel-body">
              {interviewInfo[header]}
            </div>
          </div>
        )
      }
    })

    return (
      <div className={this.props.bootstrapClass}>
        <div className={"panel panel-info"}>
          <div className="panel-heading">
            {this.props.interviewInfo.hospital}
            <span className={"label mar-x-15 pull-right pad-5 " + labelStyle} >{rideStatus}</span>
          </div>
          <div className="panel-body panel-flex-container">
            {panels}
          </div>
        </div>
      </div>
    );
  }
});
