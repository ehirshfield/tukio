
var axios = require("axios");

var authKey = "mR4ZKTx6dQWXmsTw";

var helpers = {

  searchQuery: function(articleSearch) {

    console.log(articleSearch);
    this.saveSearch(articleSearch);
    var queryURL = "http://api.eventful.com/rest/events/search?...&keywords=books&location=San+Diego&date=Future&app_key=" + authKey + "&q=";
    var newQuery = queryURL + articleSearch;

    return axios.get(newQuery).then(function(response) {

      console.log("AXIOS RESPONSE: " + response.data.response.docs);
      if (response.data.response.docs) {
        return response.data.response.docs;
      }

      return ""

    });

}
