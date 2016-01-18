var DashBoard = React.createClass({
  getInitialState: function(){
    return {
      searchResults:undefined
    }
  },
  render: function() {
    return (

      <div className="container">

        <div className="row">
          <div className="col-sm-12">
            <InterviewSearchForm handleSearch={this.handleSearch} />
          </div>
        </div>


        <div className="row">
          <div className="col-sm-12">
            <NewInterviewForm />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <Panel title="My Interviews" url="/interviews" model="interview"/>
          </div>
        </div>

      </div>
    );
  },
  handleSearch: function(result){
    this.setState({
      searchResults:result
    })
  },
  componentDidUpdate: function(){
    console.log(this.state)
  }
});
