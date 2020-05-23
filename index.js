'use strict';

const apiKey = 'piMhpMv6eWvWP9lbVqIEeUR7tptkchVButHK15fi';
const baseURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams (params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');    
}

function displayResults(responseJson) {
    if (responseJson.data.length == 0) {
        $('#results-list').text('No results found.');
    }
    
    for (let i = 0; i < responseJson.data.length; i++) {
        const park = responseJson.data[i];
        const address = park.addresses[0];
        $('#results-list').append(
            `<li>
                <h3><a href="${park.url}">${park.fullName}</a></h3>
                <p>Address: ${address.line1} ${address.line2} ${address.line3}${address.city}, ${address.stateCode} ${address.postalCode}</p>
                <p>${park.description}</p>
            </li>`            
        )
    };
    $('#results').removeClass('hidden');            
};

function getParkData(searchState, maxResults) {
    const params = {
        stateCode: searchState,
        limit: maxResults 
    }
    const queryString = formatQueryParams(params)
    const url = baseURL + '?' + queryString + '&api_key=' + apiKey;

    $('#results-list').empty();

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }   
        throw new Error(response.statusText);
    })     
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong. ${err.message}`);
    });    
}

function watchForm() {
    $('.js-form').submit(event => {
        event.preventDefault();
        const searchState = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getParkData(searchState, maxResults);
    });
}
  
$(watchForm);