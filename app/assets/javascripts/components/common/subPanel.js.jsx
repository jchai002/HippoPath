var SubPanel = React.createClass({
  render: function() {
    var header = this.props.header
    var content = this.props.content
    if (typeof this.props.content === "string") {
      return (
        <div className="panel panel-default panel-flex-item">
          <div className="panel-heading">{header}</div>
          <div className="panel-body">
            {content}
          </div>
        </div>
      );
    } else {
      var details = Object.keys(content).map(function(label){
        if (label === 'school' || label === 'specialty' || label === 'gender') {
          return (
            <SubPanelLine key={label} lineLabel={label} lineContent={content[label]} />
          );
        }
      });
      return (
        <div className={"interview-panel panel panel-default " + content.cssClass}>
          <div className="panel-heading">
            <div>
              <img className="panel-avatar" src={content['avatar']} />
            </div>
            <div className="flex-wrapper">{content['name']}</div>
            <div className="dark-gray flex-wrapper">
              <p>{content['distance'] < 88888 ? content['distance'] + ' miles away' : 'unknown miles away'}</p>
            </div>
          </div>
          <div className="panel-body">
              {details}
          </div>
        </div>
      )
    }
  }
});
