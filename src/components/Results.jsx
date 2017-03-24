import React from 'react';
import helpers from '../actions/helpers.js';
import { connect } from 'react-redux';

// Results Component Declaration
class Results extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          eventToSave: []
      }

      this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }

  handleEventSubmit(event) {
    event.preventDefault();
    let saveEventData = this.target.value;
    console.log("Heres the data for one event: " + saveEventData);
  }

  renderSearchResults(){
    return this.props.searchResults.map(function(event, index) {
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
                  <button className="btn btn-default ">Commit to buy</button>
                </a>
              </span>
              <span className="btn-group pull-right">
                <a rel="noopener noreferrer">
                  <button onClick={this.handleEventSubmit} value={event} className="btn btn-default ">Save Event</button>
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
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-list-alt"></i>
                    Results
                  </strong>
                </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderSearchResults()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {

    // If we have no event, render this HTML

        if (this.props.searchResults == []) {
      return (
        <li className="list-group-item">
          <h3>
            <span>
              <em>Search some events...</em>
            </span>
          </h3>
        </li>
      );
    }
    // If we have events, return this.renderContainer() which in turn, returns all the events
    return this.renderContainer();
  }
};

Results.propTypes = {
    auth: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Results);
