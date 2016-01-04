var Main = React.createClass({
  render: function() {
    return (
      <Panel />
    );
  }
});

$(document).ready( function() {
    ReactDOM.render(
      <Main />,
      document.getElementById('main')
    );
})
