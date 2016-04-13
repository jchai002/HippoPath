var SubPanelLine = React.createClass({
    render: function() {
      return (
        <p>{this.props.lineLabel}: <span className="dark-gray">{this.props.lineContent}</span></p>
      )
    }
});
