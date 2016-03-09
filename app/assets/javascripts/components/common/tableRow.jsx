var TableRow = React.createClass({
    getInitialState: function(){
      return {
        deleted:false
      }
    },
    render: function() {

        if(!this.state.deleted){
          var headers= this.props.headers
          var url = this.props.url
          var rowData= this.props.data
          var dataModel=this.props.model


          var tableCells= headers.map(function(header){
              return <td key={header+" "+rowData.id} >{rowData[header]}</td>
          })


          if (dataModel==="Interview") {
            var buttons = <InterviewButtons url={url} data={rowData} model={dataModel} handleUpdate={this.props.handleUpdate} handleDelete={this.handleDelete}/>
          }

          if (dataModel==="Search") {
            var buttons = <MessageButton data={rowData}/>
          }

          return (
          <tr>
            {tableCells}
            {buttons}
          </tr>
        );
      }else{
        return <tr></tr>
      }
    },
    handleUpdate: function(event){
      this.props.handleUpdate();
    },
    handleDelete: function(){
      this.setState({deleted:true})
    }
});
