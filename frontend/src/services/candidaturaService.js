import api from './api';

const API_URL = '/candidaturas';

export async function criarCandidatura(dados) {
    const response = await api.post(API_URL, dados);
    return response.data;
}

export async function listarCandidaturas() {
    const response = await api.get(API_URL);
    return response.data;
}

export async function obterCandidaturaPorId(id) {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
}

export async function atualizarEstadoCandidatura(id, estado) {
    const response = await api.put(`${API_URL}/${id}/estado`, {
        estado
    });

    return response.data;
}