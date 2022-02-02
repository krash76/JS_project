"use strict";
let title;
let screens;
let screenPrice;
let adaptive;
let addService01, addService02;
let servicePrice01, servicePrice02;
let rollback = 10; //percent
let allServicePrices, fullPrice, servicePercentPrice ;


const isNumber = function(num) {
  return (!isNaN(parseFloat(num)) && isFinite(num));
}

const getNumber = function(num) {
  return num = Number(num.trim());
}

const questionnaire = function () {
  title = prompt("What is the name of your project? / Как называется ваш проект?", "new project");
  screens = prompt("What kind of screens (simple, comlicated, interactive) do you need? / Какие типы экранов (простые, сложные, интерактивные) нужно разработать?" , "simple");
  while (!isNumber(screenPrice)) {
    screenPrice = prompt("What is the price of a screen would you like to have? / Сколько будет стоить данная работа?");
  }
    
  adaptive = confirm("It should be an adaptive site? / Нужен ли адаптив на сайте?");
  return screenPrice = getNumber(screenPrice);
}
 
const getAllServicePrices = function() {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if ( i === 0) {
      addService01 = prompt("1What kind of service do you want to have else? / Какой дополнительный тип услуги нужен?");
      while (!isNumber(servicePrice01)) {
        servicePrice01 = prompt("1What is the price would you like to have for this service? / Сколько это будет стоить?");
      }
      servicePrice01 = getNumber(servicePrice01);
    } else if (i === 1) {
      addService02 = prompt("2What kind of service do you want to have else?/Какой дополнительный тип услуги нужен?");
      while (!isNumber(servicePrice02)) {
        servicePrice02 = prompt("2What is the price would you like to have for this service? / Сколько это будет стоить?");
      }
      servicePrice02 = getNumber(servicePrice02);
    }
  }
  return sum += servicePrice01 + servicePrice02;
}

function getFullPrice() {
  return (screenPrice + allServicePrices);
}

const getTitle = (el) => {
  let str = el.trim().toLowerCase();
  return title = str[0].toUpperCase() + str.slice(1);
} 

function getServicePercentPrices() {
  return Math.ceil(fullPrice - fullPrice * (rollback/100));
}

const getRollbackMessage = () => {
  if (fullPrice > 30000) {
    console.log("discount 10% / Даем скидку в 10%");
  } else if (fullPrice > 15000 && fullPrice <= 30000) {
    console.log("Discount 5% / Даем скидку в 5%");
  } else if (fullPrice >=0 && fullPrice <= 15000) {
    console.log("No discount / Скидка не предусмотрена");
  } else {
    console.log("something went wrong / что-то пошло не так");
  }
}

const showTypeOf = (el) => {
  return typeof el;
}

questionnaire();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
getTitle(title);
servicePercentPrice = getServicePercentPrices();
getRollbackMessage(); // сообщение о скидке пользователю 

console.log ("screens: " + Array.from(screens.toLowerCase().split()) ); //вывод строки с типами экранов для разработки screens
console.log(showTypeOf(title), showTypeOf(fullPrice), showTypeOf(adaptive), showTypeOf(screenPrice)); //вызовы функции showTypeOf
console.log("servicePercentPrice: " + servicePercentPrice + " euro"); //стоимость за вычетом процента отката посреднику
