var InterviewForm = React.createClass({
  render: function() {
    return (
      <form>
        <div className="col-lg-2">
        <label className="col-md-4 control-label" for="Hospital">Hospital</label>
          <select id="Hospital" name="hospital" className="form-control">
            <option value="Hospital 1">Hospital 1</option>
            <option value="Hospital 2">Hospital 2</option>
          </select>
        </div>


        <div className="col-lg-2">
        <label className="col-md-4 control-label" for="textinput">Date</label>
        <input id="textinput" name="textinput" type="text" placeholder="DD/MM/YYYY" className="form-control input-md" />
        </div>


        <div className="col-lg-2">
        <label className="col-md-4 control-label" for="searchinput">Time</label>
          <input id="searchinput" name="time" type="text" placeholder="" className="form-control input-md" />
        </div>

        <div className="col-lg-2">
        <label>preinterview dinner</label>
        <br></br>
          <label className="radio-inline" for="radios-0">
            <input type="radio" name="radios" id="radios-0" value="true" checked="checked" />
            yes
          </label>
          <label className="radio-inline" for="radios-1">
            <input type="radio" name="radios" id="radios-1" value="false" />
            no
          </label>
        </div>

        <div className="col-lg-2">
        <label>Ride Status</label>
          <select id="selectbasic" name="selectbasic" className="form-control">
            <option value="Need Ride">Need Ride</option>
            <option value="Offering Ride">Offering Ride</option>
            <option value="Either">Either</option>
          </select>
        </div>

        <div className="col-lg-2">
        <br></br>
        <button type="submit" class="btn btn-primary">Add Interview</button>
        </div>
      </form>

    );
  }
});
