var Main = React.createClass({
  render: function() {
    return (
      <Panel title="My Interviews"/>
    );
  }
});

$(document).ready( function() {
    ReactDOM.render(
      <Main />,
      document.getElementById('main')
    );
})
