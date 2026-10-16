# Completar la publicación en Tech-GLM

El repositorio existe: https://github.com/Tech-GLM/Punto-Saber-GLM

Esta carpeta contiene la versión completa: 60 preguntas interactivas, los 106 PDFs originales, las claves, el script para reconstruir el banco y las pruebas.

## Publicación automática desde tu computador

1. Descomprime todo el ZIP.
2. Instala GitHub CLI desde https://cli.github.com si no lo tienes.
3. Abre Terminal en la carpeta descomprimida y ejecuta `bash publish.sh`.
4. Completa el inicio de sesión de GitHub cuando lo solicite.

El script clona el repositorio existente, incorpora los archivos completos sin borrar archivos ajenos, ejecuta las pruebas si Node está disponible, crea un commit, lo sube y configura Pages con `main` y `/ (root)`. Requiere acceso de escritura y administración de Pages en Tech-GLM. No contiene credenciales ni solicita contraseñas por chat.

## Publicación manual

Sube el contenido de esta carpeta al repositorio conservando sus subcarpetas. Luego abre Settings → Pages → Deploy from a branch → main → / (root) → Save. No subas solamente el ZIP: GitHub Pages necesita los archivos descomprimidos.

La publicación anterior quedó incompleta por un bloqueo de seguridad del navegador automatizado. Verificación realizada: el código, assets, tests, scripts y las colecciones 2003-1, 2003-2 y 2005-1 estaban confirmados en GitHub. Aún faltaban las colecciones 2004-1, 2004-2, 2005-2 y 2010-1.
