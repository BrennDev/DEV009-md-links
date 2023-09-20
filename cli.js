const { mdLinks } = require('./index.js');
mdLinks('test-folder', true).then((resolve) =>{
    console.log(resolve);
})
.catch((error) => {
    console.log(error);
})