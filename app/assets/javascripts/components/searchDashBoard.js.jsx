var SearchDashBoard = React.createClass({
  getInitialState: function(){
    return {
      searchResultPanels: undefined,
      searched: false
    }
  },
  setSearchResultPanels: function(data){
    var handleUpdate = this.handleUpdate;
    var token = this.props.token;
    var currentUserId = this.props.current_user_id;
    var panels = data.map(function(interviewInfo){
      var bodyContent = {};
      bodyContent['date'] = interviewInfo['date'];
      bodyContent['time'] = interviewInfo['time'];
      bodyContent['interviewee specialty'] = interviewInfo['specialty'];
      bodyContent['interviewee gender'] = interviewInfo['gender'];
      return <InfoPanel
        url="/interviews"
        key={interviewInfo.id}
        layoutType='search'
        interviewInfo={interviewInfo}
        bodyContent={bodyContent}
        wrapperClass="col-sm-12"
        flexBoxClass="panel-flex-container-5"
        token={token}
        currentUserId={currentUserId}
        />
    })
    this.setState({searchResultPanels:panels})
  },
  render: function() {
    console.log('props',this.props)
    var panels;
    if (!this.state.searchResultPanels) {
      panels = <div className="panel panel-default empty-result"><h1>Search For Carpool</h1></div>;
    } else {
      if (this.state.searchResultPanels.length) {
        panels = this.state.searchResultPanels;
      } else {
        panels = <div className="panel panel-default empty-result"><h1>0 Search Results</h1></div>;
      }
    }
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <InterviewSearchForm handleSearch={this.handleSearch}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {panels}
            </div>
          </div>
        </div>
      );
    },
    handleSearch: function(results){
      this.setSearchResultPanels(results);
      this.setState({
        searched: true
      })
    }
  });
