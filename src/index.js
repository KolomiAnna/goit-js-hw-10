import './css/styles.css'

import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector("#search-box"),
    countryListEl : document.querySelector(".country-list"),
    countryInfoEl : document.querySelector(".country-info"),
};

refs.countryListEl.style.listStyle = "none";
refs.countryListEl.style.fontSize = "20px";
refs.countryListEl.style.color = "#000066";

refs.countryInfoEl.style.display = "flex";
refs.countryInfoEl.style.alignItems = "center";
refs.countryInfoEl.style.gap = "10px";



refs.inputEl.addEventListener("input", handlerOnSearch);

function fetchCountry(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
        .then(response => {
        if (!response.ok) {
            throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name"));
        }
        console.log(response);
        return response.json();

        })
        // .then(data => { console.log(data) });
}

// fetchCountry("Namibia");

function handlerOnSearch(event) {
    
    event.preventDefault();
    const searchQuery = refs.inputEl.value.trim();
    // console.log(searchQuery);

    fetchCountry(searchQuery).then(data => {
        if (data.length > 10) {
            Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.");
            return;
        } else if (2 <= data.length && data.length <= 10) {
            return createNameCountry(data);
        }
        return infoAboutCountry(data)
    })
        .catch(error => console.log(error))
}

function createNameCountry(countries) {
    
    const markupName = countries.map(element => `<img src="${element.flags.svg}" height="40" width="40"><h1>${element.name.common}</h1>`);
    refs.countryInfoEl.innerHTML = markupName;
     console.log(markupName);
};


    
function infoAboutCountry(countries) {
    const markup = countries.map(element => `<li><span class = "desc">Capital: ${element.capital}</span></li><span class = "desc"><li>Population: ${element.population}</span></li><li><span class = "desc">Languages: ${Object.values(element.languages).join(", ")}</span></li>`);
    refs.countryListEl.innerHTML = markup;
};


