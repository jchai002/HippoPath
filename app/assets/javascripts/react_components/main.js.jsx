var Main = React.createClass({
  render: function() {
    return (
      // <Panel title="My Interviews"/>
      <InterviewForm />
    );
  }
});

$(document).ready( function() {
    ReactDOM.render(
      <Main />,
      document.getElementById('main')
    );
})
