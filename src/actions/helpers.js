import axios from 'axios';


const helpers = {

    getUserInfo: (userID) => {
        return axios({
            method: 'POST',
            url: '/api/usercred/userprofile',
            data: {
                userID: userID
            }
        }).then(response => {
            return response.data;
        })
    },

    commitToBuy: (userID, eventID) => {
        return axios({
            method: 'PUT',
            url: '/api/save/commit',
            data: {
                userID: userID,
                eventID: eventID
            }
        }).then((response) => {
            return response.data
        })
    },

    getSavedEvents: (userID) => {
        return axios({
            method: 'POST',
            url: '/api/save/saved-events',
            data: {
                userID: userID
            }
        }).then(function(response) {
            return response.data
        })
    },

    saveEvent: (eventData) => {
        return axios({
            method: 'POST',
            url: '/api/save/event',
            data: {
                title: eventData.title,
                date: eventData.date,
                address: eventData.address,
                venue: eventData.venue,
                user_id: eventData.user_id
            }
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        })
    },

    // Function to take input parameters and query eventful API
    searchEvents: (searchData) => {

        return axios({
            method: 'POST',
            url: '/search',
            data: {
                address: searchData.searchAddress,
                radius: searchData.searchRadius,
                categories: searchData.checkedBoxes
            }
        }).then(function(response) {
            console.log("AXIOS RESPONSE: " + response.data.events.event[0].title);
            let responseArray = [];
            for (let i = 0; i < response.data.events.event.length; i++) {
                responseArray.push(response.data.events.event[i]);
            }
            console.log(responseArray);
            return responseArray;
        }).catch(function(error) {
            console.log(error);
        });

    },

    addCreditCard: (creditCardData) => {
        return axios({
            method: 'POST',
            url: '/api/cc/save',
            data: {
                userID: creditCardData.userID,
                cardName: creditCardData.cardName,
                cardNumber: creditCardData.cardNumber,
                cardExp: creditCardData.cardExp,
                cardSecurity: creditCardData.cardSecurity,
                cardZip: creditCardData.cardZip
            }
        }).then((response) => {
            console.log("Successful Save!");
        }).catch((error) => {
            console.log("axios error: " + error);
        })
    },

    updateCreditCard: (creditCardData) => {
        return axios({
            method: 'PUT',
            url: '/api/cc/update',
            data: {
                userID: creditCardData.userID,
                cardID: creditCardData.cardID,
                cardName: creditCardData.cardName,
                cardNumber: creditCardData.cardNumber,
                cardExp: creditCardData.cardExp,
                cardSecurity: creditCardData.cardSecurity,
                cardZip: creditCardData.cardZip
            }
        }).then((response) => {

            //This will need a response to setState or show a realtime CC update on profile
            //Probably need a return of some sort

            console.log("Successful Update!");
        }).catch((error) => {
            console.log("axios error: " + error);
        })
    }

}

export default helpers;