var SubPanel = React.createClass({
  render: function() {
    var header = this.props.header
    var content = this.props.content
    if (typeof this.props.content === "string") {
      return (
        <div className="panel panel-default subpanel-small">
          <div className="panel-heading">{header}</div>
          <div className="panel-body">
            {content}
          </div>
        </div>
      );
    } else {
      var details = Object.keys(content).map(function(label){
        if (label === 'school' || label === 'specialty') {
          return (
            <SubPanelLine key={label} lineLabel={label} lineContent={content[label]} />
          );
        }
      });
      return (
        <div className={"interview-panel mar-b-0 panel panel-default subpanel-large"}>
          <div className="panel-heading">
            <div className="flex-wrapper">{content['gender'] +' interviewee'}</div>
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
