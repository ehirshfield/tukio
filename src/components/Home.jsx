import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import Signup from './Signup.jsx';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import Map from './Map.jsx';


import { connect } from 'react-redux';
// import helpers from '../actions/helpers.js';
// import { searchEvents } from '../actions/helpers.js';



class Home extends React.Component {
  constructor(props) {
    // calls the Component constructor function
    super(props);

    // the starting state of the `Home` Component
    this.state = {
      searchResults: [],
      searchRadius: "",
      searchAddress: ""
    };

    // used to make the keyword `this` work inside the `searchEvents` class function
    this.searchEvents = this.searchEvents.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchResults != this.state.searchResults) {

    }
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  searchEvents(event) {
    event.preventDefault();
    let self = this;
    return axios({
      method: 'POST',
      url: '/search',
      data: {
        address: this.state.searchAddress,
        radius: this.state.searchRadius
      }
    }).then(function (response) {
      console.log("AXIOS RESPONSE: " + response.data.events.event[0].title);
      let responseArray = [];
      for (let i = 0; i < response.data.events.event.length; i++) {
        responseArray.push(response.data.events.event[i]);
      }
      console.log(responseArray);

      self.setState ({
        searchResults: responseArray
      })
      return responseArray;
    }).catch(function (error) {
      console.log(error);
    });

  }

  render() {
<<<<<<< HEAD

=======
    // static location for the location of the map
>>>>>>> 5b51527cc7029ac78d0446a801ee8755860b5ac0
    const location = {
        lat: 40.7575285,
        lng: -73.9884469
    }
<<<<<<< HEAD
    console.log(this.state.searchResults);
    let markers = [];
    this.state.searchResults.forEach(function(result) {
      console.log(result);
      // to be continued
    })
=======
      // this will place a static pin marker
    const markers = [
      {
        location: {
          lat: 40.7575285,
          lng: -73.9884469
        }
      }
    ]

>>>>>>> 5b51527cc7029ac78d0446a801ee8755860b5ac0
    return (
      <div className="home-content">
        <Navbar />

        <div className="header">
          <div className="headline">Bringing event-goers together</div>
          <hr className="line-break" />
          <div className="headline-text">Find the best things to do all year with our events calendar of 2017's can't-miss happenings.</div>
          <div className="register" onClick={this.displayModal}>Sign up with email</div>
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
                  <input type="checkbox" id="concerts-box" value="concerts_checkbox" />
                  <label htmlFor="concerts-box">Concerts</label>
                </div>
                <div>
                  <input type="checkbox" id="Festivals-box" value="festivals_checkbox" />
                  <label htmlFor="festivals-box">Festivals</label>
                </div>
                <div>
                  <input type="checkbox" id="comedy-box" value="comedy_checkbox" />
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
                <input type="text" value={this.state.searchAddress} className="form-control" name="searchAddress" placeholder="Enter you search address" onChange={this.handleInputChange} />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="radius">Search Radius (miles)</label>
                <input type="text" value={this.state.searchRadius} className="form-control" name="searchRadius" placeholder="miles" onChange={this.handleInputChange} />
              </div>
              <br />
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
            Space for the map! Inline styling for now :)
              <div style={{width:300, height:600, background:'red'}}>
                <Map center={location} markers={markers} />
              </div>
          </div>

        <div id="signupModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.closeModal}>&times;</span>
            <Signup errors={this.state.errors} />
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
