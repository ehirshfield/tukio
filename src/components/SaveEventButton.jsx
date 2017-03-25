import React from 'react';
import helpers from '../actions/helpers.js';
import { connect } from 'react-redux';

class SaveEventButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        disabled: false
      }

      this.handleClick = this.handleClick.bind(this);
      this.checkIfAlreadySaved = this.checkIfAlreadySaved.bind(this);

  }

  checkIfAlreadySaved() {
    let userID = this.props.auth.user.id;
    helpers.getSavedEvents(userID).then((response) => {
      console.log(response.length);
      for (var i=0; i < response.length; i++){
        if(response[i].Event.title === this.props.eventData.title){

          console.log("This is already saved: " + response[i].Event.title);
          return this.setState({disabled: true});
        }
        else{
          console.log("checked: " + response[i].Event.title + "vs. " + this.props.eventData.title);
        }
      }
    })
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

    helpers.saveEvent(eventData).then((response) => {
      console.log("WE DID IT");

    });
    //Update DOM?
    this.setState({disabled: true});

  }


componentWillMount() {
  // this.setState({disabled: false});
  this.checkIfAlreadySaved();
}
// componentDidUpdate() {
//   this.checkIfAlreadySaved();
// }


  render(){

    if(this.state.disabled){
      return(
        <button className="btn btn-default" disabled={this.state.disabled} onClick={this.handleClick} >Saved!</button>
      )
    }
    else {
      return(
        <button className="btn btn-default" disabled={this.state.disabled} onClick={this.handleClick} >Save Event</button>
      )
    }

  }


}

SaveEventButton.propTypes = {
    auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(SaveEventButton);
