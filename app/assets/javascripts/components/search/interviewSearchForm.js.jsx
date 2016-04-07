var InterviewSearchForm = React.createClass({
  getInitialState: function(){
    return ({
      hospital:undefined,
      date:undefined,
      ride_status:"Need Ride"
    })
  },
  render: function() {
    return (
      <form className="custom-form" onSubmit={this.handleSubmit}>

        <div className="flex-wrapper">
          <div className="form-group mar-y-10">
            <input type="text" name="hospital" className="form-control" id="autocomplete" onBlur={this.handleHospitalChange} onChange={this.handleHospitalChange}/>
          </div>

          <div className="form-group mar-y-0">
            <div className='input-group date' id='interview-time-picker'>
              <input id="interview-time" placeholder="MM/DD/YYYY 12:00 AM" type='text' className="form-control" onBlur={this.handleDateTimeChange} onChange={this.handleDateTimeChange}/>
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
            <button type="submit" className="btn btn-primary">Search For Interviews</button>
          </div>
        </div>
      </form>
    );
  },
  handleSubmit: function(event){
    event.preventDefault()
    var formData = {
      interview_info: this.state,
      page: 1
    }
    $.ajax({
      url: "/interview_search",
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: function(data) {
        var totalRecordCount = data.pop();
        this.props.handleSearch(data);
        this.handlePagination(totalRecordCount);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error( status, err.toString());
      }.bind(this)
    });
  },
  handleDateTimeChange: function(){
    var dateTime=$("#interview-time").val().split(' ')
    this.setState({
      date:dateTime[0]
    })
  },
  handleHospitalChange: function(event){
    this.setState({hospital: event.target.value});
  },
  handleRideStatusSelect: function(event){
    this.setState({ride_status: event.target.value});
  },
  componentDidMount: function(){
    $('#interview-time-picker').datetimepicker()
  },
  handlePagination: function(totalRecordCount){
    searchState = this.state;
    handleSearch = this.props.handleSearch;
    handlePagination = this.handlePagination;
    var maxPages = Math.ceil(totalRecordCount/6);
    var visible;
    if (maxPages > 7) {
      visible = 7;
    } else {
      visible = maxPages
    }
    $('#search-pagination').twbsPagination({
      totalPages: maxPages,
      visiblePages: visible,
      onPageClick: function (event, page) {
        $('#page-content').text('Page ' + page);
        var formData = {
          interview_info: searchState,
          page: page
        }
        $.ajax({
          url: "/interview_search",
          dataType: 'json',
          type: 'POST',
          data: formData,
          success: function(data) {
            var totalRecordCount = data.pop();
            handlePagination(totalRecordCount);
            handleSearch(data);
          },
          error: function(xhr, status, err) {
            console.error( status, err.toString());
          }
        });
      }
    });
  }
});
