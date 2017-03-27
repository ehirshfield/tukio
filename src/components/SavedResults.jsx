import React from 'react';
import helpers from '../actions/helpers.js';
import { connect } from 'react-redux';
import SaveEventButton from './SaveEventButton.jsx';
import Commit from './Commit.jsx';


// SavedResults Component Declaration
class SavedResults extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          userSavedEvents: []
      }


this.savedEvents = this.savedEvents.bind(this);

  }



     // T&C to commit to purchase
    displayModal() {
        let modal = document.getElementById('commitModal');
        let btn = document.querySelector("buy");
        modal.style.display = "block";
        window.onclick = (event) => {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
  }

savedEvents() {
      let userID = this.props.auth.user.id;
    helpers.getSavedEvents(userID).then((response) => {
        this.setstate({userSavedEvents: response})
        console.log("response from database:" +response);
    });
    
}

componentDidMount(){
    this.renderSavedResults();
}
  renderSavedResults(){
        return this.state.userSavedEvents.map(function(event, index) {
      // Each event reperesents a list group item with a known index
      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <p>Event Name: {event.title}</p>
                <p> Venue Name: {event.venue_name}</p>
                <p> Venue Address: {event.venue_address}</p>
              </span>
              <span className="btn-group pull-right">
                <a rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default commit" onClick={this.displayModal}>Commit to buy</button>
                </a>
              </span>
              <span className="btn-group pull-right">
                <a rel="noopener noreferrer">
                  <SaveEventButton eventData={event} />
                </a>
              </span>
            </h3>
            <p> Event Date: {event.start_time}</p>

          </li>

        </div>
      );

    }.bind(this));

  }

  // A helper method for rendering a container to hold all of the events
  renderContainer() {
    return (
      <div className="main-container">
        <div className="row">

            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    Your Saved Results
                  </strong>
                </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderSavedResults()}
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }
  render() {

    // If we have no event, render this HTML

        if (this.props.userSavedEvents == []) {
      return (
        <li className="list-group-item">
          <h3>
            <span>
              <em>Save some events...</em>
            </span>
          </h3>
        </li>
      );
    }
    // If we have events, return this.renderContainer() which in turn, returns all the events
    return this.renderContainer();
  }

};


SavedResults.propTypes = {
    auth: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(SavedResults);
