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
   * @param {Object} data - Datos de la receta (titulo, instrucciones, tiempo_preparacion, dificultad)
   * @returns {Promise<Object>} Receta creada con ID generado
   */
  async crearReceta(data) {
    return await RecetasModel.crearReceta(data);
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
   * Actualizar receta existente
   * @param {number} id - ID de la receta
   * @param {Object} data - Nuevos datos de la receta
   * @returns {Promise<Object>} Receta actualizada
   */
  async actualizarReceta(id, data) {
    return await RecetasModel.actualizarReceta(id, data);
  },

  /**
   * Eliminar receta del sistema
   * @param {number} id - ID de la receta a eliminar
   * @returns {Promise<Object>} Resultado de la eliminación
   */
  async eliminarReceta(id) {
    return await RecetasModel.eliminarReceta(id);
  }
};

/**
 * Exportación del servicio de recetas
 * Core service de la aplicación GastroVerse
 */
module.exports = RecetasService;