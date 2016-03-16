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
      <form className="custom-form" onSubmit={this.handleSubmit}>

      <div className="flex-wrapper">
        <div className="form-group mar-y-10">
          <input type="text" name="hospital" className="form-control" id="autocomplete" onBlur={this.handleHospitalChange} onChange={this.handleHospitalChange} placeholder="Enter Hospital"/>
        </div>

        <div className="form-group mar-y-0">
          <div className='input-group date' id='interview-time-picker'>
            <input id="interview-time" style={{width:300}} placeholder="MM/DD/YYYY 12:00 AM" type='text' className="form-control" onBlur={this.handleDateTimeChange} onChange={this.handleDateTimeChange}/>
            <span className="input-group-addon">
              <span className="glyphicon glyphicon-calendar"></span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-wrapper">
        <div className="form-group mar-y-10">
          <select id="selectbasic" name="selectbasic" className="form-control" onChange={this.handleRideStatusSelect}>
            <option value="Need Ride">Need Ride</option>
            <option value="Offering Ride">Offering Ride</option>
            <option value="Either">Either</option>
          </select>
        </div>
        <div className="form-group mar-y-10">
          <button type="submit" className="btn btn-primary">Add Interview</button>
        </div>
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
  },
  handleDateTimeChange: function(){
    var dateTime=$("#interview-time").val().split(' ')
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
    $('#interview-time-picker').datetimepicker({sideBySide: true})
  }
});
