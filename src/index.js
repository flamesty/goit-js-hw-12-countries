import refs from "./js/refs";
import fetchCountries from "./js/fetchCountries";
import "./css/style.css";

import countriesTamplate from "./templates/countriesTamlate.hbs";

var debounce = require("lodash.debounce");

import { error, info, notice } from "@pnotify/core";

refs.input.addEventListener("input", debounce(searchCountry, 500));

function searchCountry() {
    clearFeeld();

    const inputValue = refs.input.value;
    console.log(inputValue);
    if (inputValue) {
        fetchCountries(inputValue.trim())
            .then((data) => upDateTamplate(data))
            .catch((error) => {
                error({
                    text: "Smooth gone wrong!",
                });
            });
    }
}

function upDateTamplate(data) {
    const markup = countriesTamplate(data);
    const markupUl = listTamplate(data);

    if (!data.length || data.length === "") {
        info({
            text: `You enter empty string or Please enter more specific query`,
        });
    }

    if (data.status === 404) {
        error({
            text: "No country has been found. Please enter a more specific query!",
        });
    }

    if (data.length <= 10) {
        refs.ulList.insertAdjacentHTML("beforeend", markupUl);
    }
    if (data.length > 10) {
        notice({
            text: `Please enter a more specific query !`,
        });
    }

    if (data.length === 1) {
        refs.ulList.innerHTML = "";
        refs.ulListCard.insertAdjacentHTML("beforeend", markup);
    }
}

function clearFeeld() {
    refs.ulListCard.innerHTML = "";
    refs.ulList.innerHTML = "";
}