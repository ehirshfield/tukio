import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import axios from 'axios';
import helpers from '../actions/helpers.js';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import TextField from './TextField.jsx';

class UserProfile extends React.Component {
  constructor(props) {
    // calls the Component constructor function
    super(props);

    // the starting state of the 'Home' Component
    this.state = {
      searchResults: [],
      searchRadius: "",
      searchAddress: "",
      fullname: "",
      username: "",
      email: "",
      password: "",
      errors: {}
    };

    // used to make the keyword `this` work inside the `searchEvents` class function
    this.searchEvents = this.searchEvents.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    let userID = this.props.auth.user.id;
    helpers.getUserInfo(userID).then(response => {
      this.setState({
        fullname: response.fullname,
        username: response.username,
        email: response.email
      })
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault();
  }
  // Function here to take input parameters and query eventful API
  searchEvents(event) {
    event.preventDefault();

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
    }).catch(function (error) {
      console.log(error);
    });

  }

  render() {
    const { errors } = this.state;
    return (
      <div className="user-content">
        <Navbar />

        {/*section for displaying saved events*/}
        <div className="saved-events">

        </div>

        {/*section for entering personal details*/}
        <div className="home-nav row">
          User Profile
          </div>

        <div className="user-info-container">
          <div className="user-info-panel">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    User Information
                  </strong>
                </h1>
              </div>
              <div className="panel-body">
                Name: {this.state.name}
              </div>
              <div className="panel-body">
                Username: {this.state.username}
              </div>
              <div className="panel-body">
                Email: {this.state.email}
              </div>
            </div>
          </div>




          <div className="user-info-panel">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    Change Info
                  </strong></h1>
              </div>
              <form onSubmit={this.onSubmit}>
                <div id="inline-element">
                  <TextField
                    type="text"
                    error={errors.fullname}
                    label="Full Name"
                    onChange={this.onChange}
                    value={this.state.fullname}
                    name="fullname"
                  />
                </div>
                <div id="inline-element">
                  <TextField
                    type="text"
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    value={this.state.username}
                    name="username"
                  />
                </div>
                <div id="inline-element">
                  <TextField
                    type="text"
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    name="email"
                  />

                </div>
                <div id="inline-element">
                  <TextField
                    type="password"
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    name="password"
                  />
                </div>
                <div className="button-div">
                  <button disabled={this.state.isLoading}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};



UserProfile.propTypes = {
  auth: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(UserProfile);
