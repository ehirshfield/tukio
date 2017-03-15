import axios from 'axios';


// Function here to take input parameters and query eventful API
export function searchEvents(event){
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
     return responseArray;
   }).catch(function(error){
     console.log(error);
   });

}
