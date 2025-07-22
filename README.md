# CURP Widget – Validación de identidad

Este proyecto es un widget frontend embebible, desarrollado como SPA con React, diseñado para validar datos personales y consultar CURP a través de los servicios de Prometeo API.

## ¿Cómo se usa?

Este widget está pensado para ser embebido dentro de una página externa mediante un `<iframe>`, recibiendo los parámetros necesarios vía URL.

Ademas el widget CURP comunica eventos al sitio host mediante la API `window.postMessage`, en este caso lo hace cuando una consulta de CURP se realiza exitosamente. A continuación dejo el fagmento de codigo a agregar si se quiere utilizar esto.

```html
<script>
  window.addEventListener('message', (event) => {
    if (
      event.data?.event === 'curpValidated' &&
      event.origin === 'https://curp-widget.vercel.app'
    ) {
      alert('Consulta CURP exitosa');
    }
  });
</script>
```

### Ejemplo de uso completo

```html
<iframe
  src="https://curp-widget.vercel.app?APIKey=TU_API_KEY&lang=es"
  style="width: 100%; height: 600px; border: none"
  allow="clipboard-write"
></iframe>
```

A continuación dejo un HTML completo para copiar y pegar directamente

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Test del Widget CURP</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
      iframe {
        width: 100%;
        height: 600px;
        border: none;
      }
    </style>
  </head>
  <body>
    <h2>Widget CURP embebido</h2>

    <iframe
      src="curp-widget.vercel.app?APIKey=API_KEY&lang=en"
      allow="clipboard-write"
    ></iframe>

    <script>
      window.addEventListener('message', (event) => {
        if (
          event.data?.event === 'curpValidated' &&
          event.origin === 'https://curp-widget.vercel.app'
        ) {
          alert('Consulta CURP exitosa');
        }
      });
    </script>
  </body>
</html>
```

---

## Parámetros soportados

| Parámetro | Tipo     | Obligatorio | Descripción                     |
| --------- | -------- | ----------- | ------------------------------- |
| `APIKey`  | `string` | Sí          | Tu API Key personal de Prometeo |
| `lang`    | `string` | Opcional    | Idioma de la UI (`es` o `en`)   |

\*por default el idioma es `es`

---

## Funcionalidades

- Validación de CURP por código
- Validación de CURP por datos personales
- Visualización de resultado estructurado
- Soporte multilenguaje (`es`, `en`)
- Embebido vía iframe
- Comunicación con backend mediante proxy para evitar CORS

---

## Tecnologías utilizadas

| Tecnología          | Justificación                                                            |
| ------------------- | ------------------------------------------------------------------------ |
| **React + Vite**    | Rápido, modular, óptimo para SPA embebibles                              |
| **TypeScript**      | Seguridad de tipos, ideal para APIs externas                             |
| **Material UI**     | Componentes accesibles, responsivos, construir rapido                    |
| **React Hook Form** | Validación eficiente y controlada de formularios                         |
| **Zustand**         | Store simple para manejar estados como loading, error y resultado        |
| **Axios**           | Cliente HTTP robusto, con soporte para interceptores y manejo de errores |
| **i18next**         | Soporte multilenguaje, personalizable, integrado con React               |

---

## Estructura del proyecto

```
/src
  /components     → Inputs reutilizables
  /const          → Constantes compartidas
  /hooks          → Hooks personalizados
  /i18n           → Traducciones en es/en
  /layout         → Componentes de layout
  /navigation     → Rutas, paths y configuración de navegación con React Router
  /pages          → Pantallas
  /services       → Llamadas a API vía proxy interno
  /store          → Zustand stores separados por endpoint
  /types          → Tipos e interfaces de TypeScript

  /api
  proxy.mjs       → Backend en Vercel que maneja el CORS
```

---

## Proxy y CORS

La aplicación se comunica con la API de Prometeo a través de un proxy (`/api/proxy`) configurado como función serverless en Vercel. Esto permite evitar el problema de CORS que surge al hacer peticiones directas desde el navegador.

---

## Instalación local

```bash
git clone https://github.com/AgustinaGuerendiain/curp-widget
cd curp-widget
npm install
npm run dev
```

---

## Deploy

Este widget fue deployado en Vercel:

- URL pública
- API Serverless

---

## To Do / Mejoras posibles

- Agregar tests
- Autocompletado de datos
- Realizar un mejor manejo de datos de lo que se le envia al host.

---

## Consideraciones

Este proyecto fue desarrollado para simular un caso real de integración de un widget embebido y conectado a una API de terceros, contemplando seguridad, experiencia de usuario, accesibilidad y mantenibilidad del código.

---

## Autora

Agustina Guerendiain
