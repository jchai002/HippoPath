var Main = React.createClass({
  render: function() {
    return (
      <div>
        <Panel title="My Interviews"/>
        <InterviewForm />
      </div>
    );
  }
});

$(document).ready( function() {
    ReactDOM.render(
      <Main />,
      document.getElementById('main')
    );
})
