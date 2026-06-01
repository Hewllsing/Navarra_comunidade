const candidaturaService = require('../services/candidaturaService');

async function criarCandidatura(req, res) {
    try {
        const resultado = await candidaturaService.criarCandidatura(req.body);

        res.status(201).json({
            message: 'Candidatura submetida com sucesso',
            candidatura: resultado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao submeter candidatura',
            error: error.message
        });
    }
}

async function listarCandidaturas(req, res) {
    try {
        const candidaturas = await candidaturaService.listarCandidaturas();

        res.json(candidaturas);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao listar candidaturas',
            error: error.message
        });
    }
}

module.exports = {
    criarCandidatura,
    listarCandidaturas
};