# Middlewares

Los middlewares son funciones que se ejecutan durante el ciclo de vida de las peticiones HTTP. Se encargan de validar, autenticar y procesar las solicitudes antes de que lleguen a los controladores.

## Archivos

### `authMiddleware.js`
Middleware de autenticación que protege las rutas privadas mediante JWT.

**Funcionalidades:**
- Verifica la presencia del token en el header `Authorization`
- Valida el formato `Bearer <token>`
- Verifica que el token no esté en la blacklist
- Decodifica y valida el token JWT
- Agrega información del usuario a `req.user`

**Uso:**
```javascript
const { verificarToken } = require('./middlewares/authMiddleware');

// Proteger una ruta
router.get('/ruta-protegida', verificarToken, controller.metodo);
```

**Respuestas de error:**
- `TOKEN_MISSING` - Token no proporcionado
- `TOKEN_MALFORMED` - Token mal formado
- `TOKEN_BLACKLISTED` - Token invalidado
- `TOKEN_EXPIRED` - Token expirado
- `TOKEN_INVALID` - Token inválido

### `manejoErroresValidacion.js`
Middleware que procesa los errores de validación de `express-validator`.

**Funcionalidades:**
- Captura errores de validación de campos
- Formatea errores en un formato consistente
- Devuelve respuesta HTTP 400 con detalles del error

**Uso:**
```javascript
const manejoErrores = require('./middlewares/manejoErroresValidacion');
const { validarRegistro } = require('./middlewares/validaciones/usuariosValidator');

router.post('/registro', validarRegistro, manejoErrores, controller.registro);
```

### `validaciones/usuariosValidator.js`
Conjunto de validadores para diferentes endpoints usando `express-validator`.

**Validadores incluidos:**

#### Usuarios:
- `validarRegistroUsuario` - Email, contraseña segura, nombre
- `validarLogin` - Email y contraseña
- `validarCrearUsuario` - Validación básica para creación

#### Recetas:
- `validarCrearReceta` - Título, instrucciones, tiempo, dificultad
- `validarId` - Validación de IDs numéricos positivos

#### Ingredientes:
- `validarCrearIngrediente` - Nombre, receta_id, cantidad, unidad

#### Búsquedas:
- `validarBusquedaIngrediente` - Parámetro ingrediente mínimo 2 caracteres
- `validarBusquedaTexto` - Término de búsqueda 2-100 caracteres
- `validarFiltros` - Dificultad, tiempo máximo, límite de resultados

## Validaciones específicas

### Contraseñas seguras:
```javascript
// Requiere: 1 minúscula, 1 mayúscula, 1 número, mínimo 6 caracteres
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
```

### Campos de texto:
- Sanitización con `trim()` y `escape()`
- Normalización de emails con `normalizeEmail()`
- Límites de longitud apropiados

### Parámetros numéricos:
- Conversión automática con `toInt()`
- Validación de rangos (ej: tiempo 1-1440 minutos)

## Flujo típico de middleware

```
Request → Validadores → Manejo de errores → Auth (si protegida) → Controller
```

## Ejemplo de uso completo:

```javascript
const { verificarToken } = require('./middlewares/authMiddleware');
const manejoErrores = require('./middlewares/manejoErroresValidacion');
const { validarCrearReceta } = require('./middlewares/validaciones/usuariosValidator');

router.post('/recetas', 
  validarCrearReceta,      // 1. Validar datos
  manejoErrores,           // 2. Manejar errores de validación
  verificarToken,          // 3. Verificar autenticación
  recetasController.crear  // 4. Ejecutar controlador
);
```

## Beneficios

1. **Reutilización**: Los validadores se pueden usar en múltiples rutas
2. **Consistencia**: Formato uniforme de errores
3. **Seguridad**: Validación rigurosa antes de procesar datos
4. **Separación de responsabilidades**: Validación separada de lógica de negocio
5. **Mantenibilidad**: Fácil modificación de reglas de validación