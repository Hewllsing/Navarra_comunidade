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