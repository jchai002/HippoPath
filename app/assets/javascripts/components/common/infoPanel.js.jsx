var InfoPanel = React.createClass({
  render: function() {
    var rideStatus = this.props.interviewInfo.ride_status
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
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          {this.props.interviewInfo.hospital}
          <span className={"label mar-x-15 pull-right pad-5 " + labelStyle} >{rideStatus}</span>
        </div>

        <div className="panel-body">
          Panel content
        </div>
      </div>
    );
  }
});
