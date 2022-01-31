"use strict";

let title = prompt("What is the name of your project? / Как называется ваш проект?", "new project");
let screens = prompt("What kind of screens (simple, comlicated, interactive) do you need? / Какие типы экранов (простые, сложные, интерактивные) нужно разработать?" , "simple");
let screenPrice = +prompt("What is the price of a screen would you like to have? / Сколько будет стоить данная работа?", "1000");
let adaptive = confirm("It should be an adaptive site? / Нужен ли адаптив на сайте?");
let addService01 = prompt("What kind of service do you want to have else? / Какой дополнительный тип услуги нужен?");
let servicePrice01 = +prompt("What is the price would you like to have for this service? / Сколько это будет стоить?");
let addService02 = prompt("What kind of service do you want to have else?/Какой дополнительный тип услуги нужен?");
let servicePrice02 = +prompt("What is the price would you like to have for this service? / Сколько это будет стоить?");
const fullPrice = Number(screenPrice) + Number(servicePrice01) + Number(servicePrice02);
const rollback = 10; //percent
const rollbackSum = fullPrice * (rollback/100);
const servicePercentPrice = Math.ceil(fullPrice - rollbackSum);

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(screenPrice, typeof screenPrice)
console.log("screenPrice: " + screenPrice + " euro", ", fullPrice: " + fullPrice + " euro");
console.log ("screens:" + screens.toLowerCase().split());
console.log("Rollback to mediator: " + rollbackSum + " euro");
console.log("servicePercentPrice: " + servicePercentPrice + " euro");

if (fullPrice > 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice > 15000 && fullPrice <= 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice >=0 && fullPrice <= 15000){
  console.log("Скидка не предусмотрена");
} else {
  console.log ("что-то пошло не так");
}
