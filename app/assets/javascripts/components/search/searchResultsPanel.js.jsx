var SearchResultsPanel = React.createClass({
  render: function() {
    return (
    <div className="panel panel-default">
      <SearchResultsTable data={this.props.data} token={this.props.token} currentUserId={this.props.currentUserId}/>
    </div>
);
}
});
