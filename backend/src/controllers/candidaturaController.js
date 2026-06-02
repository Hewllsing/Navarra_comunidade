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

async function obterCandidaturaPorId(req, res) {
    try {
        const { id } = req.params;

        const candidatura = await candidaturaService.obterCandidaturaPorId(id);

        if (!candidatura) {
            return res.status(404).json({
                message: 'Candidatura não encontrada'
            });
        }

        res.json(candidatura);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao obter candidatura',
            error: error.message
        });
    }
}

async function atualizarEstado(req, res) {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({
                message: 'Estado é obrigatório'
            });
        }

        await candidaturaService.atualizarEstado(id, estado);

        res.json({
            message: 'Estado da candidatura atualizado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar estado da candidatura',
            error: error.message
        });
    }
}

module.exports = {
    criarCandidatura,
    listarCandidaturas,
    obterCandidaturaPorId,
    atualizarEstado
};