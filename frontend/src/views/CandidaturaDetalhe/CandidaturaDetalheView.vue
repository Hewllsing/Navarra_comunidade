<template>
    <div class="page">
        <div class="container">

            <RouterLink to="/backoffice" class="back-link">
                ← Voltar ao Backoffice
            </RouterLink>

            <div v-if="loading">
                A carregar candidatura...
            </div>

            <div v-else-if="candidatura" class="detail-card">

                <div class="detail-header">
                    <div>
                        <h1>{{ candidatura.numero_candidatura }}</h1>
                        <p>{{ candidatura.nome_organizacao }}</p>
                    </div>

                    <span class="estado">
                        {{ candidatura.estado }}
                    </span>
                </div>

                <section class="detail-section">
                    <h2>Estado da candidatura</h2>

                    <div class="estado-form">
                        <select v-model="novoEstado">
                            <option value="Recebido">Recebido</option>
                            <option value="Em análise">Em análise</option>
                            <option value="Informação pendente">Informação pendente</option>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Não aprovado">Não aprovado</option>
                            <option value="Elegível mas não apoiado">
                                Elegível mas não apoiado
                            </option>
                        </select>

                        <button class="btn-primary" @click="salvarEstado">
                            Guardar estado
                        </button>
                    </div>
                </section>

                <section class="detail-section">
                    <h2>Informações da organização</h2>

                    <div class="detail-grid">
                        <p><strong>Organização:</strong> {{ candidatura.nome_organizacao }}</p>
                        <p><strong>Tipo:</strong> {{ candidatura.tipo_entidade }}</p>
                        <p><strong>NIF:</strong> {{ candidatura.nif }}</p>
                        <p><strong>Morada:</strong> {{ candidatura.morada }}</p>
                        <p><strong>Cidade:</strong> {{ candidatura.cidade }}</p>
                        <p><strong>Código postal:</strong> {{ candidatura.codigo_postal }}</p>
                        <p><strong>Website:</strong> {{ candidatura.website }}</p>
                        <p><strong>Obrigações fiscais:</strong> {{ candidatura.obrigacoes_fiscais }}</p>
                    </div>
                </section>

                <section class="detail-section">
                    <h2>Contacto</h2>

                    <div class="detail-grid">
                        <p><strong>Nome:</strong> {{ candidatura.nome_contacto }}</p>
                        <p><strong>Cargo:</strong> {{ candidatura.cargo_contacto }}</p>
                        <p><strong>Email:</strong> {{ candidatura.email_contacto }}</p>
                        <p><strong>Telefone:</strong> {{ candidatura.telefone_contacto }}</p>
                    </div>
                </section>

                <section class="detail-section">
                    <h2>Projeto</h2>

                    <div class="detail-grid">
                        <p><strong>Nome do projeto:</strong> {{ candidatura.nome_projeto }}</p>
                        <p><strong>Área:</strong> {{ candidatura.area_atuacao }}</p>
                        <p><strong>Tipo de apoio:</strong> {{ candidatura.tipo_apoio }}</p>
                        <p><strong>Local de apoio:</strong> {{ candidatura.local_apoio }}</p>
                        <p><strong>Data início:</strong> {{ candidatura.data_inicio }}</p>
                        <p><strong>Data fim:</strong> {{ candidatura.data_fim }}</p>
                        <p><strong>Localização:</strong> {{ candidatura.localizacao_projeto }}</p>
                        <p><strong>Alcance:</strong> {{ candidatura.alcance_geografico }}</p>
                    </div>

                    <p class="text-block">
                        <strong>Descrição:</strong><br />
                        {{ candidatura.descricao_projeto }}
                    </p>

                    <p class="text-block">
                        <strong>Indicadores/KPIs:</strong><br />
                        {{ candidatura.indicadores_kpi }}
                    </p>
                </section>

                <section class="detail-section">
                    <h2>Impacto</h2>

                    <div class="detail-grid">
                        <p><strong>Tipo de impacto:</strong> {{ candidatura.tipo_impacto }}</p>
                        <p><strong>Beneficiários:</strong> {{ candidatura.numero_beneficiarios }}</p>
                    </div>

                    <p class="text-block">
                        <strong>Objetivos de impacto:</strong><br />
                        {{ candidatura.objetivos_impacto }}
                    </p>
                </section>

                <div v-if="mensagem" class="success-message">
                    {{ mensagem }}
                </div>

                <div v-if="erro" class="error-message">
                    {{ erro }}
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import {
    obterCandidaturaPorId,
    atualizarEstadoCandidatura
} from '../../services/candidaturaService';

const route = useRoute();

const candidatura = ref(null);
const novoEstado = ref('');
const loading = ref(true);
const mensagem = ref('');
const erro = ref('');

async function carregarCandidatura() {
    try {
        loading.value = true;

        const data = await obterCandidaturaPorId(route.params.id);

        candidatura.value = data;
        novoEstado.value = data.estado;
    } catch (error) {
        erro.value = 'Erro ao carregar candidatura.';
    } finally {
        loading.value = false;
    }
}

async function salvarEstado() {
    try {
        mensagem.value = '';
        erro.value = '';

        await atualizarEstadoCandidatura(route.params.id, novoEstado.value);

        candidatura.value.estado = novoEstado.value;
        mensagem.value = 'Estado atualizado com sucesso.';
    } catch (error) {
        erro.value = 'Erro ao atualizar estado.';
    }
}

onMounted(() => {
    carregarCandidatura();
});
</script>

<style src="./CandidaturaDetalheView.css"></style>