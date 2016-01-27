var NewInterviewForm = React.createClass({
  getInitialState: function(){
    return ({
      hospital:undefined,
      date:undefined,
      time:undefined,
      ride_status:"Need Ride"
    })
  },
  render: function() {
    return (
        <form className="form-inline custom-form" onSubmit={this.handleSubmit}>

        <div className="form-group">
          <select id="Hospital" name="hospital" className="form-control" onChange={this.handleHospitalChange} value={this.state.hospital}>
            <option value="">SELECT A HOSPITAL</option>
            <option value="hospital 1">Hospital 1</option>
            <option value="hospital 2">Hospital 2</option>
          </select>
        </div>


            <div className="form-group">
                <div className='input-group date col-sm-12' id='new-interview-time-picker'>
                    <input id="new-interview-time" style={{width:300}} placeholder="MM/DD/YYYY 12:00 AM" type='text' className="form-control" onBlur={this.handleDateTimeChange} onChange={this.handleDateTimeChange}/>
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>

        <div className="form-group">
          <select id="selectbasic" name="selectbasic" className="form-control" onChange={this.handleRideStatusSelect}>
            <option value="Need Ride">Need Ride</option>
            <option value="Offering Ride">Offering Ride</option>
            <option value="Either">Either</option>
          </select>
        </div>


        <div className="form-group">
        <button type="submit" className="btn btn-primary">Add Interview</button>
        </div>
      </form>
    );
  },
  postFormData: function(){
    var formData = {
      interview_info: this.state
    }

    return new Promise (function(resolved, rejected){
        $.ajax({
        url: "/interviews",
        dataType: 'json',
        type: 'POST',
        data: formData,
        success: resolved,
        error: rejected
      });
    }, formData) //pass the formData into the promise
  },
  handleSubmit: function(){
      this.postFormData()
      .then(function(data){
        console.log(data)
      })
  },
  handleDateTimeChange: function(){
    var dateTime=$("#new-interview-time").val().split(' ')
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
    $('#new-interview-time-picker').datetimepicker({sideBySide: true})
  },
  componentDidUpdate: function(){
    console.log(this.state)
  }
});
