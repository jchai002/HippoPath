var ContentTable = React.createClass({
  getInitialState: function(){
    return ({
      data:''
    })
  },
  componentDidMount: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(results) {
          this.setState({data:results})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var dataArray=[]

    for (var key in this.state.data){
      dataArray.push(this.state.data[key])
    }

    //save table headers
    var tableHeaderArray=[]
    for (var header in dataArray[0]){
      if(header!=="id"){
          tableHeaderArray.push(header)
      }
    }
    var tableHeaders= tableHeaderArray.map(function(header){
        return <th>{header}</th>
    })

    var url=this.props.url

    var tableRows= dataArray.map(function(data){
        return <TableRow url={url} headers={tableHeaderArray} data={data} key={data.id} />
    })
    return (
        <div className="widget-content">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {tableHeaders}
                <th>modify</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      );
    }
});
