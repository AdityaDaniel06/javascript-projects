'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const req = new XMLHttpRequest();
// // req.open('GET','https://restcountries.eu/rest/v2/all',true);
// req.open('GET', 'https://restcountries.com/v3.1/name/portugal', true);
// req.send();
const renderCountry = function (data) {
  const html = `
  <article class="country">
<img class="country__img" src="${data.flags.png}" />
<div class="country__data">
  <h3 class="country__name">${data.name.common}</h3><span>${data.capital}</span>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 100000).toFixed(
    1
  )} people</p>
  <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
  <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
</div>
</article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   const req = new XMLHttpRequest();
//   req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   req.send();

//   req.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);

// get neighbour country
//     const [neighbour] = data.border;
//     if (!neighbour) return;
//     const req = new XMLHttpRequest();
//     req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     req.send();
//   });
// };

// getCountryAndNeighbour('portugal');

/////////////////////////////////////////
// const req = new XMLHttpRequest();
// // req.open('GET','https://restcountries.eu/rest/v2/all',true);
// req.open('GET', 'https://restcountries.com/v3.1/name/portugal', true);
// req.send();

// const request = fetch('https://restcountries.com/v3.1/name/portugal'); // get
// console.log(request); // Promise

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// };

// getCountryData('portual');
// getCountryData('india');

//https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=770838531230104933620x31805
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en
const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(res => {
      if (!res.ok)
        throw new Error(`Problem requesting reverse geocode ${re.status}`);
      return res.json();
    }) 
    .then(data => {
      console.log(data);
      console.log(data.city);
      console.log(data.countryName);
    })
    .catch(err => console.error(err));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
