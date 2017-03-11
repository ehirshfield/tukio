import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import Signup from './Signup.jsx';

const EVENTFUL_API = "XXXX";

class UserHomePage extends React.Component {
  	constructor(props) {
		// calls the Component constructor function
		super(props);

		// the starting state of the 'Home' Component
		this.state = {
			searchResults: []
		};

		// used to make the keyword `this` work inside the `searchEvents` class function
		this.searchEvents = this.searchEvents.bind(this);
	}
  
  displayModal() {
    let modal = document.getElementById('signupModal');
    let btn = document.querySelector("register");
    modal.style.display = "block";
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  closeModal() {
    let modal = document.getElementById('signupModal');
    let span = document.querySelector("close");
    modal.style.display = "none";
  }

  // Function here to take input parameters and query eventful API
  searchEvents() {
		// start ajax request
		return axios.get(EVENTFUL_API).then((response) => {
			if (response && response.data && response.data.data && response.data.data.eventful_url) {
				this.setState({
					searchResults: response.data.data.eventful_url
				});
			}
		});
  }

  render() {
    return (      
      <div className="home-content">
        <div className="header">
          <ul className="nav-right">
            <img className="logo" src={logo} />
            <li><Link to="/login">Log In</Link></li>
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
            <div className="col-md-7">
              <div>
                <input type="checkbox" id="concerts-box" value="concerts_checkbox"/>
                <label for="concerts-box">Concerts</label>
              </div>
              <div>
                <input type="checkbox" id="Festivals-box" value="festivals_checkbox"/>
                <label for="festivals-box">Festivals</label>
              </div>
              <div>
                <input type="checkbox" id="comedy-box" value="comedy_checkbox"/>
                <label for="comedy-box">Comedy</label>
              </div>
            </div>
          </div>
          {/*section for entering address to search*/}
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-7"> 
              <form>
                <div className="form-group">
                  <label for="address">Address</label>
                  <input type="text" className="form-control" id="search-address" placeholder="Enter you search address"/>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-7">
              <form>
                <div className="form-group">
                  <label for="radius">Search Radius (miles)</label>
                  <input type="text" className="form-control" id="search-Radius" placeholder="miles"/>
                </div>
              </form>
            </div>
          </div>

          <div className="search-button" onClick={this.searchEvents}>Search Events</div>
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

        <div id="signupModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.closeModal}>&times;</span>
            <Signup />
          </div>
        </div>

      </div>
    );
  }
};

export default UserHomePage;