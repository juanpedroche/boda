# boda.juanpedroche.dev

Web de nuestra boda: información del día y enlace al formulario de confirmación (Google Forms).

## 1. Personalizar

Abre `index.html` y busca `[` — todo lo que está entre corchetes es texto de ejemplo:
nombres, fecha, lugares, enlaces de Google Maps, enlace del formulario, correo, etc.
Cambia también `WEDDING_DATE` al final del archivo para que la cuenta atrás sea correcta.

## 2. Crear el Google Form

1. Ve a <https://forms.google.com> → formulario en blanco.
2. Preguntas recomendadas:
   - **Nombre y apellidos** (respuesta corta, obligatoria)
   - **¿Vas a venir?** (opción múltiple: Sí / No, obligatoria)
   - **¿Cuántas personas sois?** (desplegable: 1, 2, 3, 4…)
   - **Nombres de los acompañantes** (párrafo)
   - **Alergias o intolerancias** (casillas: Ninguna, Gluten, Lactosa, Frutos secos, Marisco, Vegetariano, Vegano, Otra…)
   - **Comentarios** (párrafo, opcional)
3. Pestaña *Respuestas* → *Vincular con Hojas de cálculo* para tener todo en un Google Sheet.
4. **Enviar** → icono de enlace → *Acortar URL* → copia el enlace `https://forms.gle/...`
   y pégalo en el botón "Abrir formulario" de `index.html`.

## 3. Subir a GitHub Pages

1. Crea un repositorio público en GitHub, por ejemplo `boda`.
2. Sube `index.html` y `CNAME` (este último ya contiene `boda.juanpedroche.dev`).
   ```bash
   git init
   git add .
   git commit -m "Web de la boda"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/boda.git
   git push -u origin main
   ```
3. En el repo: **Settings → Pages** → *Source: Deploy from a branch* → `main` / `(root)` → Save.
4. En **Custom domain** debería aparecer `boda.juanpedroche.dev` (lo lee del archivo `CNAME`).

## 4. Configurar el DNS en Cloudflare

En el panel de Cloudflare → `juanpedroche.dev` → **DNS → Records → Add record**:

| Tipo  | Nombre | Destino                 | Proxy                    |
|-------|--------|-------------------------|--------------------------|
| CNAME | `boda` | `TU_USUARIO.github.io`  | **DNS only** (nube gris) |

> Importante: deja la nube **gris** (DNS only) al principio. GitHub necesita ver el
> dominio directamente para emitir el certificado HTTPS. Los dominios `.dev` **obligan**
> a usar HTTPS, así que sin certificado la web no cargará.

Después, en GitHub **Settings → Pages**, espera a que desaparezca el aviso del certificado
(de unos minutos a ~1 hora) y marca **Enforce HTTPS**.

Si más adelante quieres activar el proxy de Cloudflare (nube naranja), pon antes en
Cloudflare **SSL/TLS → Overview → Full (strict)** para evitar bucles de redirección.

## 5. (Recomendado) Verificar el dominio en GitHub

Evita que otra persona pueda usar subdominios de `juanpedroche.dev` en su GitHub Pages:

1. GitHub → tu foto → **Settings → Pages → Add a domain** → `juanpedroche.dev`.
2. GitHub te dará un registro **TXT** (`_github-pages-challenge-TU_USUARIO`).
   Añádelo en Cloudflare DNS y pulsa *Verify*.

## Para otros proyectos del curso

Repite el mismo proceso con otro subdominio (p. ej. `proyecto1.juanpedroche.dev`):
nuevo repo + archivo `CNAME` + registro CNAME en Cloudflare apuntando a `TU_USUARIO.github.io`.
