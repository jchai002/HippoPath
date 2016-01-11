var Main = React.createClass({
  render: function() {
    return (

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <NewInterviewForm />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <Panel title="My Interviews" url="/interviews" model="interview"/>
          </div>
        </div>
      </div>
    );
  }
});
