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
      console.log('got object', content)
      var details = Object.keys(content).map(function(label){
        if (label === 'school' || label === 'specialty' || label === 'gender') {
          return (
            <SubPanelLine key={label} lineLabel={label} lineContent={content[label]} />
          );
        }
      });
      return (
        <div className={"panel panel-default " + content.cssClass}>
          <div className="panel-heading">
            <div>
              <img className="panel-avatar" src={content['avatar']} />
              <span>{content['name']}</span>
            </div>
            <div className="dark-gray">
              <p>{content['distance'] + ' miles away'}</p>
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
