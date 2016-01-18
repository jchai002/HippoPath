var Panel = React.createClass({
  render: function() {
    return (
    <div className="widget">
      <div className="widget-header">
        <i className="icon-list-alt"></i>
        <h3>{this.props.title}</h3>
      </div>
      <ContentTable url={this.props.url} model={this.props.model} />
    </div>
);
}
});
