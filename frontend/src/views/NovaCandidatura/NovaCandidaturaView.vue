<template>
    <div class="page">
        <div class="container">
            <h1 class="section-title">Nova Candidatura</h1>

            <form class="form-card" @submit.prevent="submeterCandidatura">
                <div class="form-group">
                    <label>Nome da organização</label>
                    <input v-model="form.nome_organizacao" type="text" required />
                </div>

                <div class="form-group">
                    <label>Tipo de entidade</label>
                    <input v-model="form.tipo_entidade" type="text" required />
                </div>

                <div class="form-group">
                    <label>Área de atuação</label>
                    <select v-model="form.area_atuacao" required>
                        <option value="">Selecione</option>
                        <option value="Navarra Solidária">Navarra Solidária</option>
                        <option value="Navarra Cultura">Navarra Cultura</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Nome da pessoa de contacto</label>
                    <input v-model="form.nome_contacto" type="text" required />
                </div>

                <div class="form-group">
                    <label>Email de contacto</label>
                    <input v-model="form.email_contacto" type="email" required />
                </div>

                <div class="form-group">
                    <label>Telefone</label>
                    <input v-model="form.telefone_contacto" type="text" />
                </div>

                <div class="form-group">
                    <label>Nome do projeto</label>
                    <input v-model="form.nome_projeto" type="text" required />
                </div>

                <div class="form-group">
                    <label>Descrição do projeto</label>
                    <textarea v-model="form.descricao_projeto" rows="5" required></textarea>
                </div>

                <div class="form-group">
                    <label>Tipo de apoio pretendido</label>
                    <input v-model="form.tipo_apoio" type="text" required />
                </div>

                <div class="form-group">
                    <label>Número estimado de beneficiários</label>
                    <input v-model="form.numero_beneficiarios" type="number" min="0" />
                </div>

                <div class="form-check">
                    <input v-model="form.consentimento_rgpd" type="checkbox" required />
                    <label>
                        Confirmo que li e aceito a Política de Privacidade e autorizo o tratamento dos dados.
                    </label>
                </div>

                <button type="submit" class="btn-primary" :disabled="loading">
                    {{ loading ? 'A submeter...' : 'Submeter candidatura' }}
                </button>
            </form>

            <div v-if="mensagem" class="success-message">
                {{ mensagem }}
            </div>

            <div v-if="erro" class="error-message">
                {{ erro }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { criarCandidatura } from '../../services/candidaturaService';

const loading = ref(false);
const mensagem = ref('');
const erro = ref('');

const form = reactive({
    nome_organizacao: '',
    tipo_entidade: '',
    area_atuacao: '',
    nome_contacto: '',
    email_contacto: '',
    telefone_contacto: '',
    nome_projeto: '',
    descricao_projeto: '',
    tipo_apoio: '',
    numero_beneficiarios: '',
    consentimento_rgpd: false
});

async function submeterCandidatura() {
    try {
        loading.value = true;
        mensagem.value = '';
        erro.value = '';

        const dados = {
            ...form,
            numero_beneficiarios: form.numero_beneficiarios
                ? Number(form.numero_beneficiarios)
                : null
        };

        const response = await criarCandidatura(dados);

        mensagem.value = `Candidatura submetida com sucesso. Número: ${response.candidatura.numero_candidatura}`;

        Object.keys(form).forEach((key) => {
            form[key] = key === 'consentimento_rgpd' ? false : '';
        });
    } catch (error) {
        erro.value = error.response?.data?.message || 'Erro ao submeter candidatura.';
    } finally {
        loading.value = false;
    }
}
</script>