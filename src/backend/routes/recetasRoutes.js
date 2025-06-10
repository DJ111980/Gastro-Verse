/**
 * @fileoverview Rutas para gestión de recetas del sistema
 * @author Danilo
 * @version 1.0.0
 * @description Endpoints públicos y privados para CRUD de recetas
 */

const express = require('express');
const router = express.Router();
const RecetasController = require('../controllers/recetasController');
const { verificarToken } = require('../middlewares/authMiddleware'); 
const { validarId, validarCrearReceta } = require('../middlewares/validaciones/usuariosValidator');
const manejoErroresValidacion = require('../middlewares/manejoErroresValidacion');

/**
 * RUTAS PÚBLICAS - No requieren autenticación
 */

/**
 * GET /api/v1/recetas
 * Listar todas las recetas con paginación opcional
 */
router.get('/', RecetasController.obtenerTodas);

/**
 * GET /api/v1/recetas/:id
 * Obtener receta específica por ID
 */
router.get('/:id', validarId, manejoErroresValidacion, RecetasController.obtenerPorId);

/**
 * RUTAS PROTEGIDAS - Requieren token JWT
 */

/**
 * POST /api/v1/recetas
 * Crear nueva receta (solo usuarios autenticados)
 */
router.post('/', verificarToken, validarCrearReceta, manejoErroresValidacion, RecetasController.crearReceta);

/**
 * PUT /api/v1/recetas/:id
 * Actualizar receta existente (solo propietario)
 */
router.put('/:id', verificarToken, validarId, validarCrearReceta, manejoErroresValidacion, RecetasController.actualizarReceta);

/**
 * DELETE /api/v1/recetas/:id
 * Eliminar receta (solo propietario)
 */
router.delete('/:id', verificarToken, validarId, manejoErroresValidacion, RecetasController.eliminarReceta);

module.exports = router;