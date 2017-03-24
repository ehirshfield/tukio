import React from 'react';

// Results Component Declaration
class Results extends React.Component {
  
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
                <a href={event.commits} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default ">Commit to buy</button>
                </a>
              </span>  
              <span className="btn-group pull-right">
                <a href={event.save} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default ">Save Event</button>
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

export default Results;
