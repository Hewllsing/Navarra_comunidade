const express = require('express');
const router = express.Router();

const { authenticateToken, requireAdmin } = require('../middlewares/authMiddleware');
const candidaturaController = require('../controllers/candidaturaController');

// Rotas públicas (qualquer utilizador autenticado)
router.post('/', authenticateToken, candidaturaController.criarCandidatura);
router.get('/:id', candidaturaController.obterCandidaturaPorId);

// Rotas protegidas para administração
router.get('/', authenticateToken, requireAdmin, candidaturaController.listarCandidaturas);
router.put('/:id/estado', authenticateToken, requireAdmin, candidaturaController.atualizarEstado);

module.exports = router;