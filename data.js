const path= require('path');
const fs = require('fs');
const axios = require('axios');
const { readdirSync, statSync } = fs;
// Función que verifica que los archivos tengan formato markdown
const checkMarkdownFile = function(file){
    for (let i = 0; i < markdownExtensions.length; i++){
       if (path.extname(file) === markdownExtensions[i]){
            return true;
       } else{
            return false;
       }
    }
};
// Extensiones markdown
const markdownExtensions = [
    '.md',
    '.mkd',
    '.mdwn',
    '.mdown',
    '.mdtxt',
    '.mdtext',
    '.markdown',
    '.text',
]
// Función que lee el contenido del archivo .md, extrae los enlaces
const readFileMarkdown = function(file){
  return new Promise ((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err,data)=>{
      if (err){
        reject ('error',err);
      } else{
        const regularExpression = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
        const linkList = [];
        let match;
      
        while ((match = regularExpression.exec(data)) !== null) {
          const text = match[1];
          const href = match[2];
          const arrayObjects = {
            href: href,
            text: text,
            file: file,
          };
          linkList.push(arrayObjects);
        }
        resolve(linkList); 
      }
    })
  })
}
// Función que hace la validación de los links
function validateLinks(linkList) {
  const validatePromises = linkList.map((link) => {
    return axios.get(link.href)
    .then((response) => {
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: response.status,
        statusText: "✅OK✅"
      }
    })
    .catch((error) => {
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: error.response ? error.response.status: 'no response',
        statusText: "❌FAIL❌"
      }
    })
  })
  return Promise.all(validatePromises);
}
// Función que lee un directorio y busca archivod con extensión markdown
const readDirectoryAndExtractFilesMd = (file) => {
  let newArray = [];
  let subDirectories = [];
  let array = readdirSync(file);
  array.forEach((item) => {
    const newPath = path.resolve(file, item);
    if (path.extname(newPath) === ".md") {
      newArray.push(newPath);
    } else if (statSync(newPath).isDirectory()) {
      subDirectories = readDirectoryAndExtractFilesMd(newPath);
      if (subDirectories.length > 0){
        newArray.push(...subDirectories);
      }
    }
  })
  return newArray;
}
// Función que extrae los links de un directorio
const extractDirectoryLinks = (directoryPath) => {
  const array = readDirectoryAndExtractFilesMd(directoryPath);
  const arrayLinks = array.map((link) => readFileMarkdown(link));
  return Promise.all(arrayLinks).then((arrayOfArrays) => {
    const flatArray = arrayOfArrays.reduce(
      (accumulator,currentArray) => [...accumulator, ...currentArray],
      []
    );
  return flatArray
  });
};
//Función que calcula las estadisticas básicas de los links encontrados, incluyendo el número total de links encontrados y el número de links únicos.
const calculateLinksStates = (response) => {
  return {
    total: response.length,
    unique: new Set(response.map(({ href }) => href)).size,
  };
};
// Función que calcula las estadísticas de los links encontrados, incluyendo la cantidad total de links, la cantidad de links únicos y la cantidad de links rotos o no funcionales.
const calculateBrokenLinksStats = (response) => {
  const brokens = response.filter((link) => link.statusText === "❌FAIL❌").length;
  return {
    total: response.length,
    unique: new Set(response.map(({ href }) => href)).size,
    broken: brokens,
  };
};

module.exports = { checkMarkdownFile, readFileMarkdown, validateLinks, readDirectoryAndExtractFilesMd, extractDirectoryLinks, calculateLinksStates, calculateBrokenLinksStats  }