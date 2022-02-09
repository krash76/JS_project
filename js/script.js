"use strict";
const title = document.getElementsByTagName("h1")[0].textContent;
const buttons = document.getElementsByClassName("handler_btn");
const start_btn = buttons[0];
const reset_btn = buttons[1];
const screen_btn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRollback = document.querySelector(".rollback").children[0].children[0];
const spanRollback = document.querySelector(".rollback").children[0].children[1];
const totalInputPrice = document.getElementsByClassName("total-input")[0];
const totalInputCount = document.getElementsByClassName("total-input")[1];
const totalInputCountOther = document.getElementsByClassName("total-input")[2];
const totalInputFullCount = document.getElementsByClassName("total-input")[3];
const totalInputCountRollback = document.getElementsByClassName("total-input")[4];
let screen = document.querySelectorAll(".screen");


const appData = {
  title: "",
  screens: [],
  screenPrice: 0, 
  adaptive: true,
  services: {},
  rollback :  10,
  allServicePrices: 0, 
  fullPrice: 0,
  servicePercentPrice: 0,
  questionnaire: function () {
    do { appData.title = prompt("What is the name of your project? / Как называется ваш проект?", "new project")
    } while (appData.isString(appData.title));
    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;
      do {name = prompt("What kind of screens (simple, comlicated, interactive) do you need? / Какие типы экранов (простые, сложные, интерактивные) нужно разработать?" ,  "simple")
      } while (appData.isString(name));
      do { price = prompt("What is the price of a screen would you like to have? / Сколько будет стоить данная работа?")
      } while (!appData.isNumber(price));
      appData.screens.push({id: i, name: name, price});
    };
    for (let i = 0; i < 2; i++) {
      let name; 
      let price = 0;
      do { name = prompt("What kind of service do you want to have else? / Какой дополнительный тип услуги нужен?")
      } while (appData.isString(name));
      do { price = prompt("1What is the price would you like to have for this service? / Сколько это будет стоить?")
      } while (!appData.isNumber(price));
      name = `service_N${i+1}_${name}`;
      appData.services[name] = +price;
    }
    appData.adaptive = confirm("It should be an adaptive site? / Нужен ли адаптив на сайте?");
  },

  addPrices: function() {
    appData.screenPrice  = appData.screens.reduce((firstPrice, nextPrice) => Number(firstPrice.price) + Number(nextPrice.price));
    for (let key in appData.services) {
    appData.allServicePrices += appData.services[key];
    }
  },

  isString: function(el) {
    return((el) === null || el.trim().length === 0 || Boolean(Number(el)) === true || !isNaN(el));
  },

  isNumber: function(num) {
    return (!isNaN(parseFloat(num)) && isFinite(num));
  },

  getNumber: function(num) {
    return num = Number(num.trim());
  },

  getFullPrice: function() {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getTitle : function(el) {
  let str = el.trim().toLowerCase();
  appData.title = str[0].toUpperCase() + str.slice(1);
  },

  getServicePercentPrices: function() {
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback/100));
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
    appData.addPrices();
    appData.getTitle(appData.title);
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getRollbackMessage();
    appData.logging();
  },

  logging: function() {
    console.log (this.screens );
    console.log ( "screens price:" + this.screenPrice);
    console.log(this.services);
    console.log ("services price: " + this.allServicePrices);
    console.log ("full price: " + this.fullPrice);
    console.log ("total price (excl. rollback): " + this.servicePercentPrice);
    console.log ("adaptive: " + this.adaptive)
  }
}

//appData.start();