import Handlebars from "handlebars";
import midTemplateSource from "../handlebars/mid.hbs?raw";
import succesTemplateSource from "../handlebars/succes.hbs?raw";

const midTemplate = Handlebars.compile(midTemplateSource);
const succesTemplate = Handlebars.compile(succesTemplateSource);

const searchInput = document.querySelector(".search-input");
const container = document.querySelector(".container");
