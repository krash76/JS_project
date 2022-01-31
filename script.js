"use strict";

let title = prompt("What is the name of your project?", "new project");
const warning =()=> alert("please, enter your answer correctly");

while (title === null || title.trim().length === 0) {
  warning()  ;
  title = prompt("What is the name of your project?", "new project");
} 

let screens = prompt("What kind of screens (simple, comlicated, interactive) do you need?", "simple");
while (screens === null || screens.trim().length === 0 || Boolean(Number(screens)) === true) {
  warning();
  screens = prompt("What kind of screens (simple, comlicated, interactive) do you need?", "simple");
};

let screenPrice =prompt("What is the price of a screen would you like to have?", "1000");

while (screenPrice === NaN || Number(screenPrice) === 0 || Boolean(Number(screenPrice)) === false) {
  warning();
  screenPrice = prompt("What is the price of a screen would you like to have?", "1000");
};

let adaptive = confirm("It should be an adaptive site?");

//let addAnotherService = () => confirm("Would you like more service to have?"); //мне кажется логично сначала спросить нужны ли доп услуги вообще, поэтому для себя написала эту функцию
//addAnotherService();
//if ( addAnotherService === true) {
  
let addService01 = prompt("What kind of service do you want to have else?");
  while (addService01 === null || addService01.trim().length === 0 || Boolean(Number(addService01)) === true) {
  warning();
  addService01 = prompt("What kind of service do you want to have else?")
  };
  let servicePrice01 = prompt("What is the price would you like to have for this service?");
  while (servicePrice01 === NaN || Number(servicePrice01) < 0) {
  warning();
  servicePrice01 = Number(prompt("What is the price would you like to have for this service?"));
}

//};
//addAnotherService();
//if ( addAnotherService === true) {
  
let addService02 = prompt("What kind of service do you want to have else?");
  while (addService02 === null || addService02.trim().length === 0 || Boolean(Number(addService02)) === true) {
  warning();
  addService02 = prompt("What kind of service do you want to have else?");
  };
  let servicePrice02 = prompt("What is the price would you like to have for this service?");
  while (servicePrice02 === NaN  || Number(servicePrice02) < 0) {
    warning();
    servicePrice02 = prompt("What is the price would you like to have for this service?");
}   
//} 
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
