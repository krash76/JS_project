"use strict";
const title = document.getElementsByTagName("h1")[0];
const buttons = document.getElementsByClassName("handler_btn");
const start_btn = buttons[0];
const reset_btn = buttons[1];
const screen_btn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRollback = document.querySelector(".rollback input[type ='range']");
const spanRollback = document.querySelector(".rollback span");
const totalInputPrice = document.getElementsByClassName("total-input")[0];
const totalInputScreensCount = document.getElementsByClassName("total-input")[1];
const totalInputCountOther = document.getElementsByClassName("total-input")[2];
const totalInputFullCount = document.getElementsByClassName("total-input")[3];
const totalInputCountRollback = document.getElementsByClassName("total-input")[4];
let screenSelectDiv = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  screensCount: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  rollback : 0,
  servicePricesPercent: 0, 
  servicePricesNumber: 0, 
  fullPrice: 0,
  servicePercentPrice: 0,

  addTitle:function() {
    document.title = title.textContent;
  },

  addScreens: function() {
    screenSelectDiv = document.querySelectorAll(".screen");
    screenSelectDiv.forEach(function(screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      if (select.value !== "" && input.value > 0) {
        appData.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: +input.value 
        });
      }
     // console.log(appData.screens) 
    });
  },

  addScreenBlock: function() {
    screenSelectDiv = document.querySelectorAll(".screen");
    const screenClone = screenSelectDiv[0].cloneNode(true);
    screenSelectDiv[screenSelectDiv.length-1].after(screenClone);
  },

  addServices: function() {
    otherItemsPercent.forEach(function(item) {
      const check = item.querySelector("input[type = checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type = text]");
      if ( check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    })
    otherItemsNumber.forEach(function(item) {
      const check = item.querySelector("input[type = checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type = text]");
      if ( check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    })
  },

  changeRollbackRange: function() {
    spanRollback.textContent = inputRollback.value + "%";
    appData.rollback = +inputRollback.value;
  },

  addPrices: function() {
    for(let screen of appData.screens) {
      appData.screenPrice  += +screen.price;
      appData.screensCount += +screen.count;
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += Math.ceil(appData.screenPrice * (appData.servicesPercent[key]/100)) ;
    }
    for (let key in appData.servicesNumber) {
    appData.servicePricesNumber += appData.servicesNumber[key];
    }
    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback/100));

  },

  showResult: function() {
    totalInputPrice.value = appData.screenPrice;
    totalInputScreensCount.value = appData.screensCount;
    totalInputCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalInputFullCount.value = appData.fullPrice;
    totalInputCountRollback.value = appData.servicePercentPrice;
  },

   init: function() {
    appData.addTitle();
    start_btn.addEventListener("click", () => {
      appData.screens = [];
      totalInputPrice.value = 0;
      totalInputScreensCount.value = 0;
      appData.start();
    }); 
    
    screen_btn.addEventListener("click", appData.addScreenBlock);
    inputRollback.addEventListener("input", appData.changeRollbackRange);
  },
 
  start: function() {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
   // appData.logging();
    appData.showResult();
  },
/*
  isString: function(el) {
    return((el) === null || el.trim().length === 0 || Boolean(Number(el)) === true || !isNaN(el));
  },

  getNumber: function(num) {
    return num = Number(num.trim());
  },

  logging: function() {
    console.log (this.screens );
    console.log ( "screens price:" + this.screenPrice);
    console.log(this.servicesPercent, this.servicesNumber);
    console.log ("services price: " + this.allServicePrices);
    console.log ("full price: " + this.fullPrice);
    console.log ("total price (excl. rollback): " + this.servicePercentPrice);
    console.log ("adaptive: " + this.adaptive)
  }
  */
}

appData.init();