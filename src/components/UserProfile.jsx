import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import axios from 'axios';

class UserProfile extends React.Component {
  	constructor(props) {
		// calls the Component constructor function
		super(props);

		// the starting state of the 'Home' Component
		this.state = {
			searchResults: [],
      searchRadius: "",
      searchAddress: ""
		};

		// used to make the keyword `this` work inside the `searchEvents` class function
		this.searchEvents = this.searchEvents.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  // Function here to take input parameters and query eventful API
  searchEvents(event){
    event.preventDefault();

    return axios({
      method: 'POST',
      url: '/search',
      data: {
        address: this.state.searchAddress,
        radius: this.state.searchRadius
      }
    }).then(function(response){
       console.log("AXIOS RESPONSE: " + response.data.events.event[0].title);
       let responseArray = [];
       for (let i=0; i < response.data.events.event.length; i++){
         responseArray.push(response.data.events.event[i]);
       }
       console.log(responseArray);
     }).catch(function(error){
       console.log(error);
     });

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
	}
  
  render() {
    return (      
      <div className="home-content">
        {/*section for displaying saved events*/}
        <div className="saved-events">

        </div>

        {/*section for entering personal details*/}
        <div className="home-nav row">
          User Profile
          </div>         
          <div className="row">
            <div className="col-md-3">Personal Details</div>
            <div className="col-md-7">
              <form>
                <div className="form-group">
                  <label htmlFor="fullname">Name</label>
                  <input type="text" className="form-control" name="name" placeholder="Enter your Full Name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" name="username" placeholder="Enter your Username"/>
                </div>     
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" className="form-control" name="email" placeholder="Enter your email"/>
                </div> 
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="text" className="form-control" name="password" placeholder="Enter your Password"/>
                  <br/>
                  <input type="text" className="form-control" name="password" placeholder="Re-enter your Password"/>
                </div>                                           
                <br/>
                <input type="submit" onClick={this.XXX} className="save-personal-details-button" value="Save Personal Details" />
              </form>
            </div>
          </div>
          <br/><br/>
        {/*section for entering billing details*/}     
          <div className="row">
            <div className="col-md-3">Billing Details</div>
            <div className="col-md-7">
              <form>
                <div className="form-group">
                  <label htmlFor="card-number">Card Number</label>
                  <input type="text" className="form-control" name="card-number" placeholder="Enter your Card Number"/>
                </div>
                <div className="form-group">
                  <label htmlFor="card-expiry-date">Expiry Date</label>
                  <input type="text" className="form-control" name="card-expiry-date" placeholder="Enter your Card Expiry Date (mm/yy)"/>
                </div>     
                <div className="form-group">
                  <label htmlFor="security-code">Security Code</label>
                  <input type="text" className="form-control" name="security-code" placeholder="Enter your security code"/>
                </div> 
                <div className="form-group">
                  <label htmlFor="zip-code">Zip Code</label>
                  <input type="text" className="form-control" name="zip-code" placeholder="Enter your billing Zip Code"/>
                </div>                                           
                <br/>
                <input type="submit" onClick={this.XXX} className="save-billing-details-button" value="Save Billing Details" />
              </form>
            </div>
          </div>          

        {/*section for setting events preference*/}
        <div className="home-nav row">
          Events Preference
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
      </div>
    );
  }
};

export default UserProfile;