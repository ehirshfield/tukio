import React from 'react';
// import { Link } from 'react-router';

class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="children">
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default Main;
