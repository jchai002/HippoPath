var SearchDashBoard = React.createClass({
  getInitialState: function(){
    return {
      searchResults: undefined,
      searched: false
    }
  },
  render: function() {
    if (!this.state.searched) {
      return (
        <div className="container">

          <div className="row">
            <div className="col-sm-12">
              <InterviewSearchForm handleSearch={this.handleSearch}/>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="widget-content">
                <h1>Search For a Carpool</h1>
              </div>
            </div>
          </div>
        </div>

      );
    } else {
      return (
        <div className="container">

          <div className="row">
            <div className="col-sm-12">
              <InterviewSearchForm handleSearch={this.handleSearch}/>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <SearchResultsPanel data={this.state.searchResults} token={this.props.token} currentUserId={this.props.current_user_id} />
            </div>
          </div>
        </div>
      );
    }

  },
  handleSearch: function(results){
    this.setState({
      searchResults:results,
      searched: true
    })
  },
  componentDidUpdate: function(){
    console.log('dash board state' , this.state.searchResults)
  }
});
