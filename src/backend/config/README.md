# Config

Esta carpeta contiene la configuración de conexión a la base de datos para el proyecto GastroVerse.

## Archivos

### `database.js`
Configuración principal de conexión a PostgreSQL usando Supabase como proveedor.

**Características:**
- Utiliza `pg` (node-postgres) como cliente SQL
- Conexión SSL configurada para Supabase
- Pool de conexiones para optimizar el rendimiento
- Verificación automática de conexión al iniciar

**Variables de entorno requeridas:**
```env
SUPABASE_HOST=tu_host_supabase
SUPABASE_PORT=6543
SUPABASE_USER=tu_usuario
SUPABASE_PASSWORD=tu_contraseña
SUPABASE_DB=postgres
```

**Uso:**
```javascript
const pool = require('./config/database');

// Ejemplo de consulta
const result = await pool.query('SELECT * FROM usuarios');
```

## Dependencias
- `pg`: Cliente PostgreSQL para Node.js
- `dotenv`: Manejo de variables de entorno

## Notas importantes
- La conexión se establece automáticamente al importar el módulo
- Se utiliza SSL con `rejectUnauthorized: false` para Supabase
- El pool maneja automáticamente la reutilización de conexiones