import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import Signup from './Signup.jsx';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import Checkbox from './Checkbox.jsx';
import Map from './Map.jsx';


import { connect } from 'react-redux';
import helpers from '../actions/helpers.js';


const items = [
  'Music',
  'Festivals',
  'Comedy',
  'Food'
];

class Home extends React.Component {
  constructor(props) {
    // calls the Component constructor function
    super(props);

    // the starting state of the `Home` Component
    this.state = {
      searchResults: [],
      searchRadius: "",
      searchAddress: "",
      combinedSearch: "",
      checkedBoxes: []
		};

		// used to make the keyword `this` work inside the `searchEvents` class function
    this.createCheckbox = this.createCheckbox.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox(label) {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleSubmit(event){
    event.preventDefault();
    var checkboxArray = [];
    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
      checkboxArray.push(checkbox);
    }

    if (this.state.searchRadius != "" && this.state.searchAddress != ""){
      var newSearch = {
        searchRadius: this.state.searchRadius,
        searchAddress: this.state.searchAddress,
        checkedBoxes: checkboxArray
      }
      this.setState({
        combinedSearch: newSearch
      });
    }

  }

  componentDidUpdate(){
    if (this.state.combinedSearch != ""){
      console.log("This is being run");
      var searchData = this.state.combinedSearch;
      helpers.searchEvents(searchData).then(function(data) {
        return this.setState({
          searchResults: data,
          combinedSearch: "",
          checkedBoxes: []
        })
      }.bind(this))

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

  createCheckbox(label){
    return (
      <Checkbox
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label}
        />
    )
  }


  createCheckboxes() {
    return (
      items.map(this.createCheckbox)
    )
  }

  render() {
    // static position for the location of the map
    const location = {
        lat: 40.7575285,
        lng: -73.9884469
    }
    // working on the dynamic markers with the Eventful API


    // this will place a static pin marker, uncomment if you want to see a pin on the map
    //
    // const markers = [
    //   {
    //     location: {
    //       lat: 40.7575285,
    //       lng: -73.9884469
    //     }
    //   }
    // ]

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
        </div>
        {/*section for entering address to search*/}

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-7">
            <form>
              {this.createCheckboxes()}
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
              <input type="submit" onClick={this.handleSubmit} className="search-button" value="Search Events" />
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
            Space for the map!
              <div style={{width:300, height:400}}>
                <Map center={location} events={this.state.searchResults} />
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
