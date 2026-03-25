# Despliegue en Vercel

## Configuración Requerida

### Variables de Entorno en Vercel
Configura estas variables en el dashboard de Vercel:

1. **MONGODB_URI**
   - Tu cadena de conexión a MongoDB Atlas
   - Ejemplo: `mongodb+srv://username:password@cluster.mongodb.net/database_name`

2. **JWT_SECRET**
   - Una clave secreta para JWT tokens
   - Ejemplo: `your-super-secret-jwt-key-here`

3. **NODE_ENV**
   - Valor: `production`

## Estructura del Proyecto

```
NODE_JS/
├── frontend/          # Aplicación React con Vite
├── backend/           # API REST con Express
├── api/              # Functions serverless para Vercel
├── vercel.json       # Configuración de despliegue
└── package.json      # Dependencias principales
```

## Flujo de Despliegue

1. **Instalación**: Vercel instala dependencias del package.json principal
2. **Build**: Construye el frontend con Vite
3. **API**: Despliega functions serverless desde `/api`
4. **Rutas**: Configura routing entre frontend y API

## Comandos Útiles

### Desarrollo Local
```bash
npm run install-all  # Instala todas las dependencias
npm run dev          # Inicia frontend y backend
```

### Build para Producción
```bash
npm run build        # Construye el frontend
```

## Solución de Problemas

### Error: "vite: command not found"
- ✅ Solucionado: Vite está incluido en devDependencies del package.json principal
- ✅ El build se ejecuta desde el directorio frontend

### Error: "Cannot find module"
- ✅ Solucionado: Todas las dependencias del backend están en el package.json principal

### Error de conexión a API
- ✅ Solucionado: Variable VITE_API_URL configurada para producción

## Arquitectura Serverless

El backend está adaptado para funcionar como funciones serverless en Vercel:

- **Entrada**: `/api/index.js` - Función serverless principal
- **Rutas**: Todas las rutas `/api/*` se redirigen al backend
- **Frontend**: Archivos estáticos servidos desde `/frontend/dist`

## Actualización del Proyecto

1. Haz cambios en el código
2. Commit y push a GitHub
3. Vercel automáticamente detectará los cambios y redeployará

## Monitoreo

- Revisa los logs de despliegue en el dashboard de Vercel
- Las funciones serverless tienen logs en tiempo real
- Los errores del frontend aparecen en la consola del navegador
