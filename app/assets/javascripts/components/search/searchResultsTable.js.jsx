var SearchResultsTable = React.createClass({

  componentDidUpdate: function(){
    console.log('search props', this.props.data)
  },
  render: function() {
    var dataArray=[]
    var formToken = this.props.token

    for (var key in this.props.data){
      dataArray.push(this.props.data[key])
    }

    //define table headers and other properties to pass down to row component
    var tableHeaderArray=[]
    for (var header in dataArray[0]){
      if(header!=="id"){
          tableHeaderArray.push(header)
      }
    }

    var tableHeaders= tableHeaderArray.map(function(header){
        return <th key={header}> {header}</th>
    })


    var tableRows= dataArray.map(function(data){
        return <TableRow model="Search" headers={tableHeaderArray} data={data} key={"search "+data.id} token={formToken} />
    })

    if (dataArray.length) {
      return (
          <div className="widget-content">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  {tableHeaders}
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>
            </table>
          </div>
        );
    } else {
      return (
        <div className="widget-content">
            <h1>0 Search Results</h1>
        </div>
      )
    }
  }
});
