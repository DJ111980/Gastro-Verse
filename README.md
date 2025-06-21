# 🍳 GastroVerse: Tu Universo Culinario

<p align="center">
  <img src="https://gastro-verse-ep2s.onrender.com/assets/logo-B0eIY0a4.png" alt="Logo de GastroVerse" width="150"/>
</p>

> GastroVerse es una plataforma web moderna y elegante, diseñada para los amantes de la cocina. Permite a los usuarios descubrir, crear, organizar y guardar sus recetas favoritas en una cuenta personal. Es el lugar ideal para aprender a cocinar o simplemente ampliar el repertorio gastronómico.

---

### ✨ Demostración en Vivo

*   **Frontend Desplegado:** **[https://gastro-verse-ep2s.onrender.com/](https://gastro-verse-ep2s.onrender.com/)**

---

### 🌟 Características Principales

*   **👤 Autenticación Segura:** Registro e inicio de sesión de usuarios usando JSON Web Tokens (JWT) y contraseñas encriptadas con `bcrypt`.
*   **🔍 Búsqueda y Filtrado Avanzado:** Busca recetas por nombre, ingredientes o aplica filtros por dificultad y tiempo de preparación.
*   **📖 Gestión Completa de Recetas (CRUD):** Los usuarios pueden crear, ver, actualizar y eliminar sus propias recetas.
*   **❤️ Colección de Favoritos:** Guarda las recetas de otros usuarios en tu lista personal de favoritos.
*   **🚀 Notificaciones Toast:** Feedback visual inmediato para acciones del usuario como "Receta añadida a favoritos" usando `react-toastify`.
*   **🎨 Diseño Responsivo:** Interfaz limpia y funcional que se adapta a dispositivos móviles y de escritorio.

---

### 🛠️ Tecnologías Utilizadas

#### **Backend (Node.js & Express)**
*   **Lenguaje:** JavaScript (ES6+)
*   **Entorno:** Node.js (`>=18.0.0`)
*   **Framework:** Express.js
*   **Base de Datos:** PostgreSQL hosteada en Supabase.
*   **Autenticación:** `jsonwebtoken` (JWT) y `bcrypt` para hashing.
*   **Validación:** `express-validator` para sanitizar y validar los datos de entrada.
*   **Dependencias Clave:** `pg`, `cors`, `dotenv`, `axios`.
*   **Desarrollo:** `nodemon` para recarga automática del servidor.

#### **Frontend (React & Vite)**
*   **Librería:** React (`^19.1.0`)
*   **Entorno de Desarrollo:** Vite
*   **Gestión de Rutas:** React Router DOM
*   **Cliente HTTP:** Axios, con una instancia pre-configurada e interceptores para manejar tokens JWT automáticamente.
*   **Componentes UI:** `react-icons`, `react-modal`, `react-toastify`.
*   **Gestión de Estado:** React Context API para el estado de autenticación.
*   **Estilos:** CSS3 nativo con Variables (Custom Properties) y metodología BEM.
*   **Calidad de Código:** ESLint.

#### **Arquitectura y Despliegue**
*   **Patrón de Diseño (Backend):** Modelo-Vista-Controlador (MVC) con una capa de Servicios para la lógica de negocio.
*   **Plataforma de Despliegue:** Render (para frontend y backend).
*   **Configuración para Producción:** Configuración de CORS robusta, `trust proxy` y `health checks` para el entorno de Render.

---

### 📂 Estructura del Proyecto

El proyecto está organizado en un monorepo con dos carpetas principales, `backend` y `frontend`, para una clara separación de responsabilidades.

```
Gastro-Verse/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── database/ # Scripts SQL para setup
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── app.js # Punto de entrada del servidor
│ ├── .env.example
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── services/
│ │ │ └── api.js # Configuración de Axios
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env.example
│ └── package.json
│
└── README.md
```

### ⚙️ Instalación y Puesta en Marcha Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

#### **Requisitos Previos**
*   Node.js (versión `>=18.0.0`)
*   npm (`>=8.0.0`)
*   Git
*   Una cuenta de Supabase para crear un proyecto de base de datos PostgreSQL.

#### **Pasos**

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/DJ111980/Gastro-Verse.git
    cd Gastro-Verse
    ```

2.  **Configura el Backend:**
    ```bash
    cd backend
    npm install
    ```
    Crea un archivo `.env` en `backend/` a partir de un `backend/.env.example` con el siguiente contenido, reemplazando los valores con tus credenciales:
    ```env
    # backend/.env
    
    # URL de conexión directa a tu base de datos PostgreSQL de Supabase.
    # La encuentras en Supabase > Project Settings > Database > Connection string.
    DATABASE_URL="postgresql://postgres:[TU_CONTRASEÑA]@[HOST_DE_SUPABASE]:5432/postgres"

    # Clave secreta para firmar los JWT. Genera una con: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    JWT_SECRET="TU_CLAVE_SECRETA_SUPER_LARGA_Y_SEGURA"

    # URL del frontend para la configuración de CORS
    FRONTEND_URL="http://localhost:5173"

    # Puerto para el servidor local
    PORT=3000
    ```
    (Opcional) Ejecuta los scripts SQL de la carpeta `backend/database/` en tu base de datos de Supabase para crear las tablas y funciones necesarias.

    Inicia el servidor de backend en modo desarrollo:
    ```bash
    npm run dev
    ```
    El servidor estará escuchando en `http://localhost:3000`.

3.  **Configura el Frontend:**
    (Abre una nueva terminal en la raíz del proyecto)
    ```bash
    cd frontend
    npm install
    ```
    Crea un archivo `.env` en `frontend/` a partir de un `frontend/.env.example` con el siguiente contenido:
    ```env
    # frontend/.env
    
    # URL base del backend para que el frontend sepa dónde hacer las peticiones
    VITE_API_BASE_URL="http://localhost:3000/api/v1"
    ```
    Inicia la aplicación de frontend en modo desarrollo:
    ```bash
    npm run dev
    ```

¡Listo! La aplicación React estará corriendo en `http://localhost:5173` (o el puerto que Vite asigne).

---

### 📄 API y Autenticación

La API sigue los principios REST y utiliza JWT para proteger las rutas.

#### Manejo de Autenticación
*   Al hacer login, la API devuelve un token JWT.
*   El frontend almacena este token en `localStorage`.
*   Gracias al interceptor configurado en `frontend/src/services/api.js`, cada petición subsiguiente a la API incluye automáticamente el token en la cabecera `Authorization: Bearer <token>`.
*   El backend utiliza el middleware `authMiddleware.js` para verificar este token en las rutas protegidas.

*Para una descripción detallada de cada endpoint, consulta la documentación completa de la API que se encuentra en el proyecto.*

---

### 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar GastroVerse, por favor sigue estos pasos:
1.  Haz un "Fork" del proyecto.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Haz tus cambios y "Commit" (`git commit -m 'Añade nueva funcionalidad'`).
4.  Haz "Push" a la rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un "Pull Request".

---
### Videos de Presentacion 
https://drive.google.com/drive/folders/1JjMhr6lKf1Wgip7D_1b3qA1bcRB2WDk4?usp=drive_link

### 👤 Autor

*   **GitHub:** [@DJ111980](https://github.com/DJ111980)
