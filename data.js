const path= require('path');
const fs = require('fs');
const axios = require('axios');
const { readdirSync } = fs;

const checkMarkdownFile = function(file){
    for (let i = 0; i < markdownExtensions.length; i++){
       if (path.extname(file) === markdownExtensions[i]){
            return true;
       } else{
            return false;
       }
    }
};

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
        //console.log(linkList);
        resolve(linkList); 
      }
    })

  })
    
}

function validateLinks(linkList) {
  const validatePromises = linkList.map((link) => {
    return axios.head(link.href)
    .then((response) => {
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: response.status,
        statusText: response.statusText
      }
    })
    .catch((error) => {
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: error.response ? error.response.status: 'no response',
        statusText: 'Fail'
      }
    })
  })
  return Promise.all(validatePromises);
}

const readDirectoryAndExtractFilesMd = (file) => {
  let newArray = [];
  let array = readdirSync(file);
  array.forEach((item) => {
    const newPath = path.resolve(file, item);
    if (path.extname(newPath) === ".md") {
      newArray.push(newPath);
    } 
  })
  return newArray;
}

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


module.exports = { checkMarkdownFile, readFileMarkdown, validateLinks, readDirectoryAndExtractFilesMd, extractDirectoryLinks  }