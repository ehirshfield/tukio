import React from 'react';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';
import Signup from './Signup.jsx';

class Home extends React.Component {
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
    return (
      <div className="home-content">
        <div className="header">
          

          <ul className="nav-right">
            <img className="logo" src={logo} />
            <li><Link to="/login">Log In</Link></li>
          </ul>

          <div className="headline">Bringing event-goers together</div>
          <div className="register" onClick={this.displayModal}>Sign up with email</div>
        </div>
        <div className="home-nav">
          Find events
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

export default Home;