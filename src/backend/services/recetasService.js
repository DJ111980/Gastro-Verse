/**
 * @fileoverview Servicio principal de gestión de recetas
 * @author Danilo
 * @version 1.0.0
 * @description Lógica de negocio para operaciones CRUD de recetas
 */

const RecetasModel = require('../models/recetasModel');

/**
 * Servicio de Recetas
 * Núcleo de la aplicación - gestiona todas las operaciones de recetas
 * @namespace RecetasService
 */
const RecetasService = {
  /**
   * Crear nueva receta en el sistema
   * @param {Object} data - Datos de la receta.
   * @param {number} usuarioId - ID del usuario que crea la receta.
   * @returns {Promise<Object>} Receta creada.
   */
  async crearReceta(data, usuarioId) {
  // Añadimos el usuarioId a los datos que se pasarán al modelo.
    const recetaData = { ...data, usuario_id: usuarioId };
    return await RecetasModel.crearReceta(recetaData);
  },

  /**
   * Obtener todas las recetas públicas
   * @returns {Promise<Array>} Lista completa de recetas
   */
  async listarRecetas() {
    return await RecetasModel.obtenerTodas();
  },

  /**
   * Obtener receta específica por ID
   * @param {number} id - ID de la receta
   * @returns {Promise<Object|null>} Receta encontrada o null
   */
  async obtenerUna(id) {
    return await RecetasModel.obtenerPorId(id);
  },

  /**
   * Actualizar receta existente, verificando la propiedad primero.
   * @param {number} recetaId - ID de la receta.
   * @param {Object} data - Nuevos datos.
   * @param {number} usuarioId - ID del usuario que intenta la acción.
   * @returns {Promise<Object>} Receta actualizada.
   * @throws {Error} Si la receta no existe o el usuario no es el propietario.
   */
  async actualizarReceta(recetaId, data, usuarioId) {
    const recetaExistente = await RecetasModel.obtenerPorId(recetaId);

    if (!recetaExistente) {
      throw new Error('Receta no encontrada');
    }

    if (recetaExistente.usuario_id !== usuarioId) {
      throw new Error('Acción no autorizada. No eres el propietario de esta receta.');
    }

    return await RecetasModel.actualizarReceta(recetaId, data);
  },

  /**
   * Eliminar receta, verificando la propiedad primero.
   * @param {number} recetaId - ID de la receta a eliminar.
   * @param {number} usuarioId - ID del usuario que intenta la acción.
   * @returns {Promise<Object>} Resultado de la eliminación.
   * @throws {Error} Si la receta no existe o el usuario no es el propietario.
   */
 async eliminarReceta(recetaId, usuarioId) {
    const recetaExistente = await RecetasModel.obtenerPorId(recetaId);

    if (!recetaExistente) {
      throw new Error('Receta no encontrada');
    }

    if (recetaExistente.usuario_id !== usuarioId) {
      throw new Error('Acción no autorizada. No eres el propietario de esta receta.');
    }

    return await RecetasModel.eliminarReceta(recetaId);
  },
  
  /**
   * Lista todas las recetas pertenecientes a un usuario específico.
   * @param {number} usuarioId - El ID del usuario.
   * @returns {Promise<Array>} Lista de recetas del usuario.
   */
  async listarRecetasPorUsuario(usuarioId) {
    return await RecetasModel.listarRecetasPorUsuario(usuarioId);
  }
};

/**
 * Exportación del servicio de recetas
 * Core service de la aplicación GastroVerse
 */
module.exports = RecetasService;
