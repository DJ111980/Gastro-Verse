# Models

Los modelos se encargan del acceso a datos y la interacción directa con la base de datos PostgreSQL. Implementan el patrón Repository para encapsular las consultas SQL.

## Archivos principales

### `usuariosModel.js`
Modelo para operaciones de usuarios.

**Métodos principales:**
- `crearUsuario()` - Insertar nuevo usuario
- `buscarPorEmail()` - Encontrar usuario por email
- `buscarPorId()` - Encontrar usuario por ID
- `actualizarUsuario()` - Modificar datos del usuario

### `recetasModel.js`
Modelo para gestión de recetas.

**Métodos principales:**
- `obtenerTodas()` - Listar recetas con paginación  
- `obtenerPorId()` - Obtener receta específica
- `crear()` - Insertar nueva receta
- `actualizar()` - Modificar receta existente
- `eliminar()` - Borrar receta

**Características:**
- Soporte para paginación con `limit` y `offset`
- Filtrado por criterios como dificultad y tiempo
- Consultas optimizadas para rendimiento

### `favoritosModel.js`  
Modelo para manejo de recetas favoritas.

**Métodos principales:**
- `obtenerFavoritosPorUsuario()` - Favoritos de un usuario
- `agregarFavorito()` - Marcar receta como favorita
- `eliminarFavorito()` - Quitar de favoritos
- `esFavorito()` - Verificar si es favorito

### `ingredientesModel.js`
Modelo para ingredientes de recetas.

**Métodos principales:**
- `obtenerPorReceta()` - Ingredientes de una receta
- `crear()` - Agregar ingrediente
- `actualizar()` - Modificar ingrediente  
- `eliminar()` - Borrar ingrediente

### `busquedaTextoModel.js`
Modelo especializado en búsquedas y filtros.

**Métodos principales:**
- `buscarPorIngrediente()` - Buscar recetas por ingrediente
- `buscarPorTitulo()` - Buscar en títulos
- `busquedaGeneral()` - Búsqueda completa
- `filtrarRecetas()` - Aplicar filtros múltiples

**Características:**
- Búsqueda de texto completo en español
- Soporte para filtros combinados
- Optimización para consultas frecuentes

### `tokenBlacklistModel.js`
Modelo para gestión de tokens JWT invalidados.

**Métodos principales:**
- `agregarTokenAListaNegra()` - Invalidar token
- `estaEnListaNegra()` - Verificar si token está invalidado
- `limpiarTokensExpirados()` - Mantenimiento automático

## Carpeta `vistas/`

### `recetasPopularesModel.js`
Modelo que utiliza la vista de recetas ordenadas por popularidad.

**Métodos:**
- `obtenerRecetasPopulares()` - Recetas más favoritas
- `obtenerConFiltros()` - Populares con filtros

### `recetasConIngredientesModel.js`
Modelo que utiliza la vista con ingredientes concatenados.

**Métodos:**
- `obtenerRecetasConIngredientes()` - Recetas con ingredientes
- `buscarEnIngredientes()` - Búsqueda optimizada

## Estructura típica de un modelo

```javascript
const pool = require('../config/database');

const Model = {
  async metodo(parametros) {
    try {
      const query = `
        SELECT columnas
        FROM tabla
        WHERE condicion = $1
      `;
      
      const values = [parametros];
      const result = await pool.query(query, values);
      
      return result.rows;
    } catch (error) {
      console.error('Error en Model.metodo:', error);
      throw error;
    }
  }
};

module.exports = Model;
```

## Características importantes

### Seguridad:
- **Consultas parametrizadas**: Prevención de SQL injection
- **Validación de entrada**: Verificación de tipos y rangos
- **Manejo de errores**: Captura y propagación apropiada

### Optimización:
- **Índices**: Uso de índices para consultas frecuentes
- **Límites**: Paginación para evitar sobrecarga
- **Vistas**: Consultas precompiladas para mejor rendimiento

### Mantenibilidad:
- **Consultas legibles**: SQL bien formateado y documentado
- **Reutilización**: Métodos genéricos cuando es posible
- **Consistencia**: Patrones uniformes en todos los modelos

## Convenciones

1. **Nombres de métodos**: Verbos descriptivos (`obtener`, `crear`, `actualizar`, `eliminar`)
2. **Parámetros**: Objetos o valores primitivos según complejidad
3. **Retorno**: Arrays para listas, objetos para elementos únicos
4. **Errores**: Re-lanzar errores para manejo en capas superiores
5. **Logging**: Console.error para debugging en desarrollo

## Relaciones con otras capas

- **Controllers**: Llaman a los modelos para obtener/modificar datos
- **Services**: Utilizan modelos para lógica de negocio compleja
- **Database**: Acceso directo a PostgreSQL/Supabase
- **Middlewares**: No interactúan directamente con modelos