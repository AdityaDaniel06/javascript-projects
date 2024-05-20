'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const req = new XMLHttpRequest();
// req.open('GET','https://restcountries.eu/rest/v2/all',true);
req.open('GET', 'https://restcountries.com/v3.1/name/portugal', true);
req.send();

const reqUS = new XMLHttpRequest();
// req.open('GET','https://restcountries.eu/rest/v2/all',true);
req.open('GET', 'https://restcountries.com/v3.1/name/usa', true);
req.send();
req.addEventListener('load', function () {
  // console.log(this.responseText);
  const [data] = JSON.parse(this.responseText);
  console.log(data);

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
  <p class="country__row"><span>💰</span>${data.currencies.name}</p>
</div>
</article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
});
