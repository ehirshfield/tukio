import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import Home from './Home.jsx';

class UserHomePage extends React.Component {
  	constructor(props) {
		// calls the Component constructor function
		super(props);

		// the starting state of the 'Home' Component
		this.state = {
			searchResults: []
		};

		// used to make the keyword `this` work inside the `searchEvents` class function
		// this.searchEvents = this.searchEvents.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
	}
  
  render() {
    return (      
      <div className="home-content">
        <div className="header">
          <ul className="nav-right">
            <img className="logo" src={logo} />
            <li><Link to="/UserHomePage">Home</Link></li>
            <li><Link to="/Home">Log Out</Link></li>
          </ul>
        </div>
        {/*section for displaying saved events*/}
        <div className="saved-events">

        </div>
        {/*section for selecting events to search*/}
        <div className="home-nav row">
          Search events
          </div>
          <div className="search-options row">
            <div className="col-md-3">
              Interests
            </div>
            <form>
              <div className="form-group">
                <div className="col-md-7">
                  <div>
                    <input type="checkbox" id="concerts-box" value="concerts_checkbox"/>
                    <label htmlFor="concerts-box">Concerts</label>
                  </div>
                  <div>
                    <input type="checkbox" id="Festivals-box" value="festivals_checkbox"/>
                    <label htmlFor="festivals-box">Festivals</label>
                  </div>
                  <div>
                    <input type="checkbox" id="comedy-box" value="comedy_checkbox"/>
                    <label htmlFor="comedy-box">Comedy</label>
                  </div>
                </div>
              </div>
            </form>
                
          </div>
          {/*section for entering address to search*/}

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-7">
              <form>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" value={this.state.searchAddress} className="form-control" name="searchAddress" placeholder="Enter you search address" onChange={this.handleInputChange}/>
                </div>
                <br/>
                <div className="form-group">
                  <label htmlFor="radius">Search Radius (miles)</label>
                  <input type="text" value={this.state.searchRadius} className="form-control" name="searchRadius" placeholder="miles" onChange={this.handleInputChange}/>
                </div>
                <br/>
                <input type="submit" onClick={this.searchEvents} className="search-button" value="Search Events" />
              </form>
            </div>
          </div>
          {/*section for display search results*/}
          <div className="home-nav row">
          Search results
          </div>
          <div className="event-results">
            {
              this.state.searchResults
                ?
                <div src={this.state.searchResults}/>
                :
                <div src={loading} alt="loading..."/>
            }            
          </div>
          {/*place holder for displaying map*/}
          <div className = "mapAPI">
            Map goes here
          </div>
      </div>
    );
  }
};

export default UserHomePage;