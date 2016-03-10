var SearchResultsPanel = React.createClass({
  render: function() {
    return (
    <div className="widget">
      <div className="widget-header">
        <i className="icon-list-alt"></i>
        <h3>Search Results</h3>
      </div>
      <SearchResultsTable data={this.props.data} token={this.props.token} />
    </div>
);
}
});
