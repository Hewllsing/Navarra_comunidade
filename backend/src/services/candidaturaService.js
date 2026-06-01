const db = require('../config/database');

async function criarCandidatura(dados) {
    const numeroCandidatura = `NAV-${Date.now()}`;

    const sql = `
        INSERT INTO candidaturas (
            numero_candidatura,
            nome_organizacao,
            tipo_entidade,
            area_atuacao,
            nome_contacto,
            email_contacto,
            telefone_contacto,
            nome_projeto,
            descricao_projeto,
            tipo_apoio,
            numero_beneficiarios,
            consentimento_rgpd
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        numeroCandidatura,
        dados.nome_organizacao,
        dados.tipo_entidade,
        dados.area_atuacao,
        dados.nome_contacto,
        dados.email_contacto,
        dados.telefone_contacto,
        dados.nome_projeto,
        dados.descricao_projeto,
        dados.tipo_apoio,
        dados.numero_beneficiarios,
        dados.consentimento_rgpd
    ];

    const [result] = await db.execute(sql, valores);

    return {
        id: result.insertId,
        numero_candidatura: numeroCandidatura
    };
}

async function listarCandidaturas() {
    const [rows] = await db.execute(`
        SELECT *
        FROM candidaturas
        ORDER BY data_submissao DESC
    `);

    return rows;
}

module.exports = {
    criarCandidatura,
    listarCandidaturas
};