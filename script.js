"use strict";

let title = prompt("What is the name of your project? / Как называется ваш проект?", "new project");
let screens = prompt("What kind of screens (simple, comlicated, interactive) do you need? / Какие типы экранов (простые, сложные, интерактивные) нужно разработать?" , "simple");
let screenPrice = +prompt("What is the price of a screen would you like to have? / Сколько будет стоить данная работа?", "1000");
let adaptive = confirm("It should be an adaptive site? / Нужен ли адаптив на сайте?");
let addService01 = prompt("What kind of service do you want to have else? / Какой дополнительный тип услуги нужен?");
let servicePrice01 = +prompt("What is the price would you like to have for this service? / Сколько это будет стоить?");
let addService02 = prompt("What kind of service do you want to have else?/Какой дополнительный тип услуги нужен?");
let servicePrice02 = +prompt("What is the price would you like to have for this service? / Сколько это будет стоить?");
let rollback = 10; //percent

const getAllServicePrices = function(price1, price2){
return (price1 + price2);
}

function getFullPrice(price0) {
  return (price0 + getAllServicePrices(servicePrice01, servicePrice02))
}

const getTitle = (el) => {
  let str = el.trim().toLowerCase();
  return title = str[0].toUpperCase() + str.slice(1);
} 

function getServicePercentPrices() {
  return Math.ceil(fullPrice - fullPrice * (rollback/100));
}

const getRollbackMessage =() => {
  if (fullPrice > 30000) {
    console.log("Даем скидку в 10%");
  } else if (fullPrice > 15000 && fullPrice <= 30000) {
    console.log("Даем скидку в 5%");
  } else if (fullPrice >=0 && fullPrice <= 15000){
    console.log("Скидка не предусмотрена");
  } else {
    console.log("что-то пошло не так");
  }
}

const allServicePrices = getAllServicePrices(servicePrice01, servicePrice02);
const fullPrice = getFullPrice(screenPrice);
getTitle(title);
const  servicePercentPrice = getServicePercentPrices();


console.log ("screens: " + Array.from(screens.toLowerCase().split()) );
console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(typeof screenPrice);
console.log("servicePercentPrice: " + servicePercentPrice + " euro");
console.log (getRollbackMessage());

