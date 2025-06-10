/**
 * @fileoverview Modelo para operaciones CRUD de recetas
 * @author Danilo
 * @version 1.0.0
 * @description Maneja todas las operaciones de base de datos relacionadas con recetas
 */

const database = require('../config/database');

/**
 * Modelo de recetas con operaciones CRUD completas
 * Incluye transacciones para eliminación en cascada
 * @namespace RecetasModel
 */
const RecetasModel = {
  /**
   * Crea una nueva receta en la base de datos
   * @param {Object} recetaData - Datos de la nueva receta
   * @param {string} recetaData.titulo - Título de la receta
   * @param {string} recetaData.instrucciones - Instrucciones de preparación
   * @param {number} [recetaData.tiempo_preparacion] - Tiempo en minutos
   * @param {string} [recetaData.dificultad] - Nivel de dificultad
   * @returns {Promise<Object>} Receta creada con ID asignado
   */
  async crearReceta({ titulo, instrucciones, tiempo_preparacion, dificultad }) {
    const query = `
      INSERT INTO recetas (titulo, instrucciones, tiempo_preparacion, dificultad)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [titulo, instrucciones, tiempo_preparacion, dificultad];
    const result = await database.query(query, values);
    return result.rows[0];
  },

  /**
   * Obtiene todas las recetas ordenadas por fecha de creación
   * @returns {Promise<Array>} Lista de todas las recetas
   */
  async obtenerTodas() {
    const result = await database.query('SELECT * FROM recetas ORDER BY fecha_creacion DESC');
    return result.rows;
  },

  /**
   * Busca una receta específica por su ID
   * @param {number} id - ID único de la receta
   * @returns {Promise<Object|undefined>} Receta encontrada o undefined
   */
  async obtenerPorId(id) {
    const result = await database.query('SELECT * FROM recetas WHERE id = $1', [id]);
    return result.rows[0];
  },

  /**
   * Actualiza una receta existente
   * Solo actualiza campos proporcionados (COALESCE para campos opcionales)
   * @param {number} id - ID de la receta a actualizar
   * @param {Object} datosActualizacion - Campos a actualizar
   * @returns {Promise<Object>} Receta actualizada
   */
  async actualizarReceta(id, { titulo, instrucciones, tiempo_preparacion, dificultad }) {
    const query = `
      UPDATE recetas 
      SET titulo = COALESCE($1, titulo),
          instrucciones = COALESCE($2, instrucciones),
          tiempo_preparacion = COALESCE($3, tiempo_preparacion),
          dificultad = COALESCE($4, dificultad)
      WHERE id = $5
      RETURNING *;
    `;
    const values = [titulo, instrucciones, tiempo_preparacion, dificultad, id];
    const result = await database.query(query, values);
    return result.rows[0];
  },

  /**
   * Elimina una receta y sus datos relacionados
   * Usa transacción para garantizar integridad referencial
   * Elimina en cascada: ingredientes → favoritos → receta
   * @param {number} id - ID de la receta a eliminar
   * @returns {Promise<Object>} Receta eliminada
   * @throws {Error} Si la transacción falla
   */
  async eliminarReceta(id) {
    const client = await database.connect();
    
    try {
      await client.query('BEGIN');
      
      // Eliminar ingredientes asociados
      await client.query('DELETE FROM ingredientes WHERE receta_id = $1', [id]);
      
      // Eliminar de favoritos
      await client.query('DELETE FROM favoritos WHERE receta_id = $1', [id]);
      
      // Eliminar receta
      const result = await client.query('DELETE FROM recetas WHERE id = $1 RETURNING *', [id]);
      
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Liberar cliente al pool
      client.release();
    }
  }
};

module.exports = RecetasModel;
