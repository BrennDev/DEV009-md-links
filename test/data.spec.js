const { readFileMarkdown, calculateLinksStates, calculateBrokenLinksStats, checkMarkdownFile, validateLinks, extractDirectoryLinks, readDirectoryAndExtractFilesMd } = require('../data.js');
const axios = require('axios');

jest.mock('axios');

describe ('readFileMarkdown', () => {   
  it('Debería enviar un mensaje de error si el arcivo no se puede leer', () => {
    return readFileMarkdown('pruba.md')
    .catch((err) => {
      expect(err).toBe('error');
    });
  });
    
  it('Debería enviar los links encontrados en el archivo markdown', () => {
    const file = 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md';
    return readFileMarkdown(file).then (linkList => {
    expect(linkList).toEqual([
      {
        href: 'https://www.npmjs.com/package/markdown-it21',
        text: 'Markdown-it',
        file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md',
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md'
      },
      {
        href: 'https://www.npmjs.com/package/jsdom',
        text: 'JSDOM',
        file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md'
      },
      {
        href: 'https://cheerio.js.org/',
        text: 'Cheerio',
        file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md'
      },
      {
        href: 'https://marked.js.org/using_pr',
        text: 'custom renderer de la librería marked',
        file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md'
      }
    ]);
    });
  });
});

describe('checkMarkdownFile', () => {
  it('Debería retornar true si el archivo es markdown', () => {
    const file = 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md';
    const result = checkMarkdownFile(file);
  expect(result).toBe(true)
  });

  it('Debería retornar false si el archivo no es markdown', () => {
    const file = 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/thumb.png';
    const result = checkMarkdownFile(file);
  expect(result).toBe(false)
  });
});

describe ('validateLinks', () => {
  it('Debería retornar los links validados', () =>{
    const file= [
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
      }
    ]
    axios.get.mockResolvedValue({status:200})
    const expectedLinks = [
      {
        href: 'https://static.wikia.nocookie.net/studio-ghibli/images/c/c1/Castle_in_the_Sky.jpg',
        text: 'Castle in the Sky',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md',
        status: 200,
        statusText: '✅OK✅'
      },
      {
        href: 'https://static.wikia.nocookie.net/studio-ghibli/images/a/a5/Grave_of_the_Fireflies_Japanese_poster.jpg',
        text: 'Grave of the Fireflies',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md',
        status: 200,
        statusText: '✅OK✅'
      },
      {
        href: 'https://static.wikia.nocookie.net/studio-ghibli/images/a/a9/Only_Yesterday.jpg',
        text: 'Only Yesterday',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md',
        status: 200,
        statusText: '✅OK✅'
      }
    ];
    
    validateLinks(file).then((linkListValidate) => {
      expect(linkListValidate).toEqual(expectedLinks);
    })
  });

  it('Debería retornar los links que no son validados', () => {
    const list = [
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      },
      {
        href: 'https://www.npmjs.com/package/markdown-it21',
        text: 'Markdown-it',
        file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md'
      }
    ];
  
  axios.get.mockRejectedValue({status:404})
  const expectedLinks = [
    {
      href: 'https://marked.js.org/using_pr',
      text: 'custom renderer de la librería marked',
      file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
      status: 404,
      statusText: '❌FAIL❌'
    },
    {
      href: 'https://www.npmjs.com/package/markdown-it21',
      text: 'Markdown-it',
      file: 'C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md',
      status: 404,
      statusText: '❌FAIL❌'
    }
  ]
 return  validateLinks(list).catch((error) => {
    expect(error).toEqual(expectedLinks);
  });
})
});

describe ('readDirectoryAndExtractFilesMd', () => {
  it('Debería retornar el nuevo arreglo de archivos markdown de un directorio', () => {
    const array = readDirectoryAndExtractFilesMd("C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder");
    const expec = ['C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md']
    expect(array).toEqual(expec)
  });
  it('Debería retornar el nuevo arreglo de archivos markdown de un subdirectorio', () => {
    const array = readDirectoryAndExtractFilesMd("C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder");
    const expec = [
      "C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\fileTest.md",
      "C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\readmeTest.md",
      "C:\\Users\\Brenda\\Documents\\GitHub\\DEV009-md-links\\test-folder\\subfolder\\subfileTest.md"
    ]
    expect(array).toEqual(expec)
  });
});


describe ('calculateLinksStates', () => {
  it ('Debería calcular las estadisticas de  los links encontrados',  () => {
    const response = [
      { href: 'https://example.com/page1' },
      { href: 'https://example.com/page2' },
      { href: 'https://example.com/page1' }, 
    ];
    const result = calculateLinksStates(response);
    const expected = {
      total: 3,     
      unique: 2,    
    };
    expect(result).toEqual(expected);
  });
});

describe('calculateBrokenLinksStats', () => {
  it('debería calcular las estadísticas de enlaces rotos correctamente', () => {
    const response = [
      { href: 'https://example.com/page1', statusText: '❌FAIL❌' },
      { href: 'https://example.com/page2', statusText: '❌FAIL❌' },
      { href: 'https://example.com/page3', statusText: '✅OK✅' }, 
    ];

    const result = calculateBrokenLinksStats(response);
    const expected = {
      total: 3,    
      unique: 3,    
      broken: 2,    
    };
    expect(result).toEqual(expected);
  });
});