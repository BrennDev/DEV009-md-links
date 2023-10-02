# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Diagrama de flujo](#3-diagrama-de-flujo)
* [4. Guía de instalación](#4-guia-de-instalación)
* [5. Guía de uso](#5-guía-de-uso)
* [6. Organización y planeación del proyecto](#6-organización-y-planeación-del-proyecto)
* [7. Test](#7-test)

***

## 1. Preámbulo

Markdownes un lenguaje de marcado ligero muy popular entre developers. Es usado en
muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, etc.) y
es muy común encontrar varios archivos en ese formato en cualquier tipo de
repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

![MdLinks](/images/logoMdLinks.png)


## 2. Resumen del proyecto

En este proyecto desarrollarás una librería en Node.js que funciona como
herramienta para analizar links dentro de archivos Markdown. Esta librería
esta disponible de dos formas: como un módulo publicado en GitHub, que las
usuarias podrán instalar e importar en otros proyectos, y como una interfaz
de línea de comandos (CLI) que permitirá utilizar la librería directamente
desde el terminal.



## 3. Diagrama de flujo

Se realizó el diagrama de flujo como se presenta a continuación:

![diagrama de flujo](/images/diagramaFlujo.gif)


## 4. Guía de instalación

```sh
npm i BrennDev/DEV009-md-links
```

## 5. Guía de uso

-**Uso de la línea de comandos**
El ejecutable de la aplicación de realiza en la terminal de la siguiente manera:

`mdLinks <path-to-file>`

Por ejemplo:
```sh
mdLinks test-folder
```

![links de mdLinks](/images/1-links.gif)


#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para averiguar si el link funciona o no. 
Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok. 

![links validados](/images/2-linksValidados.gif)


##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadisticas básicas sobre los links.

![links stats](/images/4-EstadisticasLinks.gif)

#### `--validate` `--stats`

Si se colocá `--validate` `--stats` se obtienen los links validados y las estadisticas basicas.

![links validate y stats](/images/3-linksValidadosEstadisticas.gif)


## 6. Organización y planeación del proyecto

La planeación y organización del proyecto se realizó a traves de Github proyects. 

![planeación](/images/planeacion.png)


## 7. Test

Los test unitarios cubren un mínimo del 70% de coverage tests.

![test](/images/5-Test.gif)