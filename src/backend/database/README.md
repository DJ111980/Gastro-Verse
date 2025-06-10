# Database

Esta carpeta contiene todos los scripts SQL necesarios para la configuración y mantenimiento de la base de datos PostgreSQL en Supabase.

## Archivos

### `crearTablas.sql`
Script principal para crear todas las tablas del sistema.

**Tablas incluidas:**
- `usuarios` - Información de usuarios registrados
- `recetas` - Recetas con título, instrucciones, tiempo y dificultad
- `ingredientes` - Ingredientes asociados a cada receta
- `favoritos` - Relación usuarios-recetas favoritas
- `tokens_blacklist` - Tokens JWT invalidados para logout

### `funciones.sql`
Funciones y procedimientos almacenados de PostgreSQL.

**Funciones incluidas:**
- `limpiar_tokens_expirados()` - Elimina tokens expirados automáticamente
- `trigger_limpiar_tokens()` - Función del trigger para limpieza automática
- `es_token_invalidado(token)` - Verifica si un token está en la blacklist
- `invalidar_token()` - Agrega un token a la blacklist
- `estadisticas_blacklist()` - Estadísticas de tokens invalidados

### `vistasUtiles.sql`
Vistas de base de datos para consultas optimizadas.

**Vistas incluidas:**
- `recetas_populares` - Recetas ordenadas por número de favoritos
- `recetas_con_ingredientes` - Recetas con lista de ingredientes concatenada

### `indicesRendimiento.sql`
Índices para optimizar el rendimiento de consultas frecuentes.

**Índices incluidos:**
- Índices en campos de búsqueda frecuente
- Índices compuestos para consultas complejas
- Índices de texto completo para búsquedas

### `insercionRecetas.sql`
Datos de ejemplo para poblar la base de datos con recetas de prueba.

**Contenido:**
- Recetas de ejemplo variadas
- Ingredientes asociados
- Datos para testing y desarrollo

## Orden de ejecución

Para configurar la base de datos desde cero:

1. `crearTablas.sql` - Crear estructura básica
2. `funciones.sql` - Agregar funciones y triggers
3. `vistasUtiles.sql` - Crear vistas optimizadas
4. `indicesRendimiento.sql` - Optimizar consultas
5. `insercionRecetas.sql` - Poblar con datos de ejemplo

## Características de la base de datos

### Tablas principales:
```sql
usuarios (id, email, contraseña, nombre, fecha_creacion)
recetas (id, titulo, instrucciones, tiempo_preparacion, dificultad, fecha_creacion)
ingredientes (id, nombre, receta_id, cantidad, unidad)
favoritos (id, usuario_id, receta_id, fecha_agregado)
tokens_blacklist (token, usuario_id, expira_en, fecha_creacion)
```

### Relaciones:
- Un usuario puede tener muchas recetas favoritas (1:N)
- Una receta puede tener muchos ingredientes (1:N)
- Una receta puede ser favorita de muchos usuarios (N:M)

### Funcionalidades avanzadas:
- Limpieza automática de tokens expirados
- Búsqueda de texto completo en español
- Vistas optimizadas para consultas frecuentes
- Triggers para mantenimiento automático

## Conexión
La base de datos está alojada en Supabase y se conecta mediante las variables de entorno configuradas en el archivo `.env` del proyecto.