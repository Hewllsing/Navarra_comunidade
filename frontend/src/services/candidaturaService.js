import axios from 'axios';

const API_URL = 'http://localhost:3000/api/candidaturas';

export async function criarCandidatura(dados) {
    const response = await axios.post(API_URL, dados);
    return response.data;
}

export async function listarCandidaturas() {
    const response = await axios.get(API_URL);
    return response.data;
}

export async function obterCandidaturaPorId(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

export async function atualizarEstadoCandidatura(id, estado) {
    const response = await axios.put(`${API_URL}/${id}/estado`, {
        estado
    });

    return response.data;
}