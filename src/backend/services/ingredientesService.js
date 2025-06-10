/**
 * @fileoverview Servicio de gestión de ingredientes de recetas
 * @author Danilo
 * @version 1.0.0
 * @description Lógica de negocio para operaciones CRUD de ingredientes
 */

const IngredientesModel = require('../models/ingredientesModel');

/**
 * Servicio de Ingredientes
 * Centraliza operaciones de ingredientes para recetas
 * @namespace IngredientesService
 */
const IngredientesService = {
  /**
   * Crear nuevo ingrediente para una receta
   * @param {Object} data - Datos del ingrediente (nombre, receta_id, cantidad, unidad)
   * @returns {Promise<Object>} Ingrediente creado con ID generado
   */
  async crearIngrediente(data) {
    return await IngredientesModel.crearIngrediente(data);
  },

  /**
   * Listar ingredientes de una receta específica
   * @param {number} receta_id - ID de la receta
   * @returns {Promise<Array>} Lista de ingredientes de la receta
   */
  async listarPorReceta(receta_id) {
    return await IngredientesModel.obtenerPorReceta(receta_id);
  },

  /**
   * Actualizar datos de un ingrediente existente
   * @param {number} id - ID del ingrediente
   * @param {Object} data - Nuevos datos del ingrediente
   * @returns {Promise<Object>} Ingrediente actualizado
   */
  async actualizarIngrediente(id, data) {
    return await IngredientesModel.actualizarIngrediente(id, data);
  },

  /**
   * Eliminar ingrediente por ID
   * @param {number} id - ID del ingrediente a eliminar
   * @returns {Promise<Object>} Resultado de la eliminación
   */
  async eliminarIngrediente(id) {
    return await IngredientesModel.eliminarIngrediente(id);
  }
};

/**
 * Exportación del servicio de ingredientes
 * Patrón Service Layer para arquitectura MVC
 */
module.exports = IngredientesService;