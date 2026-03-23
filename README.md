# SISTEMA DE GESTIÓN DE PELÍCULAS

Aplicación web desarrollada con Node.js (backend) y React (frontend) que permite la gestión de películas dentro de un sistema administrativo.

Este proyecto hace parte de un caso de estudio académico enfocado en el desarrollo de aplicaciones web modernas.

---

TECNOLOGÍAS UTILIZADAS

BACKEND

* Node.js
* Express
* JavaScript
* API REST

FRONTEND

* React
* JavaScript
* HTML5
* CSS3

---

ESTRUCTURA DEL PROYECTO

NODE_JS/
│── backend/              (Servidor - API)
│── frontend/             (Cliente - React)
│── .gitignore
│── debug_require.js
│── package.json
│── package-lock.json
│── Caso_Estudio_Peliculas.pdf

---

INSTALACIÓN

1. Clonar repositorio:

git clone https://github.com/KamiloVelasquez/NODE_JS.git

2. Ingresar al proyecto:

cd NODE_JS

---

CONFIGURACIÓN DEL BACKEND

1. Ir a la carpeta backend:

cd backend

2. Instalar dependencias:

npm install

3. Ejecutar servidor:

npm start

---

CONFIGURACIÓN DEL FRONTEND

1. Ir a la carpeta frontend:

cd frontend

2. Instalar dependencias:

npm install

3. Ejecutar aplicación:

npm start

---

FUNCIONAMIENTO

* El frontend desarrollado en React consume la API del backend en Node.js.
* El sistema permite gestionar información de películas.
* Implementa arquitectura cliente-servidor.

---

CONEXIÓN FRONTEND - BACKEND

El frontend se conecta al backend mediante peticiones HTTP.

Configura la URL de la API en:

frontend/src/services/

Ejemplo:

const API_URL = "http://localhost:5000/api";

---

FUNCIONALIDADES

* Visualización de películas
* Registro de nuevas películas
* Edición de información
* Eliminación de registros
* Consumo de API REST
* Interfaz amigable para el usuario

---

SCRIPTS DISPONIBLES

BACKEND

* npm start → Ejecuta el servidor

FRONTEND

* npm start → Ejecuta la aplicación
* npm run build → Construye versión de producción
* npm test → Ejecuta pruebas (si aplica)

---

DOCUMENTACIÓN

El proyecto incluye el archivo:

Caso_Estudio_Peliculas.pdf

Contiene el análisis, requerimientos y contexto del sistema.

---

NOTAS

* Ejecutar primero el backend antes del frontend.
* Verificar puertos para evitar conflictos.
* Requiere Node.js instalado.

---

AUTOR

* Monica Duque Posso
* Kamilo Velásquez

---

LICENCIA

Proyecto de uso académico.
