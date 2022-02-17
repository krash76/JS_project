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
const leftPart = document.querySelector(".main-controls.elements");
const cmsInput = document.querySelector ("#cms-open");
const cmsVariants = document.querySelector(".hidden-cms-variants");




const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  screensCount: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  rollback: 0,
  servicePricesPercent: 0, 
  servicePricesNumber: 0, 
  fullPrice: 0,
  servicePercentPrice: 0,

  addTitle:function() {
    document.title = title.textContent;
  },

  addScreens: function() {
    this.screens.length = 0;
    screenSelectDiv = document.querySelectorAll(".screen");
    screenSelectDiv.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      if (select.value !== "" && input.value > 0) {
        this.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: +input.value 
        })
      } else {
        alert ("внимание! не выбран тип экрана или не указано количество экранов");
      }
    })
  },

  addScreenBlock: function() {
    screenSelectDiv = document.querySelectorAll(".screen");
    const screenClone = screenSelectDiv[0].cloneNode(true);
    screenSelectDiv[screenSelectDiv.length-1].after(screenClone);
    screenClone.querySelector("input[type=text]").value = "";
  },

  addServices: function() {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type = checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type = text]");
      if ( check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    })
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type = checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type = text]");
      if ( check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    })
    
  },
/*
 addCms: function() {
    let cmsSelect = cmsVariants.querySelector("#cms-select");
    if (cmsInput.checked) {
      cmsVariants.style.display = "flex";
      cmsSelect.disabled = false;
    } else {
      cmsSelect.disable = true;
      cmsVariants.style.display = "none";
    }
    console.log (cmsSelect.value); //value = ""!!!

      if (cmsSelect.value !== "") {
        this.continueAddCms();
      }
  },

  contitnueAddCms: function() {
     let cmsSelect = cmsVariants.querySelector("#cms-select");
  
     console.log (cmsSelect.options[cmsSelect.selectedIndex].textContent);
      if (cmsSelect.value === "other") {

        let mainControlsInput = cmsVariants.querySelector(".main-controls__input");
        mainControlsInput.style.display = "flex";
        let cmsOtherInputPercent = mainControlsInput.querySelector("#cms-other-input");
        cmsOtherInputPercent.disabled = false;
      } else if (cmsSelect.value === "50") {
        console.log ("50")
      }
    }, 
    */
  
    changeRollbackRange: function() {
    spanRollback.textContent = inputRollback.value + "%";
    this.rollback = +inputRollback.value;
    this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback/100));
    totalInputCountRollback.value = this.servicePercentPrice;
  },

  addPrices: function() {
    for(let screen of this.screens) {
      this.screenPrice  += +screen.price;
      this.screensCount += +screen.count;
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += Math.ceil(this.screenPrice * (this.servicesPercent[key]/100)) ;
    }
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback/100));
  },

  showResult: function() {
    totalInputPrice.value = this.screenPrice;
    totalInputScreensCount.value = this.screensCount;
    totalInputCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    totalInputFullCount.value = this.fullPrice;
    totalInputCountRollback.value = this.servicePercentPrice;
  },

  init: function() {
    this.addTitle();
    start_btn.addEventListener("click", () => {
      this.screenPrice = 0;
      this.screensCount = 0;
      this.servicePricesPercent =0;
      this.servicePricesNumber = 0;
      this.fullPrice = 0;
      this.fullPrice = 0;
      this.start();
    }); 
    screen_btn.addEventListener("click", this.addScreenBlock);
    inputRollback.addEventListener("input",() => {
      const newChangeRollbackRange = this.changeRollbackRange.bind(this);
      newChangeRollbackRange();
    });
  },
 
  start: function() {
    this.addScreens();
    this.addServices();

    if (this.screens.length === screenSelectDiv.length) {
      const newAddPrices = this.addPrices.bind(this);
      
      newAddPrices();
      
    };
    this.showResult();
    if (totalInputPrice.value !== "0") {
      let leftInputs = leftPart.querySelectorAll("input[type= text]");
      let leftSelects = leftPart.querySelectorAll("select");
      this.disabled(leftInputs);
      this.disabled(leftSelects);
      start_btn.style.display = "none";
      reset_btn.style.display = "inline-block";
    };
  },

  disabled: function(arr) {
    arr.forEach((el) => {
      el.setAttribute("disabled", "true");
    })
  },

  reset: function () {
    let leftInputs = leftPart.querySelectorAll("input[type= text]");
    let leftSelects = leftPart.querySelectorAll("select");
    this.removeDisabled(leftInputs);
    this.removeDisabled(leftSelects);
    start_btn.style.display = "inline-block";
    reset_btn.style.display = "none";
    this.removeScreens();
    this.unCheck();
    inputRollback.value = 0;
    spanRollback.textContent = inputRollback.value;
    totalInputPrice.value = 0;
    totalInputScreensCount.value = 0;
    totalInputCountOther.value = 0;
    totalInputFullCount.value = 0;
    totalInputCountRollback.value = 0;
  },

  removeScreens: function() {
    screenSelectDiv.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      select.options[0].selected = true;
      input.value = "0";
      if (index > 0) {
        const mainViewDiv =document.querySelector(".main-controls__views.element") 
        mainViewDiv.removeChild(screen)};
    });
    screenSelectDiv = document.querySelectorAll(".screen");
    appData.screens = [];
  },

  unCheck: function() {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type = checkbox]");
      if ( check.checked) {
        check.checked = false;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type = checkbox]");
      if ( check.checked) {
        check.checked = false;
      }
    })
  },

  removeDisabled: function(arr) {
    arr.forEach((el) => {
      el.removeAttribute("disabled");
    })
  }
}

start_btn.setAttribute("style", "display: inline-block");
cmsInput.addEventListener("change", appData.addCms); 

const newInit = appData.init.bind(appData);
newInit();

const newReset = appData.reset.bind(appData);
reset_btn.addEventListener("click", newReset)