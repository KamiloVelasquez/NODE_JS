# 🎬 Backend - API REST de Películas y Series

Este proyecto es una API RESTful desarrollada en **Node.js** y **Express** para la gestión completa de contenidos multimedia como películas y series. Utiliza **MongoDB Atlas** como base de datos en la nube e incluye módulos para gestionar géneros, directores, productoras, tipos de multimedia y las producciones mismas (medias), con operaciones CRUD completas y validaciones de integridad de datos.

## 📁 Estructura del Proyecto

- [index.js](index.js): Archivo principal de la aplicación que configura el servidor Express y las rutas.
- [db/db-connection-mongo.js](db/db-connection-mongo.js): Conexión a MongoDB Atlas.
- **Models** (modelos de datos con Mongoose):
  - [models/Genero.js](models/Genero.js): Modelo para géneros.
  - [models/Director.js](models/Director.js): Modelo para directores.
  - [models/Productora.js](models/Productora.js): Modelo para productoras.
  - [models/Tipo.js](models/Tipo.js): Modelo para tipos de multimedia.
  - [models/Media.js](models/Media.js): Modelo para producciones (películas/series).
- **Controllers** (lógica de negocio):
  - [controllers/generoController.js](controllers/generoController.js): Controlador para géneros.
  - [controllers/directorController.js](controllers/directorController.js): Controlador para directores.
  - [controllers/productoraController.js](controllers/productoraController.js): Controlador para productoras.
  - [controllers/tipoController.js](controllers/tipoController.js): Controlador para tipos.
  - [controllers/mediaController.js](controllers/mediaController.js): Controlador para medias.
- **Routers** (definición de rutas):
  - [routers/genero.js](routers/genero.js): Rutas para géneros.
  - [routers/director.js](routers/director.js): Rutas para directores.
  - [routers/productora.js](routers/productora.js): Rutas para productoras.
  - [routers/tipo.js](routers/tipo.js): Rutas para tipos.
  - [routers/media.js](routers/media.js): Rutas para medias.
- [.env](.env): Variables de entorno (no incluido en el repositorio por seguridad).
- [package.json](package.json): Dependencias y scripts del proyecto.

## 🚀 Instalación y Configuración

1. **Clonar este repositorio:**
   ```bash
   git clone https://github.com/KamiloVelasquez/backend.git
   cd backend
   ```

2. **Instalar dependencias:**
   Accede a la carpeta `backend` y ejecuta:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo llamado `.env` en la carpeta `backend` y añade tu URI de conexión a MongoDB Atlas:
   ```text
   PORT=4000
   MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_base_datos?retryWrites=true&w=majority
   ```
   - Reemplaza `usuario`, `contraseña`, `cluster` y `nombre_base_datos` con tus credenciales reales de MongoDB Atlas.

## 💻 Cómo Ejecutar el Proyecto

Para iniciar el servidor en modo desarrollo (con **Nodemon**):
```bash
npm run dev
```

Para iniciar en modo producción:
```bash
npm start
```

El servidor correrá en `http://localhost:4000` (o el puerto definido en `.env`).

## 📡 Endpoints de la API

### Géneros
- **GET /api/generos**: Obtiene la lista de géneros.
- **POST /api/generos**: Crea un nuevo género. Envía un JSON con `nombre` y opcionalmente `descripcion` y `estado`.
- **PUT /api/generos/:id**: Actualiza un género por ID.

Ejemplo de solicitud POST:
```json
{
  "nombre": "Acción",
  "descripcion": "Género de películas de acción",
  "estado": "Activo"
}
```

### Directores
- **GET /api/directores**: Obtiene el director principal (solo uno registrado).
- **POST /api/directores**: Crea un nuevo director. Envía un JSON con `nombres` y opcionalmente `estado`.
- **PUT /api/directores**: Actualiza el director existente.

Ejemplo de solicitud POST:
```json
{
  "nombres": "Steven Spielberg",
  "estado": "Activo"
}
```

### Productoras
- **GET /api/productoras**: Obtiene la lista de productoras.
- **POST /api/productoras**: Crea una nueva productora. Envía un JSON con `nombre`, `slogan`, `descripcion` y opcionalmente `estado`.
- **PUT /api/productoras/:id**: Actualiza una productora por ID.

Ejemplo de solicitud POST:
```json
{
  "nombre": "Disney",
  "slogan": "The happiest place on Earth",
  "descripcion": "Productora líder en entretenimiento",
  "estado": "Activo"
}
```

### Tipos
- **GET /api/tipos**: Obtiene la lista de tipos de multimedia.
- **POST /api/tipos**: Crea un nuevo tipo. Envía un JSON con `nombre` y `descripcion`.
- **PUT /api/tipos/:id**: Actualiza un tipo por ID.

Ejemplo de solicitud POST:
```json
{
  "nombre": "Película",
  "descripcion": "Producción cinematográfica"
}
```

### Medias (Películas/Series)
- **GET /api/medias**: Obtiene la lista de producciones con referencias pobladas.
- **POST /api/medias**: Crea una nueva producción. Envía un JSON con todos los campos requeridos.
- **PUT /api/medias/:id**: Actualiza una producción por ID.
- **DELETE /api/medias/:id**: Elimina una producción por ID.

Ejemplo de solicitud POST:
```json
{
  "serial": "MOV001",
  "titulo": "Inception",
  "sinopsis": "Un ladrón que roba secretos corporativos...",
  "url": "https://example.com/inception",
  "imagenPortada": "https://example.com/inception.jpg",
  "anoEstreno": 2010,
  "genero": "60f7b3b3b3b3b3b3b3b3b3b3",
  "director": "60f7b3b3b3b3b3b3b3b3b3b4",
  "productora": "60f7b3b3b3b3b3b3b3b3b3b5",
  "tipo": "60f7b3b3b3b3b3b3b3b3b3b6"
}
```
**Nota:** Los IDs de `genero`, `director`, `productora` y `tipo` deben existir y estar activos en sus respectivas colecciones.

## 🛠️ Tecnologías Usadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework web para Node.js.
- **MongoDB Atlas**: Base de datos NoSQL en la nube.
- **Mongoose**: ODM para modelar datos en MongoDB.
- **CORS**: Middleware para habilitar CORS.
- **Dotenv**: Gestión de variables de entorno.
- **Nodemon**: Herramienta para desarrollo con recarga automática.

## 📜 Scripts Disponibles

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo con Nodemon.
- `npm test`: Ejecuta pruebas (actualmente no configurado).

## 🤝 Contribución

1. Haz un fork del proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👤 Autor

**Monica Duque** - [GitHub](https://github.com/monicaduque-iudigital)
**Kamilo Velásquez** - [GitHub](https://github.com/KamiloVelasquez)
