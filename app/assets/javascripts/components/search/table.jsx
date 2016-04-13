var Table = React.createClass({
  render: function() {
    var currentUserId = this.props.currentUserId;
    var tableRows = this.props.data.map(function(interviewInfo){
      var rowData = {
        status: interviewInfo['ride_status'] || 'unknown',
        hospital: interviewInfo['hospital'] || 'unknown',
        date: interviewInfo['date'] || 'unknown',
        time: interviewInfo['time'] || 'unknown',
        school: interviewInfo['school'] || 'unknown',
        specialty: interviewInfo['specialty'] || 'unknown',
        gender: interviewInfo['gender'] || 'unknown',
        distance: interviewInfo['distance'],
        posted: moment(interviewInfo.created_at).fromNow(),
        poster_id: interviewInfo['poster_id'],
        interview_id: interviewInfo['id']
      };
      return <TableRow key={interviewInfo.id} data={rowData} currentUserId={currentUserId} />
    });
    return (
      <div className="panel panel-default table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Hospital</th>
              <th>Date</th>
              <th>Time</th>
              <th>School</th>
              <th>Specialty</th>
              <th>Gender</th>
              <th>Distance</th>
              <th>Reach Out!</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
});
