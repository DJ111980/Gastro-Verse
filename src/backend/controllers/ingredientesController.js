/**
 * @fileoverview Controlador para gestión de ingredientes de recetas
 * @author Danilo
 * @version 1.0.0
 * @description CRUD completo de ingredientes - relación 1:N con recetas
 */

const IngredientesService = require('../services/ingredientesService');

/**
 * Controlador de ingredientes
 * Implementa operaciones CRUD básicas
 */
const IngredientesController = {
  /**
   * Crea un nuevo ingrediente para una receta
   * @param {Object} req - Request con datos del ingrediente en body
   * @param {Object} res - Response object
   * @returns {Promise<void>} Ingrediente creado con código 201
   */
  async agregarIngrediente(req, res) {
    try {
      // Delegación directa al servicio con validación incluida
      const ingrediente = await IngredientesService.crearIngrediente(req.body);
      
      // Respuesta exitosa con código HTTP apropiado
      res.status(201).json(ingrediente);
    } catch (error) {
      // Error 400 - problemas con datos de entrada
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Obtiene todos los ingredientes asociados a una receta específica
   * @param {Object} req - Request con receta_id en params
   * @param {Object} res - Response object
   * @returns {Promise<void>} Array de ingredientes de la receta
   */
  async obtenerIngredientesPorReceta(req, res) {
    try {
      // Extracción del ID desde parámetros de URL
      const receta_id = req.params.receta_id;
      
      const lista = await IngredientesService.listarPorReceta(receta_id);
      res.json(lista);
    } catch (error) {
      // Error 500 - problemas internos del servidor
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Actualiza un ingrediente existente
   * @param {Object} req - Request con id en params y datos en body
   * @param {Object} res - Response object
   * @returns {Promise<void>} Ingrediente actualizado o error 404
   */
  async actualizarIngrediente(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      
      // Intento de actualización
      const ingrediente = await IngredientesService.actualizarIngrediente(id, data);
      
      // Validación de existencia del recurso
      if (!ingrediente) {
        return res.status(404).json({ error: 'Ingrediente no encontrado' });
      }
      
      res.json(ingrediente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Elimina un ingrediente por su ID
   * @param {Object} req - Request con id en params
   * @param {Object} res - Response object
   * @returns {Promise<void>} Confirmación de eliminación o error 404
   */
  async eliminarIngrediente(req, res) {
    try {
      const { id } = req.params;
      
      // Intento de eliminación
      const ingrediente = await IngredientesService.eliminarIngrediente(id);
      
      // Validación de existencia antes de eliminar
      if (!ingrediente) {
        return res.status(404).json({ error: 'Ingrediente no encontrado' });
      }
      
      // Respuesta de confirmación sin devolver el objeto eliminado
      res.json({ mensaje: 'Ingrediente eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = IngredientesController;