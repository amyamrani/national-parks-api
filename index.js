'use strict';

function getParkData() {
    const searchTerm = $('#search-term').val();
    const selectedState = $('#state').val();
    const maxResults = $('#max-results').val();
    $('#results-list').empty();
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${selectedState}&limit=${maxResults}&q=${searchTerm}&api_key=piMhpMv6eWvWP9lbVqIEeUR7tptkchVButHK15fi`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }   
        throw new Error(resonse.statusText);
    })     
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#error-message').text(`Something went wrong. ${err.message}`);
    });    
}

function displayResults(responseJson) {
    
    responseJson.data.forEach(park => {
        $('#results-list').append(
            `<li>
                <div><strong>Name: </strong>${park.fullName}</div>
                <div><strong>Description: </strong>${park.description}</div>
                <div><strong>Website: </strong><a href='${park.url}' target='blank'>${park.url}</a></div>
                <div><strong>Address: </strong>${park.addresses[1].line1} ${park.addresses[1].city}, ${park.addresses[1].stateCode} ${park.addresses[1].postalCode}</div>
            </li>`
        )
    });
    $('#results').removeClass('hidden');
}


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
        getParkData();
    });
  }
  
  $(watchForm);