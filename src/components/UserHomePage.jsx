import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';
import Checkbox from './Checkbox.jsx';
import Map from './Map.jsx';
import About from './About.jsx';
import Header from './Header.jsx';
import ImageHeader from './ImageHeader.jsx';
import Results from './Results.jsx';
import Search from './Search.jsx';
// import SaveEvent from './SaveEvent.jsx';
import { connect } from 'react-redux';
import helpers from '../actions/helpers.js';
import Footer from './Footer.jsx';

class UserHomePage extends React.Component {
  	constructor(props) {
		// calls the Component constructor function
		super(props);

		// the starting state of the 'Home' Component
		this.state = {
			searchResults: [],

		};

		// used to make the keyword `this` work inside the `searchEvents` class function
		this.setSearchResults = this.setSearchResults.bind(this);
    
	}
  
    setSearchResults(results) {
    return this.setState({ searchResults: results});
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

  closeModal() {
    let modal = document.getElementById('commitModal');
    let span = document.querySelector("close");
    modal.style.display = "none";
  }

  render() {
    const location = {
        lat: 34.0523003,
        lng: -118.2787902
    }


    return (
      <div className="home-content">
        <Navbar />
        <Header />
        <About />
        <ImageHeader />
        <SaveEvent />
        <Search setSearchResults={this.setSearchResults} />    

        {/*section for display search results*/}
        <div className="home-nav row">
          Search results
        </div>
        <br/>
        <br/>
        <br/>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <div className="event-results">
              <Results searchResults={this.state.searchResults}/>
            </div>
          </div>

          {/*place holder for displaying map*/}
          <div className="col-md-3">
            <div className = "mapAPI">
                <div style={{width:600, height:400}}>
                  <Map center={location} events={this.state.searchResults} />
                </div>
            </div>
          </div>
        </div>
        <Footer />


          {/*<div className="buy" onClick={this.displayModal}>Commit to buy</div>*/}
          {/*place holder for displaying map*/}
          {/*<div className = "mapAPI">
            Map goes here
          </div>

          <div id="commitModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.closeModal}>&times;</span>
              <Commit />
            </div>
          </div>*/}

      </div>
    );
  }
};

UserHomePage.propTypes = {
  auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(UserHomePage);