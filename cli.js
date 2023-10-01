#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { calculateBrokenLinksStats } = require('./data.js');
const { calculateLinksStates } = require('./data.js');
const color = require('ansi-colors');

const path = process.argv[2];
const options = process.argv;
const validate = options.includes("--validate") ? true : false;
const stats = options.includes("--stats") ? true : false;
mdLinks(path, validate)
.then((resolve) =>{
  if(validate && stats){
    console.log(color.cyan("Validación y estadísticas de los links:"));
    console.log(resolve);
    console.log(color.cyan("Estadísticas básicas de los links:"));
    console.log(calculateBrokenLinksStats(resolve));
  } else if (stats) {
    const stats = calculateLinksStates(resolve);
    console.log(color.cyan("Estadísticas básicas de los links:"));
    console.log(stats);
  }else{
    console.log(color.cyan("Links encontrados:"));
    console.log(resolve);
  }
})
.catch((error) => {
  console.error(color.red("Se produjo un error:"));
  console.log(error);
})