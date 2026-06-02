const db = require('../config/database');

async function criarCandidatura(dados) {
    const numeroCandidatura = `NAV-${Date.now()}`;

    const sql = `
        INSERT INTO candidaturas (
            numero_candidatura,

            nome_organizacao,
            tipo_entidade,
            obrigacoes_fiscais,

            morada,
            codigo_postal,
            cidade,
            nif,
            website,

            nome_contacto,
            cargo_contacto,
            telefone_contacto,
            email_contacto,

            area_atuacao,
            tipo_apoio,
            local_apoio,

            nome_projeto,
            descricao_projeto,
            indicadores_kpi,
            data_inicio,
            data_fim,
            localizacao_projeto,
            alcance_geografico,
            projeto_piloto,

            tipo_impacto,
            numero_beneficiarios,
            objetivos_impacto,

            consentimento_rgpd
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        numeroCandidatura,

        dados.nome_organizacao,
        dados.tipo_entidade,
        dados.obrigacoes_fiscais || null,

        dados.morada || null,
        dados.codigo_postal || null,
        dados.cidade || null,
        dados.nif || null,
        dados.website || null,

        dados.nome_contacto,
        dados.cargo_contacto || null,
        dados.telefone_contacto || null,
        dados.email_contacto,

        dados.area_atuacao,
        dados.tipo_apoio,
        dados.local_apoio || null,

        dados.nome_projeto,
        dados.descricao_projeto,
        dados.indicadores_kpi || null,
        dados.data_inicio || null,
        dados.data_fim || null,
        dados.localizacao_projeto || null,
        dados.alcance_geografico || null,
        dados.projeto_piloto || null,

        dados.tipo_impacto || null,
        dados.numero_beneficiarios || null,
        dados.objetivos_impacto || null,

        dados.consentimento_rgpd ? 1 : 0
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
async function obterCandidaturaPorId(id) {
    const [rows] = await db.execute(
        'SELECT * FROM candidaturas WHERE id = ?',
        [id]
    );

    return rows[0];
}
async function atualizarEstado(id, estado) {
    await db.execute(
        `
        UPDATE candidaturas
        SET estado = ?
        WHERE id = ?
        `,
        [estado, id]
    );
}

module.exports = {
    criarCandidatura,
    listarCandidaturas,
    obterCandidaturaPorId,
    atualizarEstado
};