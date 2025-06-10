# Backend GastroVerse

Esta carpeta contiene todo el código del backend de GastroVerse, una plataforma web dedicada a los amantes de la cocina que permite buscar recetas, gestionar ingredientes y guardar recetas favoritas. El backend está desarrollado con Node.js y Express.js siguiendo la arquitectura MVC.

## Tecnologías utilizadas

- **Runtime**: Node.js v22.16.0
- **Framework**: Express.js
- **Base de Datos**: PostgreSQL + Supabase
- **Autenticación**: JSON Web Tokens (JWT) + bcrypt
- **Validaciones**: express-validator
- **Cliente SQL**: pg
- **Variables de entorno**: dotenv
- **CORS**: cors

## Arquitectura MVC implementada

El proyecto sigue el patrón **Modelo-Vista-Controlador (MVC)** que proporciona una clara separación de responsabilidades:

### Ventajas de esta arquitectura:
- Separación clara entre lógica de negocio, rutas y acceso a datos
- Código más legible y organizado
- Facilita la reutilización de componentes
- Escalabilidad mejorada para proyectos que crecen

### Flujo de comunicación:
```
Cliente HTTP → Routes → Controllers → Services → Models → Database
            ←        ←             ←         ←       ←
```

## Estructura del proyecto

```
src/backend/
├── config/           # Configuración de base de datos
├── controllers/      # Controladores MVC - manejan solicitudes HTTP
├── database/         # Scripts SQL para estructura y datos
├── middlewares/      # Middlewares de autenticación y validación
│   └── validaciones/ # Validadores específicos por entidad
├── models/           # Modelos de acceso a datos
│   └── vistas/       # Modelos para vistas optimizadas de BD
├── routes/           # Definición de endpoints REST
└── services/         # Lógica de negocio centralizada
```

## Carpetas principales

### `/config`
Configuración de conexión a la base de datos PostgreSQL en Supabase.

### `/controllers`
Controladores que manejan las solicitudes HTTP y coordinan las respuestas. Incluye controladores para:
- Usuarios (registro, login, perfil)
- Recetas (CRUD completo)
- Búsqueda (por ingredientes, título, filtros)
- Favoritos (gestión de recetas favoritas)
- Ingredientes (gestión por receta)

### `/database`
Scripts SQL para crear y mantener la estructura de base de datos:
- Creación de tablas
- Funciones y triggers
- Vistas optimizadas
- Índices de rendimiento
- Datos de ejemplo

### `/middlewares`
Middlewares para:
- Autenticación JWT con verificación de blacklist
- Manejo centralizado de errores de validación
- Validadores específicos con express-validator

### `/models`
Modelos de acceso a datos que ejecutan consultas SQL:
- Interacción directa con PostgreSQL
- Operaciones CRUD optimizadas
- Vistas especializadas para consultas complejas

### `/routes`
Definición de endpoints REST organizados por entidad:
- Rutas públicas (sin autenticación)
- Rutas protegidas (requieren JWT)
- Validaciones aplicadas a cada endpoint

### `/services`
Lógica de negocio centralizada:
- Procesamiento de operaciones complejas
- Coordinación entre múltiples modelos
- Reglas de validación específicas del dominio

## Características principales

### API RESTful completa
- **Rutas públicas**: Registro, login, búsqueda de recetas
- **Rutas protegidas**: Gestión de perfil, CRUD de recetas, favoritos
- **Validaciones robustas** en todos los endpoints
- **Paginación** en endpoints de listado

### Sistema de autenticación
- **JWT tokens** para autenticación stateless
- **Blacklist de tokens** para logout seguro
- **Encriptación bcrypt** para contraseñas
- **Middleware de autenticación** reutilizable

### Búsqueda avanzada
- Búsqueda por ingredientes específicos
- Filtrado por dificultad y tiempo de preparación
- Búsqueda de texto completo en títulos
- Recetas populares basadas en favoritos

### Base de datos optimizada
- **PostgreSQL** con Supabase como servicio
- **Vistas optimizadas** para consultas frecuentes
- **Índices de rendimiento** para búsquedas rápidas
- **Triggers automáticos** para limpieza de datos

## Configuración

### Variables de entorno requeridas (.env):
```env
NODE_ENV=production
PORT=3000
SUPABASE_HOST=tu_host
SUPABASE_PORT=6543
SUPABASE_USER=tu_usuario
SUPABASE_PASSWORD=tu_contraseña
SUPABASE_DB=postgres
JWT_SECRET=tu_jwt_secret
```

### Instalación y ejecución:
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## Endpoints principales

### Públicos (sin autenticación):
- `POST /api/v1/usuarios` - Registro
- `POST /api/v1/usuarios/login` - Login
- `GET /api/v1/recetas` - Listar recetas
- `GET /api/v1/busqueda/*` - Búsquedas varias

### Protegidos (requieren JWT):
- `GET /api/v1/usuarios/me` - Perfil de usuario
- `POST /api/v1/recetas` - Crear receta
- `GET /api/v1/favoritos` - Mis favoritos
- `POST /api/v1/ingredientes` - Agregar ingrediente

## Seguridad implementada

- **Validación de entrada** con express-validator
- **Tokens JWT** con expiración automática
- **Blacklist de tokens** para logout seguro
- **Encriptación de contraseñas** con bcrypt
- **Configuración CORS** restrictiva
- **Sanitización de datos** en validadores

## Notas de desarrollo

**Convenciones seguidas:**
- Código en español para mayor claridad del equipo
- Manejo consistente de errores con códigos específicos
- Respuestas JSON estandarizadas
- Logging para debugging y monitoreo

**Próximas mejoras:**
- Implementación de Swagger para documentación automática
- Pruebas automatizadas unitarias
- Mejora en separación servicio-modelo
- Integración con frontend siguiendo la misma arquitectura modular

## Estado del proyecto

**Completado**: Backend completo y funcional  
**Base de datos**: Configurada en Supabase  
**API**: Todos los endpoints implementados   

Para más detalles sobre cada componente, consulta los README específicos en cada carpeta.