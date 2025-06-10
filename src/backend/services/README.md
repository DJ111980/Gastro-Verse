# Services

Esta carpeta contiene la lógica de negocio del proyecto GastroVerse. Los servicios actúan como una capa intermedia entre los controladores y los modelos, encapsulando operaciones complejas y manteniendo la separación de responsabilidades según el patrón MVC.

## Arquitectura

Los services se encargan de:
- Procesar lógica de negocio específica
- Coordinar operaciones entre múltiples modelos
- Aplicar reglas de validación complejas
- Mantener los controladores limpios y enfocados

## Archivos

### `authService.js`
**Responsabilidad**: Manejo de autenticación y gestión de tokens JWT.

**Funciones principales:**
- `logout(token, usuario_id)` - Invalida un token JWT agregándolo a la blacklist
- `verificarTokenValido(token, usuario_id)` - Verifica si un token es válido y no está invalidado

**Características:**
- Decodifica y valida tokens JWT
- Interactúa con TokenBlacklistModel para gestión de tokens invalidados
- Manejo robusto de errores de autenticación
- Verificación de expiración automática

### `busquedaService.js`
**Responsabilidad**: Lógica de búsqueda y filtrado de recetas.

**Funcionalidades:**
- Búsqueda por ingredientes específicos
- Filtrado por dificultad y tiempo de preparación
- Búsqueda de texto completo en títulos
- Búsqueda general combinada
- Obtención de recetas populares

### `favoritosService.js`
**Responsabilidad**: Gestión de recetas favoritas de usuarios.

**Operaciones:**
- Agregar recetas a favoritos
- Eliminar recetas de favoritos
- Listar favoritos del usuario
- Verificar duplicados antes de agregar

### `ingredientesService.js`
**Responsabilidad**: Manejo de ingredientes asociados a recetas.

**Funciones:**
- Crear nuevos ingredientes para recetas
- Actualizar información de ingredientes
- Eliminar ingredientes específicos
- Obtener lista de ingredientes por receta

### `recetasService.js`
**Responsabilidad**: Lógica de negocio para operaciones con recetas.

**Operaciones:**
- Crear nuevas recetas
- Actualizar recetas existentes
- Eliminar recetas y dependencias
- Validaciones específicas de recetas

### `usuariosService.js`
**Responsabilidad**: Gestión de usuarios y operaciones relacionadas.

**Funcionalidades:**
- Registro de nuevos usuarios
- Autenticación de credenciales
- Gestión de perfiles de usuario
- Validaciones de negocio específicas

## Patrón de diseño

### Estructura típica de un service:
```javascript
const Service = {
  async operacion(parametros) {
    try {
      // 1. Validaciones de negocio
      // 2. Llamadas a modelos
      // 3. Procesamiento de datos
      // 4. Retorno de resultado
    } catch (error) {
      // Manejo de errores específico
    }
  }
};
```

### Interacción con otras capas:
```
Controller → Service → Model → Database
         ←         ←       ←
```

## Ventajas de esta arquitectura

**Separación de responsabilidades:**
- Los controladores se enfocan en HTTP y validación de entrada
- Los services manejan lógica de negocio
- Los models se encargan solo de acceso a datos

**Reutilización:**
- Los services pueden ser utilizados por múltiples controladores
- Lógica centralizada para operaciones complejas

**Testeo:**
- Facilita pruebas unitarias aisladas
- Permite mockear dependencias fácilmente

## Dependencias

- **Modelos**: Todos los services interactúan con sus respectivos modelos
- **JWT**: `authService` utiliza jsonwebtoken para manejo de tokens
- **bcrypt**: Para encriptación de contraseñas en `usuariosService`

## Uso típico

```javascript
// En un controlador
const RecetasService = require('../services/recetasService');

const crearReceta = async (req, res) => {
  try {
    const resultado = await RecetasService.crear(req.body, req.user.id);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

## Notas importantes

- Todos los services manejan errores de forma consistente
- Se utilizan operaciones asíncronas (async/await)
- Los services no manejan directamente HTTP (req/res)
- Validaciones de negocio complejas se centralizan aquí