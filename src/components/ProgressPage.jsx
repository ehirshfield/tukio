import React from 'react';
import Navbar from './Navbar.jsx';
import { connect } from 'react-redux';
import helpers from '../actions/helpers.js';
import CommitButton from './CommitButton.jsx';
import { Line, Circle } from 'rc-progress';


class Progress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname: "",
            username: "",
            email: "",
            events: [],
        }
    }

    componentDidMount() {
        let userID = this.props.auth.user.id;
        helpers.getSavedEvents(userID).then(response => {
            this.setState({ events: response })
        })
        helpers.getUserInfo(userID).then(response => {
            this.setState({
                fullname: response.fullname,
                username: response.username,
                email: response.email
            })
        })
    }

    componentDidUpdate() {
        let userID = this.props.auth.user.id;
        helpers.getSavedEvents(userID).then(response => {
            this.setState({ events: response })
        })
    }


    displayModal() {
        let modal = document.getElementById('commitModal');
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


    renderEvents() {
        return this.state.events.map((event, index) => {
            return (
                <div key={index}>

                    <div className="saved-info-panel">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h1 className="panel-title">
                                    <strong>
                                        {event.Event.title}
                                    </strong>
                                </h1>
                            </div>
                            <div className="panel-body">
                                Name: {event.Event.venue_name}
                            </div>
                            <div className="panel-body">
                                Address: {event.Event.venue_address}
                            </div>
                            <div className="panel-body">
                                Date: {event.Event.localDate}
                            </div>
                            <CommitButton eventId={event.EventId} onClick={this.displayModal} />

                            <Line percent={event.Event.commits} strokeWidth="2" strokeColor="#ED3E2F" style={{ width: '90%' }} /> {event.Event.commits}%

                        </div>
                    </div>

                </div>
            )
        })
    }

    render() {

        return (
            <div className="progress-content">
                <Navbar />
                <div className="events-container">
                    {this.renderEvents()}
                </div>
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
                            Name: {this.state.fullname}
                        </div>
                        <div className="panel-body">
                            Username: {this.state.username}
                        </div>
                        <div className="panel-body">
                            Email: {this.state.email}
                        </div>
                        <div className="panel-body">
                            <a href='/userprofile'>Profile</a>
                            <br />
                            <a href='/userhomepage'>Search Events</a>
                        </div>
                    </div>

                </div>
                <div id="commitModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.closeModal}>&times;</span>
                        You have commited to buy tickets for this event!
                        </div>
                </div>
            </div>
        );

    }
};


Progress.propTypes = {
    auth: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Progress);