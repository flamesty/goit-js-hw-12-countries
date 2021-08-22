import "./css/styles.css";

import refs from "./js/refs";
import fetchCountries from "./js/fetchCountries";
import countriesMarkup from "./templates/countriesMarkup.hbs";
import listTemplate from "./templates/oneCardTemplate.hbs";

var debounce = require("lodash.debounce");

import { error, info, notice } from "@pnotify/core";

refs.input.addEventListener("input", debounce(searchCountry, 500));

function searchCountry() {
  clearFeeld();

  const inputValue = refs.input.value;
  console.log(inputValue);
  if (inputValue) {
    fetchCountries(inputValue.trim())
      .then((data) => upDateTemplate(data))
      .catch((error) => {
        error({
          text: "Что-то пошло не так!",
        });
      });
  }
}

function upDateTemplate(data) {
  const markup = countriesMarkup(data);
  const markupUl = listTemplate(data);

  if (!data.length || data.length === "") {
    info({
      text: `Вы вводите пустую строку или Пожалуйста, введите более конкретный запрос`,
    });
  }

  if (data.status === 404) {
    error({
      text: "Страна не найдена. Пожалуйста, введите более конкретный запрос!",
    });
  }

  if (data.length <= 10) {
    refs.ulList.insertAdjacentHTML("beforeend", markupUl);
  }
  if (data.length > 10) {
    notice({
      text: `Пожалуйста, введите более конкретный запрос!`,
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