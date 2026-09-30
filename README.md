# Fatture: frontend

Interfaz web de [Fatture](https://github.com/salvaromanelli/cakephp-fatture-app), la app de gestión de facturas. Consume la API del backend en CakePHP.

## Páginas

- **Dashboard**: totales, facturas pagadas y pendientes.
- **Facturas**: listado de facturas.
- **Detalle**: una factura con sus datos.
- **Nueva factura**: formulario de creación.

## Stack

React 18 · React Router · Axios · Tailwind CSS · Vite · Netlify

## Cómo correrlo

```bash
git clone git@github.com:salvaromanelli/cakephp-fatture-frontend.git
cd cakephp-fatture-frontend
npm install
echo "VITE_API_URL=http://localhost:8080" > .env.local   # el backend en Docker corre en el 8080
npm run dev
```

Para probar contra el backend en AWS y otros entornos, mirá [README-API-CONNECTION.md](README-API-CONNECTION.md).
