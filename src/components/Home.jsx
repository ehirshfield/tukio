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
import { connect } from 'react-redux';
import helpers from '../actions/helpers.js';
import Footer from './Footer.jsx';
import Commit from './Commit.jsx';

class Home extends React.Component {

    constructor(props) {
    // calls the Component constructor function
    super(props);

    // the starting state of the `Search` Component
    this.state = {
      searchResults: []
		};
    this.setSearchResults = this.setSearchResults.bind(this);
  }

  setSearchResults(results) {
    return this.setState({ searchResults: results});
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

        <div id="signupModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.closeModal}>&times;</span>
            <Signup errors={this.state.errors} />
          </div>
        </div>

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

Home.propTypes = {
  auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Home);
// export default Home;