# Validaciones

Esta carpeta contiene las reglas de validación para todos los endpoints de la API GastroVerse. Utiliza `express-validator` para garantizar que los datos de entrada cumplan con los requisitos específicos antes de ser procesados.

## Arquitectura

Las validaciones actúan como middleware entre las rutas y los controladores:
```
Route → Validation → Error Handler → Controller
```

## Archivos

### `usuariosValidator.js`
**Responsabilidad**: Validaciones para todos los endpoints de la API.

## Validaciones disponibles

### **Usuarios**

#### `validarRegistroUsuario`
Validaciones para registro de nuevos usuarios:
- **email**: Obligatorio, formato email válido, normalizado
- **contraseña**: Mínimo 6 caracteres, debe contener: 1 minúscula, 1 mayúscula, 1 número
- **nombre**: 2-50 caracteres, obligatorio, sin espacios extra

#### `validarLogin`
Validaciones para inicio de sesión:
- **email**: Obligatorio, formato email válido, normalizado
- **contraseña**: Obligatorio

#### `validarCrearUsuario`
Similar a registro pero con validaciones más flexibles para contraseña.

### **Recetas**

#### `validarCrearReceta`
Validaciones para crear/actualizar recetas:
- **titulo**: 5-255 caracteres, obligatorio
- **instrucciones**: Mínimo 10 caracteres, obligatorio
- **tiempo_preparacion**: 1-1440 minutos (opcional)
- **dificultad**: "Fácil", "Intermedio" o "Difícil" (opcional)

### **Ingredientes**

#### `validarCrearIngrediente`
Validaciones para ingredientes:
- **nombre**: 2-255 caracteres, obligatorio
- **receta_id**: Número entero positivo, obligatorio
- **cantidad**: Máximo 100 caracteres (opcional)
- **unidad**: Máximo 50 caracteres (opcional)

### **Búsquedas**

#### `validarBusquedaIngrediente`
Para búsqueda por ingrediente específico:
- **ingrediente**: Obligatorio, mínimo 2 caracteres

#### `validarBusquedaTexto`
Para búsquedas generales y por título:
- **termino**: 2-100 caracteres, obligatorio, sanitizado con escape

#### `validarFiltros`
Para filtrado de recetas:
- **dificultad**: "Fácil", "Intermedio" o "Difícil" (opcional)
- **tiempo_max**: 1-1440 minutos (opcional)
- **limit**: 1-100 resultados (opcional)

### **Parámetros de URL**

#### `validarId`
Para parámetros `:id` en rutas:
- **id**: Número entero positivo, convertido automáticamente

#### `validarRecetaId`
Para parámetros `:receta_id`:
- **receta_id**: Número entero positivo, convertido automáticamente

## Características de las validaciones

### **Sanitización automática:**
- `trim()` - Elimina espacios extra
- `escape()` - Previene ataques XSS en búsquedas
- `normalizeEmail()` - Formato estándar para emails
- `toInt()` - Conversión automática a enteros

### **Validaciones de seguridad:**
- Longitud mínima y máxima para prevenir ataques
- Caracteres permitidos específicos
- Validación de tipos de datos
- Sanitización contra XSS

### **Mensajes de error claros:**
```javascript
body('email')
  .notEmpty().withMessage('El email es obligatorio')
  .isEmail().withMessage('Debe ser un email válido')
```

## Uso en rutas

### Implementación típica:
```javascript
const { validarCrearReceta } = require('../middlewares/validaciones/usuariosValidator');
const manejoErroresValidacion = require('../middlewares/manejoErroresValidacion');

router.post('/recetas', 
  validarCrearReceta,           // Aplica validaciones
  manejoErroresValidacion,      // Maneja errores encontrados
  recetasController.crear       // Ejecuta controlador
);
```

### Respuesta de error típica:
```json
{
  "error": "Datos inválidos",
  "detalles": [
    "El email es obligatorio",
    "La contraseña debe tener al menos 6 caracteres"
  ]
}
```

## Validaciones por endpoint

### **Rutas públicas:**
- `POST /usuarios` → `validarRegistroUsuario`
- `POST /usuarios/login` → `validarLogin`
- `GET /recetas/:id` → `validarId`
- `GET /busqueda/ingrediente` → `validarBusquedaIngrediente`
- `GET /busqueda/titulo` → `validarBusquedaTexto`
- `GET /busqueda/general` → `validarBusquedaTexto`
- `GET /busqueda/filtrar` → `validarFiltros`

### **Rutas protegidas:**
- `POST /recetas` → `validarCrearReceta`
- `PUT /recetas/:id` → `validarId` + `validarCrearReceta`
- `DELETE /recetas/:id` → `validarId`
- `POST /ingredientes` → `validarCrearIngrediente`
- `PUT /ingredientes/:id` → `validarId` + `validarCrearIngrediente`
- `DELETE /ingredientes/:id` → `validarId`
- `GET /ingredientes/:receta_id` → `validarRecetaId`
- `DELETE /favoritos/:receta_id` → `validarRecetaId`

## Dependencias

- **express-validator**: Biblioteca principal para validaciones
- Métodos utilizados: `body()`, `param()`, `query()`, `isEmail()`, `isLength()`, etc.

## Ventajas

**Seguridad:**
- Previene inyección SQL y XSS
- Validación consistente en toda la API
- Sanitización automática de datos

**Mantenibilidad:**
- Validaciones centralizadas y reutilizables
- Mensajes de error consistentes
- Fácil modificación de reglas

**Experiencia de usuario:**
- Mensajes de error claros y específicos
- Validación temprana antes del procesamiento
- Respuestas HTTP apropiadas (400 Bad Request)

## Notas importantes

- Todas las validaciones son arrays de middleware
- Se combinan con `manejoErroresValidacion` para procesar errores
- Los parámetros numéricos se convierten automáticamente
- Las validaciones opcionales solo se aplican si el campo está presente