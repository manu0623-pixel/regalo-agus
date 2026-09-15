# Regalo para Agus 🎂

Sitio con un juego de plataformas 2D: Agus camina por un mapa, salta pozos y esquiva pinches, y va juntando gemas doradas que desbloquean recuerdos (fotos, videos o mensajes). Al llegar a la bandera final se abre un "corcho de recuerdos" con todo lo que fue desbloqueando.

## Cómo probarlo

Simplemente abrí `index.html` con doble clic (funciona sin internet, en cualquier navegador). También podés abrirlo en el celu mandándotelo por WhatsApp/mail o copiando la carpeta.

## Cómo personalizar contenido

Todo el contenido editable está arriba del todo en **`script.js`**, en el objeto `CONFIG`. No hace falta tocar el resto del código.

- `CONFIG.friendName`: el nombre que aparece en el título.
- `CONFIG.intro.photo`: foto de portada.
- `CONFIG.rewards`: las 4 recompensas (una por gema dorada). Cada una puede ser:
  - `{ type: "text", message: "..." }` → solo un mensaje.
  - `{ type: "image", src: "...", caption: "...", message: "..." }` → una foto.
  - `{ type: "video", src: "...", caption: "...", message: "..." }` → un video.
- `CONFIG.finale.finalMessage`: el mensaje/video final que aparece cuando se juntaron las 4 gemas doradas.

### Dónde poner las fotos y videos

Poné los archivos en estas carpetas con estos nombres exactos (o cambiá el nombre en `CONFIG` si preferís otros):

- `assets/images/portada.jpg` — foto de portada
- `assets/images/reward2.jpg` — recompensa 2
- `assets/videos/reward4.mp4` — recompensa 4
- `assets/videos/final.mp4` — video final

Si un archivo no existe todavía, la página muestra automáticamente un cartelito de "reemplazá esta foto/video" en su lugar — no rompe nada, así que podés ir probando el juego antes de tener todo el contenido final.

## Cómo editar el mapa del juego (opcional)

Las plataformas, pozos, pinches, cajones y posición de las gemas están definidas en `script.js` en las constantes `PLATFORMS`, `SPIKES`, `GEMS`, `REWARD_GEMS` y `FLAG`, todas en píxeles "de mundo" (0 a 2600 de ancho). No hace falta tocarlas si no querés cambiar el diseño del nivel.

## Deploy gratis (para tener un link permanente)

Ver instrucciones de GitHub Pages — pendiente de confirmar contigo el nombre del repositorio.
