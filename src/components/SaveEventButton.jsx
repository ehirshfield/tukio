import React from 'react';
import helpers from '../actions/helpers.js';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

class SaveEventButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let eventTitle = this.props.eventData.title;
    let eventDate = this.props.eventData.start_time;
    let eventAddress = this.props.eventData.venue_address;
    let eventVenue = this.props.eventData.venue_name;
    let userID = this.props.auth.user.id;
    let eventData = {
      title: eventTitle,
      date: eventDate,
      address: eventAddress,
      venue: eventVenue,
      user_id: userID
    }

    if (this.props.auth.user.id) {
      helpers.saveEvent(eventData).then((response) => {
        // this.setState({ disabled: true })
        return true;
      });
    }
    else {
      console.log("Please sign in to save events");
    }
    this.context.router.push('/progress')

  }

  componentWillUnmount() {
    location.reload();
  }


  render() {

    if (this.state.disabled) {
      return (
        <button className="btn btn-default" disabled={this.state.disabled} onClick={this.handleClick} >Saved!</button>
      )
    }
    else {
      return(
        <button className="btn btn-default" data-tip="Please Sign In!" disabled={this.state.disabled} onClick={this.handleClick} >Save Event</button>
      )  
    }

  }


}

SaveEventButton.propTypes = {
  auth: React.PropTypes.object.isRequired
}

SaveEventButton.contextTypes = {
  router: React.PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(SaveEventButton);