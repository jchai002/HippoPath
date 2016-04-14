var TableRow = React.createClass({
  render: function() {
    var data = this.props.data
    var labelStyle;
    switch (data.status) {
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
    return (
      <tr className="slideFromLeft">
        <td>
          <span className={"label " + labelStyle} >{data.status}</span>
        </td>
        <td>{data.hospital}</td>
        <td>{data.date}</td>
        <td className="hidden-sm-down">{data.time}</td>
        <td className="hidden-sm-down">{data.school}</td>
        <td className="hidden-sm-down">{data.specialty}</td>
        <td className="hidden-sm-down">{data.gender}</td>
        <td className="dark-gray hidden-sm-down">{data.distance < 99998 ? data.distance : 'Unknown'} Miles Away</td>
        <td><SearchButtons interviewId={data.interview_id} currentUserId={this.props.currentUserId} PosterId={data.poster_id}/></td>
      </tr>
    );
  }
});
