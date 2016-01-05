var EditInterviewForm = React.createClass({
  getInitialState: function(){
    return ({
      id: this.props.data.id,
      hospital:this.props.data.hospital,
      date:this.props.data.date,
      time:this.props.data.time,
      ride_status:this.props.data.ride_status
    })
  },
  render: function() {
    return (
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <select id="Hospital" name="hospital" className="form-control" onChange={this.handleHospitalChange} value={this.state.hospital}>
            <option value="">SELECT A HOSPITAL</option>
            <option value="hospital 1">Hospital 1</option>
            <option value="hospital 2">Hospital 2</option>
          </select>
        </div>


            <div className="form-group">
                <div className='input-group date col-sm-12' id={'datetimepicker'+this.state.id}>
                    <input id={'date-time-'+this.state.id} value={this.state.date+' '+this.state.time} placeholder="MM/DD/YYYY 12:00 AM" type='text' className="form-control" onChange={this.handleDateTimeChange} onBlur={this.handleDateTimeChange}/>
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>

        <div className="form-group">
          <select id="selectbasic" name="selectbasic" className="form-control" onChange={this.handleRideStatusSelect} value={this.state.ride_status}>
            <option value="Need Ride">Need Ride</option>
            <option value="Offering Ride">Offering Ride</option>
            <option value="Either">Either</option>
          </select>
        </div>


        <div className="form-group">
        <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    );
  },
  handleSubmit: function(event){
      event.preventDefault()
      var url="/interviews/"+this.state.id
      var formData = {
        interview_info: this.state
      }
        $.ajax({
        url: url,
        dataType: 'json',
        type: 'PUT',
        data: formData,
        success: function(data) {
          console.log(data)
        }.bind(this),
        error: function(xhr, status, err) {
          console.error( status, err.toString());
        }.bind(this)
      });
  },
  handleDateTimeChange: function(){
    var dateTime=$('#date-time-'+this.state.id).val().split(' ')
    this.setState({
      date:dateTime[0],
      time:dateTime[1]+' '+dateTime[2]
    })
  },
  handleHospitalChange: function(event){
      this.setState({hospital: event.target.value});
  },
  handleRideStatusSelect: function(event){
    this.setState({ride_status: event.target.value});
  },
  componentDidMount: function(){
    $('#datetimepicker'+this.state.id).datetimepicker({sideBySide: true})
  },
  componentDidUpdate: function(){
    console.log(this.state)
  }
});
