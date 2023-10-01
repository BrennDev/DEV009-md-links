const {mdLinks} = require('../index.js');

const pathDontExist = ('/rutanoexistente.md');
const pathFile = ('test-folder/readmeTest.md');
const directoryPath = ('test-folder');
const invalidFile = ('thumb.png')


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

  it('Deberia rechazar cuando no existe path', () => {
    return mdLinks(pathDontExist).catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  });

  it('Debería retornar una lista de objetos que contengan las propiedades: href, text y file', () => {
    return mdLinks(pathFile, false).then (linkList => {
    expect(linkList).toEqual([
      {
        href: 'https://www.npmjs.com/package/markdown-it21',
        text: 'Markdown-it',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://www.npmjs.com/package/jsdom',
        text: 'JSDOM',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://cheerio.js.org/',
        text: 'Cheerio',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://marked.js.org/using_pr',
        text: 'custom renderer de la librería marked',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      }
    ]);
    });
  });

  it('Debería retornar una lista de objetos validados que contengan las propiedades: href, text, file, status y statusText', () => {
    return mdLinks(pathFile, true).then (linkList => {
    expect(linkList).toEqual([
      {
        href: 'https://www.npmjs.com/package/markdown-it21',
        text: 'Markdown-it',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 404,
        statusText: '❌FAIL❌',
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 200,
        statusText: '✅OK✅',
      },
      {
        href: 'https://www.npmjs.com/package/jsdom',
        text: 'JSDOM',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 200,
        statusText: '✅OK✅',
      },
      {
        href: 'https://cheerio.js.org/',
        text: 'Cheerio',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 200,
        statusText: '✅OK✅',
      },
      {
        href: 'https://marked.js.org/using_pr',
        text: 'custom renderer de la librería marked',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 404,
        statusText: '❌FAIL❌',
      }
    ]);
    });
  });

  it('Debería retornar una lista de objetos del directorio que contengan las propiedades: href, text y file', () => {
    return mdLinks(directoryPath, false).then (linksDirectory => {
    expect(linksDirectory).toEqual([
      {
        href: 'https://static.wikia.nocookie.net/studio-ghibli/images/c/c1/Castle_in_the_Sky.jpg',
        text: 'Castle in the Sky',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md'
      },
      {
        href: 'https://static.wikia.nocookie.net/studio-ghibli/images/a/a5/Grave_of_the_Fireflies_Japanese_poster.jpg',
        text: 'Grave of the Fireflies',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md'
      },
      {
        href: 'https://static.wikia.nocookie.net/studio-ghibli/images/a/a9/Only_Yesterday.jpg',
        text: 'Only Yesterday',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md'
      },
      {
        href: 'https://www.npmjs.com/package/markdown-it21',
        text: 'Markdown-it',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://www.npmjs.com/package/jsdom',
        text: 'JSDOM',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://cheerio.js.org/',
        text: 'Cheerio',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://marked.js.org/using_pr',
        text: 'custom renderer de la librería marked',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://www.serebii.net/pokemongo/pokemon/001.png',
        text: 'bulbasaur',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md'
      },
      {
        href: 'https://www.serebii.net/pokemongo/pokemon/002.png',
        text: 'ivysaur',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md'
      },
      {
        href: 'https://www.serebii.net/pokemongo/pokemon/003.png',
        text: 'venusaur',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md'
      },
      {
        href: 'https://www.serebii.net/pokemongo/pokemon/003.png',
        text: 'venusaur',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md'
      }
    ]);
    });
  });

  it('Debería retornar una lista de objetos validados del directorio que contengan las propiedades: href, text, file, status y statusText', () => {
    return mdLinks(directoryPath, true).then (linksDirectory => {
    expect(linksDirectory).toEqual([
      {
        href: 'https://static.wikia.nocookie.net/studio-ghibli/images/c/c1/Castle_in_the_Sky.jpg',
        text: 'Castle in the Sky',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md',
        status: 200,
        statusText: '✅OK✅',
      },
      {
        href: 'https://static.wikia.nocookie.net/studio-ghibli/images/a/a5/Grave_of_the_Fireflies_Japanese_poster.jpg',
        text: 'Grave of the Fireflies',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md',
        status: 200,
        statusText: '✅OK✅',
      },
      {
        href: 'https://static.wikia.nocookie.net/studio-ghibli/images/a/a9/Only_Yesterday.jpg',
        text: 'Only Yesterday',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md',
        status: 200,
        statusText: '✅OK✅',
      },
      {
        href: 'https://www.npmjs.com/package/markdown-it21',
        text: 'Markdown-it',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 404,
        statusText: '❌FAIL❌',
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 200,
        statusText: '✅OK✅',
      },
      {
        href: 'https://www.npmjs.com/package/jsdom',
        text: 'JSDOM',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 200,
        statusText: '✅OK✅',
      },
      {
        href: 'https://cheerio.js.org/',
        text: 'Cheerio',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 200,
        statusText: '✅OK✅',
      },
      {
        href: 'https://marked.js.org/using_pr',
        text: 'custom renderer de la librería marked',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
        status: 404,
        statusText: '❌FAIL❌',
      },
      {
        href: 'https://www.serebii.net/pokemongo/pokemon/001.png',
        text: 'bulbasaur',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md',
        status: 200,
        statusText: '✅OK✅'
      },
      {
        href: 'https://www.serebii.net/pokemongo/pokemon/002.png',
        text: 'ivysaur',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md',
        status: 200,
        statusText: '✅OK✅'
      },
      {
        href: 'https://www.serebii.net/pokemongo/pokemon/003.png',
        text: 'venusaur',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md',
        status: 200,
        statusText: '✅OK✅'
      },
      {
        href: 'https://www.serebii.net/pokemongo/pokemon/003.png',
        text: 'venusaur',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md',
        status: 200,
        statusText: '✅OK✅'
      }
    ]);
    });
  });

  it('Debería indicar que la ruta es no es un archivo markdown', () => {
    return mdLinks(invalidFile).catch((reject) => {
      expect(reject).toBe('La ruta no es un archivo markdown');
    })
  });

});
