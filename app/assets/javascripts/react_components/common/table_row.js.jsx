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


          //de-couple the model from the component, if more model will be using this component, can use switch statement here instead of if/else
          if (dataModel==="Interview") {
            var buttons = <InterviewButtons url={url} data={rowData} model={dataModel} handleUpdate={this.props.handleUpdate} handleDelete={this.handleDelete}/>
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
