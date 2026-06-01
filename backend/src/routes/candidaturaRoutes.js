const express = require('express');
const router = express.Router();

const candidaturaController = require('../controllers/candidaturaController');

router.get('/', candidaturaController.listarCandidaturas);
router.post('/', candidaturaController.criarCandidatura);

module.exports = router;