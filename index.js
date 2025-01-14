const fs = require('fs');
const path = require('path');
const { checkMarkdownFile, readFileMarkdown, validateLinks, readDirectoryAndExtractFilesMd, extractDirectoryLinks } = require('./data.js');


const mdLinks = (filePath, options) => {
return new Promise((resolve, reject) => {
  // Chequear o convertir a una ruta absoluta
  const absolutePath = path.resolve(filePath);
  // Identifica si la ruta existe.
  if (fs.existsSync(absolutePath)) {
    // Constante a validar si es un archivo o directorio
    const fileOrDir = fs.statSync(absolutePath);
    // Probar si es archivo tiene extension md
    if (fileOrDir.isFile() && checkMarkdownFile(absolutePath)){
      if (options === true){
        let promiseChain = Promise.resolve();
        promiseChain = promiseChain
        // Lectura del archivo Markdown
        .then(() => readFileMarkdown(absolutePath))
        // Obtener los links del archivo
        .then((listLinks) => validateLinks(listLinks))
        // Validar los links
        .then((listLinksValidate) => {
          resolve(listLinksValidate);
        })
        .catch((error) => {
          reject(error);
        })      
    } else {
      resolve(readFileMarkdown(absolutePath))
    }
        
    } else if (fileOrDir.isDirectory()){
      // Si es un directorio filtrar los archivos md
      const linksDirectory = extractDirectoryLinks(absolutePath)
      if (options === true){
        let promiseDir = Promise.resolve ()
        promiseDir = promiseDir
        .then(() => extractDirectoryLinks(absolutePath))
        .then((flatArray) => validateLinks(flatArray))
        .then ((validateLinksDirectory) => {
          resolve (validateLinksDirectory)
        })
      } else{
        resolve(linksDirectory);
      }
    } else {
      reject('La ruta no es un archivo markdown');
    }

  } else {
    // Si no existe la ruta rechaza la promesa.
    reject('La ruta no existe');

  }
});
}
module.exports =  {
  mdLinks
};
