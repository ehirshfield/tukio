import React from 'react';
import helpers from '../actions/helpers.js';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

class CommitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: "",
            disabled: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let eventId = this.props.eventId
        // let eventTitle = this.props.eventData.title;
        // let eventDate = this.props.eventData.start_time;
        // let eventAddress = this.props.eventData.venue_address;
        // let eventVenue = this.props.eventData.venue_name;
        let userID = this.props.auth.user.id;
        // let eventData = {
        //     title: eventTitle,
        //     date: eventDate,
        //     address: eventAddress,
        //     venue: eventVenue,
        //     user_id: userID
        // }

        if (this.props.auth.user.id) {
            helpers.commitToBuy(userID, eventId).then(response => {
                console.log(response.id)
                return this.setState({
                    commits: response.commits,
                    disabled: true
                });
            })
        }
        else {
            console.log("Please sign in to save events");
        }

    }

    render() {

        if (this.state.disabled) {
            return (
                <button className="btn btn-default" disabled={this.state.disabled} onClick={this.handleClick} >Committed</button>
            )
        }
        else {
            return (
                <button className="btn btn-default" data-tip="Please Sign In!" disabled={this.state.disabled} onClick={this.handleClick} >Commit To Buy</button>
            )
        }

    }


}

CommitButton.propTypes = {
    auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(CommitButton);