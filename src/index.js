import './css/styles.css';
import { fetchCountry } from "./fetchCountries";

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector("#search-box"),
    countryListEl: document.querySelector(".country-list"),
    countryInfoEl: document.querySelector(".country-info"),
};

refs.countryListEl.style.listStyle = "none";
refs.countryListEl.style.fontSize = "20px";
refs.countryListEl.style.color = "#000066";

refs.countryInfoEl.style.display = "flex";
refs.countryInfoEl.style.alignItems = "center";
refs.countryInfoEl.style.gap = "10px";
refs.inputEl.addEventListener("input", debounce(handlerOnSearch, DEBOUNCE_DELAY));


function handlerOnSearch(event) {
    const searchQuery = refs.inputEl.value.trim();

    refs.countryInfoEl.innerHTML = "";
    refs.countryListEl.innerHTML = "";

    if (!searchQuery) {
        return;
    }

    fetchCountry(searchQuery).then(data => {
        if (data.length > 10) {
            Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.");
        } if (2 <= data.length && data.length <= 10) {
            createNameCountry(data);
        } if (data.length === 1) {
            infoAboutCountry(data)
        }
    })
        .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"));
}



function createNameCountry(countries) {
    const markupName = countries.map(element => `<img src="${element.flags.svg}" height="40" width="40"><h1>${element.name.common}</h1>`);
    refs.countryInfoEl.innerHTML = markupName;
    console.log(markupName);
};


function infoAboutCountry(countries) {
    const markup = countries.map(element => `<li><div style="display:flex; align-items:center; gap:10px;"><img src="${element.flags.svg}" height="40" width="40"><h1 style="color:#0C0261;">${element.name.common}</h1></div></li><li><span class="desc">Capital: ${element.capital}</span></li><span class="desc"><li>Population: ${element.population}</span></li><li><span class="desc">Languages: ${Object.values(element.languages).join(", ")}</span></li>`);
    refs.countryListEl.innerHTML = markup;
};


