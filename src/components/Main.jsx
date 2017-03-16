import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import logo from '../../public/assets/img/logo.png';


class Main extends React.Component {
  componentDidMount(){
        document.getElementById("nav-bar").style.display = "static";
  }
  
  render() {
    const {isAuthenticated} = this.props.auth;
    const user = this.props.auth.user.username;
    const userLinks = (
        <ul className="nav-right">
            <li id="nav-links"><Link to="#">{user}</Link></li>
            <li id="nav-links"><Link to="#">Log Out</Link></li>
          </ul>
    )

    const guestLinks = (
       <ul className="nav-right">

            <li id="nav-links"><Link to="/login">Log In</Link></li>
          </ul>
    )
    return (
      <div className="container">
        <nav id="nav-bar">
            <img id="logo" src={logo} />
              { isAuthenticated  ? userLinks : guestLinks}
          </nav>

        <div className="children">
          {this.props.children}
        </div>
      </div>
    );
  }
};

Main.propTypes = {
  auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Main);