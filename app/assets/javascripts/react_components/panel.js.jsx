var Panel = React.createClass({
  render: function() {
    return (
    <div className="widget widget-nopad col-sm-6">
      <div className="widget-header">
        <i className="icon-list-alt"></i>
        <h3>{this.props.title}</h3>
      </div>
      <ContentTable url="/interviews"/>
    </div>
);
}
});
