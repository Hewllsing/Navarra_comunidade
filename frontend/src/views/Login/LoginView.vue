<template>
    <div class="page">
        <div class="container">

            <div class="auth-card">

                <h1>Entrar</h1>

                <form @submit.prevent="fazerLogin">

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
                        Entrar
                    </button>

                </form>

                <p v-if="erro" class="error-message">
                    {{ erro }}
                </p>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
    login,
    guardarSessao
} from '../../services/authService';

const router = useRouter();

const email = ref('');
const password = ref('');
const erro = ref('');

async function fazerLogin() {
    try {
        erro.value = '';

        const response = await login({
            email: email.value,
            password: password.value
        });

        guardarSessao(
            response.token,
            response.user
        );

        if (response.user.role === 'admin') {
            router.push('/backoffice');
            return;
        }

        router.push('/minhas-candidaturas');
    } catch (error) {
        erro.value =
            error.response?.data?.message ||
            'Erro ao efetuar login';
    }
}
</script>