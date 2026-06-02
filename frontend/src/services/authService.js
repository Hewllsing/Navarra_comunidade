import api from './api';

const API_URL = 'http://localhost:3000/api/auth';

export async function register(dados) {
    const response = await api.post(
        `${API_URL}/register`,
        dados
    );

    return response.data;
}

export async function login(dados) {
    const response = await api.post(
        `${API_URL}/login`,
        dados
    );

    return response.data;
}

export function guardarSessao(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export function obterToken() {
    return localStorage.getItem('token');
}

export function obterUser() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}