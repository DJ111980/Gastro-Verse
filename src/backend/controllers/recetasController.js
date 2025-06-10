/**
 * @fileoverview Controlador para gestión de recetas - Capa de control MVC
 * @author Danilo
 * @version 1.0.0
 * @description Maneja peticiones HTTP relacionadas con CRUD de recetas
 */

const RecetasService = require('../services/recetasService');

/**
 * Controlador de recetas siguiendo patrón MVC
 * Intercepta requests HTTP y delega lógica de negocio al servicio
 * @namespace RecetasController
 */
const RecetasController = {
  /**
   * Crear nueva receta
   * @async
   * @param {Object} req - Request de Express con datos de receta
   * @param {Object} res - Response de Express
   * @returns {Promise<void>} JSON con receta creada o error
   */
  async crearReceta(req, res) {
    try {
      // Delegación al servicio para lógica de negocio
      const receta = await RecetasService.crearReceta(req.body);
      res.status(201).json(receta);
    } catch (error) {
      // Manejo de errores de validación o BD
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Obtener listado completo de recetas
   * @async
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @returns {Promise<void>} Array de recetas en JSON
   */
  async obtenerTodas(req, res) {
    try {
      const recetas = await RecetasService.listarRecetas();
      res.json(recetas);
    } catch (error) {
      // Error genérico para fallos de BD o sistema
      res.status(500).json({ error: 'Error al obtener recetas' });
    }
  },

  /**
   * Obtener receta específica por ID
   * @async
   * @param {Object} req - Request con parámetro ID en URL
   * @param {Object} res - Response de Express
   * @returns {Promise<void>} Receta específica o error 404
   */
  async obtenerPorId(req, res) {
    try {
      const receta = await RecetasService.obtenerUna(req.params.id);
      
      // Validación de existencia antes de responder
      if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });
      
      res.json(receta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Actualizar receta existente
   * @async
   * @param {Object} req - Request con ID y datos actualizados
   * @param {Object} res - Response de Express
   * @returns {Promise<void>} Receta actualizada o error
   */
  async actualizarReceta(req, res) {
    try {
      const { id } = req.params;
      const receta = await RecetasService.actualizarReceta(id, req.body);
      
      // Verificación de existencia para UPDATE
      if (!receta) {
        return res.status(404).json({ error: 'Receta no encontrada' });
      }
      
      res.json(receta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Eliminar receta por ID
   * @async
   * @param {Object} req - Request con ID en parámetros
   * @param {Object} res - Response de Express
   * @returns {Promise<void>} Confirmación de eliminación o error
   */
  async eliminarReceta(req, res) {
    try {
      const { id } = req.params;
      const receta = await RecetasService.eliminarReceta(id);
      
      // Validación antes de confirmar eliminación
      if (!receta) {
        return res.status(404).json({ error: 'Receta no encontrada' });
      }
      
      res.json({ mensaje: 'Receta eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = RecetasController;
