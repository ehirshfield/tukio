import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';
import Checkbox from './Checkbox.jsx';
import Map from './Map.jsx';
import About from './About.jsx';
import Header from './Header.jsx';
import SavedResults from './SavedResults.jsx';
import ImageHeader from './ImageHeader.jsx';
import Results from './Results.jsx';
import Search from './Search.jsx';
import { connect } from 'react-redux';
import helpers from '../actions/helpers.js';
import Commit from './Commit.jsx';
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
        <SavedResults />
        <Search setSearchResults={this.setSearchResults} />    
  
            <div className="event-results">
              <Results searchResults={this.state.searchResults}/>
            </div>
     


            <div className = "mapAPI">
                <div style={{width: '100%', height:700}}>
                  <Map center={location} events={this.state.searchResults} />
                </div>
                </div>
       
        <Footer />

          {/*modal to commit to buy*/}
          <div id="commitModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.closeModal}>&times;</span>
              <Commit />
            </div>
          </div>

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