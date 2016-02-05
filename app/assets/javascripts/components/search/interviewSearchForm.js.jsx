var InterviewSearchForm = React.createClass({
  getInitialState: function(){
    return ({
      hospital_id:undefined,
      date:undefined,
      ride_status:"Need Ride"
    })
  },
  componentDidUpdate: function(){
    console.log('form state', this.state.results)
  },
  render: function() {
    return (

        <form className="form-inline custom-form" onSubmit={this.handleSubmit}>

        <div className="form-group">
          <select id="Hospital" name="hospital" className="form-control" onChange={this.handleHospitalChange} value={this.state.hospital_id}>
            <option value="">SELECT A HOSPITAL</option>
            <option value="1">Hospital 1</option>
            <option value="2">Hospital 2</option>
          </select>
        </div>


            <div className="form-group">
                <div className='input-group date col-sm-12' id='search-interview-date-picker'>
                    <input id="search-interview-date" style={{width:300}} placeholder="MM/DD/YYYY 12:00 AM" type='text' className="form-control" onBlur={this.handleDateTimeChange} onChange={this.handleDateTimeChange}/>
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
        <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
    );
  },
  handleSubmit: function(event){
      event.preventDefault()
      var formData = {
        interview_info: this.state
      }
        $.ajax({
        url: "/interview_search",
        dataType: 'json',
        type: 'POST',
        data: formData,
        success: function(data) {
          this.props.handleSearch(data)
        }.bind(this),
        error: function(xhr, status, err) {
          console.error( status, err.toString());
        }.bind(this)
      });

  },
  handleDateTimeChange: function(){
    var dateTime=$("#search-interview-date").val().split(' ')
    this.setState({
      date:dateTime[0]
    })
  },
  handleHospitalChange: function(event){
      this.setState({hospital_id: event.target.value});
  },
  handleRideStatusSelect: function(event){
    this.setState({ride_status: event.target.value});
  },
  componentDidMount: function(){
    $('#search-interview-date-picker').datetimepicker()
  },
  componentDidUpdate: function(){

  }
});
