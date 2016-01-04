var TableRow = React.createClass({
    render: function() {
      var headers= this.props.headers
      var rowData= this.props.data
      var tableCells= headers.map(function(header){
          return <td>{rowData[header]}</td>
      })
      return (
      <tr>
        {tableCells}
      </tr>
    );
    }
});
