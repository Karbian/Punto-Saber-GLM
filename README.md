# Punto

Una plataforma de práctica en español creada a partir del archivo proporcionado `Pruebas de Estado.zip`.

## Contenido

- 60 preguntas interactivas de los cuadernillos de 2005-1, contrastadas con el archivo de respuestas incluido, `respuestas.xls`.
- 80 ejercicios adicionales: 60 preguntas seleccionadas de los cinco cuadernillos de 2023 proporcionados y 20 ejercicios originales de Punto sobre las habilidades abordadas en las dos sesiones de 2025. Las nuevas respuestas son soluciones elaboradas de manera independiente y no se atribuyen a una clave oficial.
- 140 preguntas distribuidas en cinco áreas: Matemáticas (26), Lectura (27), Ciencias Naturales (35), Ciencias Sociales (26) e Inglés (26).
- Práctica guiada con retroalimentación, simulacros configurables con límite de tiempo, revisión completa de respuestas, preguntas guardadas, progreso almacenado en el navegador, importación y exportación del progreso en JSON y resultados en CSV.
- Una biblioteca con buscador que reúne 111 archivos PDF únicos: 106 documentos históricos de 2003 a 2010 y cinco cuadernillos de 2023. Los archivos originales se conservan en `archive/`.
- Interfaz adaptable a distintos tamaños de pantalla y accesible mediante teclado; las opciones de respuesta pueden seleccionarse con las teclas numéricas del 1 al 4.

La agrupación por áreas tiene fines de estudio y no pretende reproducir el examen actual. Los resultados son porcentajes directos de aciertos en la práctica, no puntajes oficiales escalados. Las explicaciones son orientaciones didácticas elaboradas de manera independiente, no explicaciones oficiales del ICFES.

Las preguntas incluyen pequeñas adaptaciones para facilitar su lectura en pantalla; cada pregunta tomada de un cuadernillo incorpora un enlace y una referencia a la página del original.

En el material histórico de 2005-1:

- La pregunta 16 de Matemáticas fue retirada en el documento de origen y no se incluye.
- Las preguntas 21 a 24 de Matemáticas aceptan cualquiera de las dos alternativas indicadas expresamente en la clave histórica.
- Las preguntas 15 de Matemáticas y 8 de Lenguaje continúan excluidas mientras se revisan su formulación o su correspondencia con la clave.

## Ejecución y mantenimiento

El sitio es estático: la raíz del repositorio es también la raíz de publicación. No utiliza fuentes tipográficas, JavaScript ni CSS externos, y no cuenta con una base de datos en un servidor.

El progreso del usuario permanece en `localStorage`; no se comparte entre estudiantes, dispositivos ni navegadores. Las funciones de exportación e importación permiten transferirlo manualmente.

Ejecuta las comprobaciones con:

    node --test tests/*.test.mjs

Las pruebas de flujo ejecutan los controladores de la aplicación mediante un adaptador mínimo del DOM y no sustituyen las pruebas visuales en el navegador.

Para reconstruir el banco histórico de preguntas y el catálogo de fuentes, ejecuta:

    python scripts/prepare_bank.py '/ruta/al/archivo/Pruebas de Estado.zip'

Se requiere `xlrd` para leer el archivo histórico de respuestas. Los registros de preguntas históricas y sus explicaciones se mantienen en ese script, y el contenido estático generado se guarda en `bank.json`.

Al añadir preguntas, verifica su fuente, las respuestas aceptadas, el formato, la numeración y los permisos de uso para el público previsto.

Código fuente publicado: [Karbian/Punto-Saber-GLM](https://github.com/Karbian/Punto-Saber-GLM).

El proyecto está preparado para publicarse mediante GitHub Pages. En **Settings → Pages** del repositorio, selecciona:

- Método: **Deploy from a branch**.
- Rama: `main`.
- Carpeta: `/ (root)`.

El archivo `.nojekyll` permite la publicación estática directa. El sitio no requiere un proceso de compilación ni dependencias externas.

Para modificar la selección histórica de preguntas, actualiza `scripts/prepare_bank.py` y reconstruye el banco a partir del archivo original.

## Actualización del material de práctica

Los nuevos registros y sus soluciones desarrolladas se mantienen en `data/new-material.json`.

Ejecuta el siguiente comando para integrarlos en `bank.json` sin duplicarlos, incluso si ejecutas el proceso varias veces:

    python scripts/merge_material.py

La reconstrucción del banco histórico también realiza esta integración.

Conserva los cinco cuadernillos PDF de 2023 en `archive/2023-1/`. Se omitieron cuatro archivos duplicados.

Los dos cuadernillos escaneados de 2025 contienen una restricción de reproducción y no se incluyen en el repositorio público. Las habilidades que abordan sirvieron como referencia para crear ejercicios nuevos con redacción, contextos y valores originales.

El diseño y la hoja de estilos permanecen sin cambios. Se conservan los identificadores de las 60 preguntas originales y los metadatos de sus respuestas históricas para mantener la compatibilidad con el progreso almacenado en el navegador.

La pregunta 8 de Inglés de 2023 tiene tres opciones de respuesta, tal como corresponde; no se añade una opción adicional.

Las nuevas preguntas identifican su periodo de origen y el carácter independiente de sus soluciones tanto durante la práctica como en la revisión.

## Derechos de autor y licencia de uso no comercial

El software original de Punto y los recursos originales del proyecto se ofrecen bajo la licencia [PolyForm Noncommercial 1.0.0](LICENSE).

Consulta [COPYRIGHT.md](COPYRIGHT.md) para conocer el aviso de derechos de autor, la atribución obligatoria y el alcance exacto de la licencia.

La licencia permite usos no comerciales y autoriza expresamente los usos educativos y otros usos institucionales especificados en sus términos.

Al redistribuir el proyecto, conserva los términos de la licencia o su URL y el aviso obligatorio denominado `Required Notice`. Los usos que excedan estas autorizaciones requieren una licencia independiente.

Este es un **proyecto de código fuente disponible para usos no comerciales**, no software de código abierto bajo una licencia aprobada por la OSI.

Los cuadernillos del ICFES, las preguntas, las claves de respuestas, los fragmentos adaptados y otras obras de terceros conservan sus derechos originales y están **excluidos** de la licencia del proyecto. Sus condiciones de uso originales siguen siendo aplicables.
