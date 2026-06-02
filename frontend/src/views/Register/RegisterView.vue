<template>
    <div class="page">
        <div class="container">

            <div class="auth-card">

                <h1>Criar Conta</h1>

                <form @submit.prevent="criarConta">

                    <div class="form-group">
                        <label>Nome</label>

                        <input
                            v-model="nome"
                            type="text"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label>Email</label>

                        <input
                            v-model="email"
                            type="email"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label>Password</label>

                        <input
                            v-model="password"
                            type="password"
                            required
                        />
                    </div>

                    <button
                        class="btn-primary"
                        type="submit"
                    >
                        Criar Conta
                    </button>

                </form>

                <p v-if="mensagem" class="success-message">
                    {{ mensagem }}
                </p>

                <p v-if="erro" class="error-message">
                    {{ erro }}
                </p>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import { register } from '../../services/authService';

const nome = ref('');
const email = ref('');
const password = ref('');

const mensagem = ref('');
const erro = ref('');

async function criarConta() {
    try {
        erro.value = '';
        mensagem.value = '';

        await register({
            nome: nome.value,
            email: email.value,
            password: password.value
        });

        mensagem.value =
            'Conta criada com sucesso.';
    } catch (error) {
        erro.value =
            error.response?.data?.message ||
            'Erro ao criar conta.';
    }
}
</script>