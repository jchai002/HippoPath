var Main = React.createClass({
  render: function() {
    return (
      <Panel url="/interviews"/>
    );
  }
});

$(document).ready( function() {
    ReactDOM.render(
      <Main />,
      document.getElementById('main')
    );
})
