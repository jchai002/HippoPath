var ContentTable = React.createClass({
  getInitialState: function(){
    return ({
      data: undefined
    })
  },
  getData: function(){
    console.log('requesting data...')
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
  componentDidMount: function(){
    this.getData();
  },
  handleUpdate: function(){
    this.getData();
  },
  render: function() {
    var dataArray=[]

    for (var key in this.state.data){
      dataArray.push(this.state.data[key])
    }

    //define table headers and other properties to pass down to row component
    var tableHeaderArray=[]
    for (var header in dataArray[0]){
      if(header!=="id"){
          tableHeaderArray.push(header)
      }
    }
    var url=this.props.url
    var handleUpdate = this.handleUpdate
    var dataModel=this.props.model


    var tableHeaders= tableHeaderArray.map(function(header){
        return <th key={header}> {header}</th>
    })


    var tableRows= dataArray.map(function(data){
        return <TableRow url={url} model={dataModel} handleUpdate={handleUpdate} headers={tableHeaderArray} data={data} key={"interview "+data.id} />
    })
    return (
        <div className="widget-content">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {tableHeaders}
                <th>Actions</th>
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
