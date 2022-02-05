"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0, 
  adaptive: true,
  addService01: "",
  addService02: "",
  servicePrice01: 0, 
  servicePrice02: 0,
  rollback :  10,
  allServicePrices: 0, 
  fullPrice: 0,
  servicePercentPrice: 0,
  questionnaire: function () {
    appData.title = prompt("What is the name of your project? / Как называется ваш проект?", "new project");
    appData.screens = prompt("What kind of screens (simple, comlicated, interactive) do you need? / Какие типы экранов (простые, сложные, интерактивные) нужно разработать?" ,  "simple");
    do {appData.screenPrice = prompt("What is the price of a screen would you like to have? / Сколько будет стоить данная работа?")
    } while (!appData.isNumber(appData.screenPrice));    
    appData.adaptive = confirm("It should be an adaptive site? / Нужен ли адаптив на сайте?");
    return appData.screenPrice = appData.getNumber(appData.screenPrice);
  },
  isNumber: function(num) {
    return (!isNaN(parseFloat(num)) && isFinite(num));
  },
  getNumber: function(num) {
    return num = Number(num.trim());
  },
  getAllServicePrices: function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      if ( i === 0) {
        appData.addService01 = prompt("1What kind of service do you want to have else? / Какой дополнительный тип услуги нужен?");
        do {appData.servicePrice01 = prompt("1What is the price would you like to have for this service? / Сколько это будет стоить?")
        } while (!appData.isNumber(appData.servicePrice01)); 
        appData.servicePrice01 = appData.getNumber(appData.servicePrice01);
      } else if (i === 1) {
        appData.addService02 = prompt("2What kind of service do you want to have else?/Какой дополнительный тип услуги нужен?");
        do {appData.servicePrice02 = prompt("2What is the price would you like to have for this service? / Сколько это будет стоить?")
        } while (!appData.isNumber(appData.servicePrice02)) 
        appData.servicePrice02 = appData.getNumber(appData.servicePrice02);
      }
    }
    return sum += appData.servicePrice01 + appData.servicePrice02;
  },
  getFullPrice: function() {
    return (appData.screenPrice + appData.allServicePrices);
  },
  getTitle : function(el) {
  let str = el.trim().toLowerCase();
  return appData.title = str[0].toUpperCase() + str.slice(1);
  },
  getServicePercentPrices: function() {
    return Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback/100));
  },
  getRollbackMessage: function() {
    if (appData.fullPrice > 30000) {
      console.log("discount 10% / Даем скидку в 10%");
    } else if (appData.fullPrice > 15000 && appData.fullPrice <= 30000) {
      console.log("Discount 5% / Даем скидку в 5%");
    } else if (appData.fullPrice >=0 && appData.fullPrice <= 15000) {
      console.log("No discount / Скидка не предусмотрена");
    } else {
      console.log("something went wrong / что-то пошло не так");
    }
  },
  start: function() {
    appData.questionnaire();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.getRollbackMessage();
    appData.logging();
  },  
  logging: function() {
    for (let key in appData) {
      console.log (key + ":" + appData[key])
    }
  }
}

appData.start();
