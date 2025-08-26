# Testing de conexión con backend CakePHP

Para probar la conexión con tu backend CakePHP en AWS:

## 1. Configuración Local
```bash
# Copia este contenido a tu archivo .env
VITE_API_URL=https://TU-BACKEND-AWS-URL.com
```

## 2. Testing con diferentes entornos

### Desarrollo local (con backend local):
```bash
echo "VITE_API_URL=http://localhost:8000" > .env.local
npm run dev
```

### Testing con AWS:
```bash
echo "VITE_API_URL=https://tu-backend-aws.com" > .env.local  
npm run dev
```

### Build de producción:
```bash
# Actualizar .env.production con la URL de AWS
npm run build
```

## 3. Endpoints que tu backend CakePHP debe exponer:

- `GET /api/invoices` - Listar facturas
- `GET /api/invoices/:id` - Detalle de factura
- `POST /api/invoices` - Crear nueva factura
- `PUT /api/invoices/:id` - Actualizar factura
- `DELETE /api/invoices/:id` - Eliminar factura
- `GET /health` o `/ping` - Health check

## 4. Configuración CORS en CakePHP

Asegúrate que tu backend tenga configurado CORS para permitir requests desde tu frontend:

```php
// En config/app_local.php o en middleware
$allowedOrigins = [
    'http://localhost:5173',  // Vite dev server
    'https://tu-app.netlify.app'  // Tu dominio de producción
];
```

## 5. Testing de conectividad

Una vez actualizada la URL, ve al Dashboard y usa el componente "Conexión API Backend" para probar la conectividad.
