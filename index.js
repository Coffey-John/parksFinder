'use strict';

// put your own value below!
const apiKey = 'ruIFIQ3qWu8sOnCVf0bv2YTvbRKfs3m97NYHbod4';
const searchURL =
  'https://developer.nps.gov/api/v1/parks'


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function displayParkResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $(".results").html("");
  let tmp = "<h2>Search Results</h2>";

  responseJson.data.forEach(itemInDataArray => {
    tmp += `

    Site Name: <a href=${itemInDataArray.url}>${itemInDataArray.fullName}</a><br>
    <p>Site Description: ${itemInDataArray.description}</p>
    `;
  });




  $(".results").append(tmp);
  //display the results section
  $('.results').removeClass('hidden');
}


function getParkResults(searchTerm, limit = 10) {
  const params = {
    api_key: apiKey,
    stateCode: searchTerm,
    limit
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
        console.log(response.json)
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayParkResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getParkResults(searchTerm, limit);
  });
}

$(watchForm);
