import axios from 'axios';


// Function here to take input parameters and query eventful API
const helpers = {

  searchEvents: (searchData) => {

    return axios({
      method: 'POST',
      url: '/search',
      data: {
        address: searchData.searchAddress,
        radius: searchData.searchRadius,
        categories: searchData.checkedBoxes
      }
    }).then(function(response){
       console.log("AXIOS RESPONSE: " + response.data.events.event[0].title);
       let responseArray = [];
       for (let i=0; i < response.data.events.event.length; i++){
         responseArray.push(response.data.events.event[i]);
       }
       console.log(responseArray);
       return responseArray;
     }).catch(function(error){
       console.log(error);
     });

  }
}

export default helpers;
