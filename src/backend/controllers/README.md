# Controllers

Los controladores manejan las solicitudes HTTP entrantes, procesan los datos y devuelven las respuestas apropiadas. Siguen el patrón MVC actuando como intermediarios entre las rutas y los servicios/modelos.

## Archivos

### `usuariosController.js`
Maneja las operaciones relacionadas con usuarios.

**Endpoints que controla:**
- `POST /api/v1/usuarios` - Registrar nuevo usuario
- `POST /api/v1/usuarios/login` - Iniciar sesión
- `GET /api/v1/usuarios/me` - Obtener perfil del usuario autenticado
- `POST /api/v1/usuarios/logout` - Cerrar sesión

### `recetasController.js`
Gestiona las operaciones CRUD de recetas.

**Endpoints que controla:**
- `GET /api/v1/recetas` - Listar recetas con paginación
- `GET /api/v1/recetas/:id` - Obtener receta específica
- `POST /api/v1/recetas` - Crear nueva receta (protegida)
- `PUT /api/v1/recetas/:id` - Actualizar receta (protegida)
- `DELETE /api/v1/recetas/:id` - Eliminar receta (protegida)

### `favoritosController.js`
Administra las recetas favoritas de los usuarios.

**Endpoints que controla:**
- `GET /api/v1/favoritos` - Obtener favoritos del usuario (protegida)
- `POST /api/v1/favoritos` - Agregar receta a favoritos (protegida)
- `DELETE /api/v1/favoritos/:receta_id` - Eliminar de favoritos (protegida)

### `ingredientesController.js`
Controla la gestión de ingredientes de las recetas.

**Endpoints que controla:**
- `GET /api/v1/ingredientes/:receta_id` - Obtener ingredientes de receta (protegida)
- `POST /api/v1/ingredientes` - Agregar ingrediente (protegida)
- `PUT /api/v1/ingredientes/:id` - Actualizar ingrediente (protegida)
- `DELETE /api/v1/ingredientes/:id` - Eliminar ingrediente (protegida)

### `busquedaController.js`
Maneja las diferentes opciones de búsqueda y filtrado.

**Endpoints que controla:**
- `GET /api/v1/busqueda/populares` - Recetas más populares
- `GET /api/v1/busqueda/ingrediente` - Buscar por ingrediente
- `GET /api/v1/busqueda/titulo` - Buscar por título
- `GET /api/v1/busqueda/general` - Búsqueda general
- `GET /api/v1/busqueda/filtrar` - Filtrar recetas por criterios

## Estructura típica de un controlador

```javascript
const Controller = {
  async metodo(req, res) {
    try {
      // 1. Extraer datos de req.body, req.params, req.query
      // 2. Validar datos (si es necesario)
      // 3. Llamar al servicio o modelo correspondiente
      // 4. Procesar respuesta
      // 5. Devolver respuesta HTTP
      
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        codigo: 'INTERNAL_SERVER_ERROR'
      });
    }
  }
};
```

## Responsabilidades
- **NO** contienen lógica de negocio compleja (eso va en services)
- **NO** acceden directamente a la base de datos (usan models/services)
- **SÍ** manejan la respuesta HTTP
- **SÍ** extraen y validan parámetros de la request
- **SÍ** manejan errores y códigos de estado HTTP

## Manejo de errores
Todos los controladores implementan manejo de errores consistente:
- Try-catch para capturar errores
- Logs de errores para debugging
- Respuestas HTTP con códigos de estado apropiados
- Mensajes de error descriptivos con códigos únicos