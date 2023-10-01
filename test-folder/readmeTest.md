## **Sugerencias de implementación**

La implementación de este proyecto tiene varias partes: leer del sistema de
archivos, recibir argumentos a través de la línea de comando, analizar texto,
hacer consultas HTTP, ... y todas estas cosas pueden enfocarse de muchas
formas, tanto usando librerías como implementando en VanillaJS.

Por poner un ejemplo, el parseado (análisis) del Markdown para extraer los
links podría plantearse de las siguientes maneras (todas válidas):

* Usando un módulo como
  [Markdown-it](https://www.npmjs.com/package/markdown-it21), que nos devuelve
  un arreglo de tokens que podemos recorrer para identificar los links.

* También podríamos usar una combinación de varios módulos (podría ser válido
  transformar el Markdown a HTML usando algo como [marked](https://github.com/markedjs/marked)
  y de ahí extraer los links con una librería de DOM como [JSDOM](https://www.npmjs.com/package/jsdom)
  o [Cheerio](https://cheerio.js.org/) entre otras).

* Usando un [custom renderer de la librería marked](https://marked.js.org/using_pr)
  (new marked.Renderer()).

* Siguiendo otro camino completamente diferente, podríamos usar expresiones
  regulares (RegExp).

No dudes en consultar a tus compañeras, coaches y/o el foro de la comunidad
si tienes dudas existenciales con respecto a estas decisiones. No existe una
"única" manera correcta 😉 Lo importante es que entiendas el código que escribes
para lograr la tarea.