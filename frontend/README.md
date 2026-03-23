# FRONTEND - SISTEMA DE GESTIÓN DE PELÍCULAS

Este es el frontend del sistema de gestión de películas, desarrollado con React.
Se encarga de la interfaz gráfica del usuario y de consumir los servicios del backend.

---

TECNOLOGÍAS UTILIZADAS

* React
* JavaScript
* HTML5
* CSS3
* Node.js (entorno de desarrollo)

---

ESTRUCTURA DEL PROYECTO

frontend/
│── node_modules/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── index.js
│── package.json
│── package-lock.json

---

INSTALACIÓN

1. Ir a la carpeta del frontend:

cd frontend

2. Instalar dependencias:

npm install

---

EJECUCIÓN DEL PROYECTO

Para iniciar la aplicación en modo desarrollo:

npm start

Luego abre en el navegador:

http://localhost:3000

---

CONEXIÓN CON EL BACKEND

Este frontend consume una API desarrollada en Node.js.

Asegúrate de que el backend esté ejecutándose antes de iniciar el frontend.

Puedes configurar la URL del backend en los archivos dentro de:

src/services/

Ejemplo:

const API_URL = "http://localhost:5000/api";

---

FUNCIONALIDADES

* Visualización de películas
* Registro de nuevas películas
* Edición de información
* Eliminación de registros
* Interfaz amigable para el usuario

---

SCRIPTS DISPONIBLES

* npm start → Ejecuta la aplicación en modo desarrollo
* npm run build → Genera la versión de producción
* npm test → Ejecuta pruebas (si aplica)

---

NOTAS

* El proyecto corre por defecto en el puerto 3000.
* Verifica que no haya conflictos con otros servicios.
* Es necesario tener Node.js instalado.

---

AUTOR
* Kamilo Velásquez
* Monica Duque Posso1
---

LICENCIA

Este proyecto es de uso académico.
