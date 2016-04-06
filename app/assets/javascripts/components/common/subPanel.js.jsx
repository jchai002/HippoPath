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
        if (label != 'cssClass' && label != 'name' && label != 'avatar') {
          return (
            <SubPanelLine key={label} lineLabel={label} lineContent={content[label]} />
          );
        }
      });
      return (
        <div className={"panel panel-default " + content.cssClass}>
          <div className="panel-heading relative">
            {header}: <span className="dark-gray">{content['name']}</span>
            <img className="panel-avatar" src={content['avatar']} />
          </div>
          <div className="panel-body">
              {details}
          </div>
        </div>
      )
    }
  }
});
