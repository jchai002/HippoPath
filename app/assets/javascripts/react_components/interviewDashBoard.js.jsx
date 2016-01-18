var InterviewDashBoard = React.createClass({

  render: function() {

        return (

          <div className="container">

            <div className="row">
              <div className="col-sm-12">
                <NewInterviewForm />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <Panel title="My Interviews" url="/interviews" model="interview"/>
              </div>
            </div>
          </div>
        );
      }

});
