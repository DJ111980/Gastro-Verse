# Routes

Las rutas definen los endpoints de la API REST y conectan las URLs con los controladores correspondientes. Utilizan Express Router para organizar las rutas por funcionalidad.

## Archivos

### `usuariosRoutes.js`
Rutas para gestión de usuarios y autenticación.

**Endpoints:**
```
POST   /api/v1/usuarios         - Registro de usuario (público)
POST   /api/v1/usuarios/login   - Iniciar sesión (público)  
GET    /api/v1/usuarios/me      - Perfil usuario (protegida)
POST   /api/v1/usuarios/logout  - Cerrar sesión (protegida)
```

**Características:**
- Registro con validación de email y contraseña segura
- Login con generación de JWT
- Logout con invalidación de token
- Perfil protegido con middleware de autenticación

### `recetasRoutes.js`
Rutas CRUD para recetas.

**Endpoints:**
```
GET    /api/v1/recetas     - Listar recetas (público)
GET    /api/v1/recetas/:id - Obtener receta (público)
POST   /api/v1/recetas     - Crear receta (protegida)
PUT    /api/v1/recetas/:id - Actualizar receta (protegida)
DELETE /api/v1/recetas/:id - Eliminar receta (protegida)
```

**Características:**
- Paginación en listado con `limit` y `offset`
- Validación de datos en creación y actualización
- Solo el creador puede modificar/eliminar su receta

### `favoritosRoutes.js`
Rutas para manejo de recetas favoritas.

**Endpoints:**
```
GET    /api/v1/favoritos           - Mis favoritos (protegida)
POST   /api/v1/favoritos           - Agregar favorito (protegida)
DELETE /api/v1/favoritos/:receta_id - Quitar favorito (protegida)
```

**Características:**
- Todas las rutas requieren autenticación
- Prevención de duplicados al agregar favoritos
- Eliminación por `receta_id` en lugar de ID del favorito

### `ingredientesRoutes.js`
Rutas para gestión de ingredientes de recetas.

**Endpoints:**
```
GET    /api/v1/ingredientes/:receta_id - Ingredientes de receta (protegida)
POST   /api/v1/ingredientes            - Agregar ingrediente (protegida)
PUT    /api/v1/ingredientes/:id        - Actualizar ingrediente (protegida)
DELETE /api/v1/ingredientes/:id        - Eliminar ingrediente (protegida)
```

**Características:**
- Vinculación obligatoria con `receta_id`
- Validación de cantidades y unidades
- Control de permisos por usuario

### `busquedaRoutes.js`
Rutas para búsqueda y filtrado de recetas.

**Endpoints:**
```
GET /api/v1/busqueda/populares   - Recetas más populares (público)
GET /api/v1/busqueda/ingrediente - Buscar por ingrediente (público)
GET /api/v1/busqueda/titulo      - Buscar por título (público)
GET /api/v1/busqueda/general     - Búsqueda general (público)
GET /api/v1/busqueda/filtrar     - Filtrar recetas (público)
```

**Características:**
- Todas las búsquedas son públicas
- Parámetros de consulta para filtros
- Soporte para búsqueda de texto completo

## Estructura típica de una ruta

```javascript
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerName');
const { verificarToken } = require('../middlewares/authMiddleware');
const { validador } = require('../middlewares/validaciones/usuariosValidator');
const manejoErrores = require('../middlewares/manejoErroresValidacion');

// Ruta pública
router.get('/publica', controller.metodoPublico);

// Ruta protegida con validación
router.post('/protegida', 
  validador,           // 1. Validar datos
  manejoErrores,       // 2. Manejar errores
  verificarToken,      // 3. Verificar autenticación  
  controller.metodo    // 4. Ejecutar lógica
);

module.exports = router;
```

## Clasificación de rutas

### **Rutas públicas** (sin autenticación):
- Registro y login de usuarios
- Listado y detalle de recetas
- Todas las búsquedas y filtros
- Endpoints de salud y bienvenida

### **Rutas protegidas** (requieren JWT):
- Perfil de usuario y logout
- Crear, editar y eliminar recetas
- Gestión de favoritos
- Gestión de ingredientes

## Middleware aplicado

### Orden de ejecución:
1. **Validadores** - Validación de entrada con `express-validator`
2. **Manejo de errores** - Procesar errores de validación
3. **Autenticación** - Verificar JWT (solo rutas protegidas)
4. **Controlador** - Lógica de negocio

### Ejemplo completo:
```javascript
router.post('/recetas',
  validarCrearReceta,      // Validar título, instrucciones, etc.
  manejoErroresValidacion, // Capturar errores de validación
  verificarToken,          // Verificar que usuario esté autenticado
  recetasController.crear  // Crear la receta
);
```

## Códigos de respuesta HTTP

### Exitosas:
- `200` - OK (consultas exitosas)
- `201` - Created (recursos creados)

### Errores del cliente:
- `400` - Bad Request (datos inválidos)
- `401` - Unauthorized (sin autenticación)
- `404` - Not Found (recurso no encontrado)
- `409` - Conflict (recurso ya existe)

### Errores del servidor:
- `500` - Internal Server Error (error interno)

## Configuración en app.js

```javascript
const usuariosRoutes = require('./routes/usuariosRoutes');
const recetasRoutes = require('./routes/recetasRoutes');
// ... otras rutas

app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/recetas', recetasRoutes);
// ... otras rutas
```

## Versionado

Todas las rutas usan el prefijo `/api/v1/` para permitir versionado futuro de la API manteniendo retrocompatibilidad.