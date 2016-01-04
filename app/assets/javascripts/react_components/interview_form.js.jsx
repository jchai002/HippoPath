var InterviewForm = React.createClass({
  getInitialState: function(){
    return ({
      hospital:undefined,
      date:undefined,
      time:undefined,
      preinterview_dinner:false,
      ride_status:"Need Ride"
    })
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="col-lg-2">
        <label className="col-md-4 control-label" for="Hospital">Hospital</label>
          <select id="Hospital" name="hospital" className="form-control" onChange={this.handleHospitalChange} value={this.state.hospital}>
            <option value="">SELECT A HOSPITAL</option>
            <option value="hospital 1">Hospital 1</option>
            <option value="hospital 2">Hospital 2</option>
          </select>
        </div>


            <div className="col-lg-4">
              <label className="col-md-4 control-label" >Date/Time</label>
              <br></br>
                <div className='input-group date col-sm-12' id='datetimepicker'>
                    <input id="date-time" type='text' className="form-control" onBlur={this.handleDateTimeChange}/>
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>

        <div className="col-lg-2">
        <label>preinterview dinner</label>
        <br></br>
          <label className="radio-inline" for="radios-0">
            <input type="radio" name="radios" id="radios-0" value="true" onChange={this.handlePIDSelect} />
            yes
          </label>
          <label className="radio-inline" for="radios-1">
            <input type="radio" name="radios" id="radios-1" value="false" onChange={this.handlePIDSelect}/>
            no
          </label>
        </div>

        <div className="col-lg-2">
        <label>Ride Status</label>
          <select id="selectbasic" name="selectbasic" className="form-control" onChange={this.handleRideStatusSelect}>
            <option value="Need Ride">Need Ride</option>
            <option value="Offering Ride">Offering Ride</option>
            <option value="Either">Either</option>
          </select>
        </div>

        <div className="col-lg-2">
        <br></br>
        <button type="submit" className="btn btn-primary">Add Interview</button>
        </div>
      </form>

    );
  },
  handleSubmit: function(){

      console.log(this.state)

      var formData = {
        interview_info: this.state
      }
        $.ajax({
        url: "/interviews",
        dataType: 'json',
        type: 'POST',
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
    var dateTime=$("#date-time").val().split(' ')
    this.setState({
      date:dateTime[0],
      time:dateTime[1]+' '+dateTime[2]
    })
  },
  handlePIDSelect: function(event) {
      this.setState({preinterview_dinner:event.target.value})
  },
  handleHospitalChange: function(event){
      this.setState({hospital: event.target.value});
  },
  handleRideStatusSelect: function(event){
    this.setState({ride_status: event.target.value});
  },
  componentDidUpdate: function(){
    console.log(this.state)
  }
});
