"use strict";

const title = "JS project";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 100;
const rollback = 20; //percent
const fullPrice = 10000;
const adaptive = true; 

const rollbackSum = fullPrice * (rollback/100);

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(screenPrice + " euro");
console.log (screens.toLowerCase().split());
console.log("Rollback to mediator: " + rollbackSum + " euro");

//alert (title + ": homework Lesson 01");
//console.log("hw_01 done");