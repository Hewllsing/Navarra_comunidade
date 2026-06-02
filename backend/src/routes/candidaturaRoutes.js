const express = require('express');
const router = express.Router();

const candidaturaController = require('../controllers/candidaturaController');

router.get('/', candidaturaController.listarCandidaturas);
router.post('/', candidaturaController.criarCandidatura);
router.get('/:id', candidaturaController.obterCandidaturaPorId);
router.put('/:id/estado', candidaturaController.atualizarEstado);

module.exports = router;