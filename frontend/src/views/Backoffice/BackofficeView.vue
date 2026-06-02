<template>
    <div class="page">
        <div class="container">

            <h1 class="section-title">
                Backoffice
            </h1>

            <p class="section-description">
                Gestão de candidaturas Navarra Comunidade
            </p>

            <table class="candidaturas-table">

                <thead>
                    <tr>
                        <th>Nº</th>
                        <th>Organização</th>
                        <th>Área</th>
                        <th>Projeto</th>
                        <th>Estado</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="candidatura in candidaturas" :key="candidatura.id" class="table-row-clickable"
                        @click="abrirDetalhe(candidatura.id)">

                        <td>{{ candidatura.numero_candidatura }}</td>

                        <td>{{ candidatura.nome_organizacao }}</td>

                        <td>{{ candidatura.area_atuacao }}</td>

                        <td>{{ candidatura.nome_projeto }}</td>

                        <td>
                            <span class="estado">
                                {{ candidatura.estado }}
                            </span>
                        </td>

                        <td>
                            {{ formatarData(candidatura.data_submissao) }}
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { listarCandidaturas } from '../../services/candidaturaService';


const router = useRouter();
function abrirDetalhe(id) {
    router.push(`/backoffice/candidaturas/${id}`);
}

const candidaturas = ref([]);
async function carregarCandidaturas() {
    try {
        candidaturas.value = await listarCandidaturas();
    } catch (error) {
        console.error(error);
    }
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-PT');
}

onMounted(() => {
    carregarCandidaturas();
});
</script>

<style src="./BackofficeView.css"></style>