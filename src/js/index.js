import Handlebars from "handlebars";
import { notice } from "@pnotify/core";
import midTemplateSource from "../handlebars/mid.hbs?raw";
import succesTemplateSource from "../handlebars/succes.hbs?raw";

const midTemplate = Handlebars.compile(midTemplateSource);
const succesTemplate = Handlebars.compile(succesTemplateSource);

const searchInput = document.querySelector(".search-input");
const container = document.querySelector(".container");
function succesCountry(data) {
  const country = {
    names: data.data.objects[0].names.common,
    flag: data.data.objects[0].flag.url_svg,
    capitals: data.data.objects[0].capitals[0].name,
    population: data.data.objects[0].population,
    languages: data.data.objects[0].languages.map((language) => language.name),
  };
  console.log(country);
  const markup = succesTemplate(country);
  container.innerHTML = markup;
}
function midCountry(data) {
  const country = data.data.objects.map((country) => {
    return {
      names: country.names.common,
    };
  });
  const markup = midTemplate(country);
  container.innerHTML = markup;
}
function errCountry() {
  const country = alert("So many countries!!!");
  console.log(country);
}
const getCountry = (countryName) => {
  const url = `https://api.restcountries.com/countries/v5?q=${countryName}`;
  fetch(url, {
    headers: {
      Authorization: "Bearer rc_live_2d17b2b702f644ef86184fbeb960a708",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Помилка: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.data.objects.length === 1) {
        succesCountry(data);
      } else if (
        data.data.objects.length >= 2 &&
        data.data.objects.length <= 10
      ) {
        midCountry(data);
      } else if (data.data.objects.length > 10) {
        errCountry(data);
      } else if (data.data.objects.length < 1) {
        notice({
          title: "Помилка",
          text: "Не знайшло країну",
          closer: true,
          sticker: false,
          closeOnStackClick: true,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleSearchCountry = () => {
  getCountry(searchInput.value);
};
const debouncedSearchCountry = _.debounce(handleSearchCountry, 1000);
searchInput.addEventListener("input", debouncedSearchCountry);
