"use strict";

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
      appData.screens.push({id: i, name, price});
    };
    for (let i = 0; i < 2; i++) {
      let price = 0;
      let name; 
      do { name = prompt("What kind of service do you want to have else? / Какой дополнительный тип услуги нужен?")
      } while (appData.isString(name));
      do { price = prompt("1What is the price would you like to have for this service? / Сколько это будет стоить?")
      } while (!appData.isNumber(price));
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

appData.start();