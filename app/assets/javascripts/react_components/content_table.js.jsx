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
      success: function(data) {
          this.setState({data:data})
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

    var dataRows= dataArray.map(function(dataProps){
        return <ContentRow data={dataProps} key={dataProps.id} />
    })


    return (
        <div className="widget-content">
          <ul className="news-items">
            {dataRows}
          </ul>
        </div>
      );
    }
});
