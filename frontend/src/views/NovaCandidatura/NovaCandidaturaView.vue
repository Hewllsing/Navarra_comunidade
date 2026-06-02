<template>
    <div class="page">
        <div class="container">
            <div class="wizard-layout">

                <aside class="wizard-sidebar">
                    <h2>
                        Formulário Apoios - Donativos | Navarra Comunidade
                    </h2>

                    <button
                        v-for="etapa in etapas"
                        :key="etapa.numero"
                        type="button"
                        class="wizard-step"
                        :class="{ active: etapaAtual === etapa.numero }"
                        @click="irParaEtapa(etapa.numero)"
                    >
                        <span>{{ etapa.numero }}</span>
                        {{ etapa.titulo }}
                    </button>
                </aside>

                <section class="wizard-content">
                    <form @submit.prevent="submeterCandidatura">

                        <!-- ETAPA 1 -->
                        <div v-if="etapaAtual === 1" class="wizard-panel">
                            <h1>1. Critérios de Elegibilidade</h1>

                            <div class="form-group">
                                <label>Designação da organização *</label>
                                <input
                                    v-model="form.nome_organizacao"
                                    type="text"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label>Tipo de entidade *</label>
                                <select v-model="form.tipo_entidade" required>
                                    <option value="">Selecione</option>
                                    <option value="IPSS">IPSS</option>
                                    <option value="ONG">ONG</option>
                                    <option value="Associação sem fins lucrativos">
                                        Associação sem fins lucrativos
                                    </option>
                                    <option value="Fundação">Fundação</option>
                                    <option value="Instituição de Ensino">
                                        Instituição de Ensino
                                    </option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>
                                    A entidade cumpre com as obrigações fiscais? *
                                </label>

                                <select v-model="form.obrigacoes_fiscais" required>
                                    <option value="">Selecione</option>
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </select>
                            </div>
                        </div>

                        <!-- ETAPA 2 -->
                        <div v-if="etapaAtual === 2" class="wizard-panel">
                            <h1>2. Informações Gerais</h1>

                            <div class="form-grid">
                                <div class="form-group">
                                    <label>Morada *</label>
                                    <input v-model="form.morada" type="text" />
                                </div>

                                <div class="form-group">
                                    <label>Código postal *</label>
                                    <input v-model="form.codigo_postal" type="text" />
                                </div>

                                <div class="form-group">
                                    <label>Cidade *</label>
                                    <input v-model="form.cidade" type="text" />
                                </div>

                                <div class="form-group">
                                    <label>NIF *</label>
                                    <input v-model="form.nif" type="text" />
                                </div>

                                <div class="form-group">
                                    <label>Website</label>
                                    <input v-model="form.website" type="text" />
                                </div>
                            </div>

                            <h3>Pessoa de contacto</h3>

                            <div class="form-grid">
                                <div class="form-group">
                                    <label>Nome *</label>
                                    <input v-model="form.nome_contacto" type="text" required />
                                </div>

                                <div class="form-group">
                                    <label>Cargo</label>
                                    <input v-model="form.cargo_contacto" type="text" />
                                </div>

                                <div class="form-group">
                                    <label>Telefone</label>
                                    <input v-model="form.telefone_contacto" type="text" />
                                </div>

                                <div class="form-group">
                                    <label>Email *</label>
                                    <input v-model="form.email_contacto" type="email" required />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Área de atuação *</label>
                                <select v-model="form.area_atuacao" required>
                                    <option value="">Selecione</option>
                                    <option value="Navarra Solidária">Navarra Solidária</option>
                                    <option value="Navarra Cultura">Navarra Cultura</option>
                                </select>
                            </div>
                        </div>

                        <!-- ETAPA 3 -->
                        <div v-if="etapaAtual === 3" class="wizard-panel">
                            <h1>3. Tipologia do Donativo</h1>

                            <div class="form-group">
                                <label>Tipo de apoio pretendido *</label>
                                <select v-model="form.tipo_apoio" required>
                                    <option value="">Selecione</option>
                                    <option value="Donativo financeiro">
                                        Donativo financeiro
                                    </option>
                                    <option value="Materiais">
                                        Materiais
                                    </option>
                                    <option value="Equipamentos">
                                        Equipamentos
                                    </option>
                                    <option value="Voluntariado">
                                        Voluntariado
                                    </option>
                                    <option value="Outro">
                                        Outro
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>País/local onde pretende receber o apoio</label>
                                <input v-model="form.local_apoio" type="text" />
                            </div>
                        </div>

                        <!-- ETAPA 4 -->
                        <div v-if="etapaAtual === 4" class="wizard-panel">
                            <h1>4. Descrição do Projeto ou Iniciativa</h1>

                            <div class="form-group">
                                <label>Nome do projeto *</label>
                                <input v-model="form.nome_projeto" type="text" required />
                            </div>

                            <div class="form-group">
                                <label>Descrição do projeto *</label>
                                <textarea
                                    v-model="form.descricao_projeto"
                                    rows="6"
                                    required
                                ></textarea>
                            </div>

                            <div class="form-group">
                                <label>Indicadores/KPIs do projeto</label>
                                <textarea
                                    v-model="form.indicadores_kpi"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div class="form-grid">
                                <div class="form-group">
                                    <label>Data de início</label>
                                    <input v-model="form.data_inicio" type="date" />
                                </div>

                                <div class="form-group">
                                    <label>Data de fim</label>
                                    <input v-model="form.data_fim" type="date" />
                                </div>

                                <div class="form-group">
                                    <label>Localização do projeto</label>
                                    <input v-model="form.localizacao_projeto" type="text" />
                                </div>

                                <div class="form-group">
                                    <label>Alcance geográfico</label>
                                    <select v-model="form.alcance_geografico">
                                        <option value="">Selecione</option>
                                        <option value="Local">Local</option>
                                        <option value="Regional">Regional</option>
                                        <option value="Nacional">Nacional</option>
                                        <option value="Internacional">Internacional</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>É um projeto piloto?</label>
                                <select v-model="form.projeto_piloto">
                                    <option value="">Selecione</option>
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </select>
                            </div>
                        </div>

                        <!-- ETAPA 5 -->
                        <div v-if="etapaAtual === 5" class="wizard-panel">
                            <h1>5. Impacto</h1>

                            <div class="form-group">
                                <label>Tipo de impacto *</label>
                                <select v-model="form.tipo_impacto" required>
                                    <option value="">Selecione</option>
                                    <option value="Ambiente">Ambiente</option>
                                    <option value="Ação social e cidadania">
                                        Ação social e cidadania
                                    </option>
                                    <option value="Cultura e património">
                                        Cultura e património
                                    </option>
                                    <option value="Educação">Educação</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Desporto">Desporto</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Número estimado de beneficiários</label>
                                <input
                                    v-model="form.numero_beneficiarios"
                                    type="number"
                                    min="0"
                                />
                            </div>

                            <div class="form-group">
                                <label>Objetivos de impacto</label>
                                <textarea
                                    v-model="form.objetivos_impacto"
                                    rows="5"
                                ></textarea>
                            </div>
                        </div>

                        <!-- ETAPA 6 -->
                        <div v-if="etapaAtual === 6" class="wizard-panel">
                            <h1>6. Resumo</h1>

                            <div class="summary-box">
                                <p><strong>Organização:</strong> {{ form.nome_organizacao }}</p>
                                <p><strong>Tipo de entidade:</strong> {{ form.tipo_entidade }}</p>
                                <p><strong>Área:</strong> {{ form.area_atuacao }}</p>
                                <p><strong>Contacto:</strong> {{ form.nome_contacto }}</p>
                                <p><strong>Email:</strong> {{ form.email_contacto }}</p>
                                <p><strong>Projeto:</strong> {{ form.nome_projeto }}</p>
                                <p><strong>Apoio pretendido:</strong> {{ form.tipo_apoio }}</p>
                                <p><strong>Beneficiários:</strong> {{ form.numero_beneficiarios }}</p>
                            </div>

                            <div class="form-check">
                                <input
                                    v-model="form.consentimento_rgpd"
                                    type="checkbox"
                                    required
                                />

                                <label>
                                    Confirmo que li e aceito a Política de Privacidade
                                    e autorizo o tratamento dos dados.
                                </label>
                            </div>
                        </div>

                        <div class="wizard-actions">
                            <button
                                v-if="etapaAtual > 1"
                                type="button"
                                class="btn-secondary"
                                @click="etapaAnterior"
                            >
                                Anterior
                            </button>

                            <button
                                v-if="etapaAtual < 6"
                                type="button"
                                class="btn-primary"
                                @click="proximaEtapa"
                            >
                                Seguinte
                            </button>

                            <button
                                v-if="etapaAtual === 6"
                                type="submit"
                                class="btn-primary"
                                :disabled="loading"
                            >
                                {{ loading ? 'A submeter...' : 'Validar e enviar' }}
                            </button>
                        </div>
                    </form>

                    <div v-if="mensagem" class="success-message">
                        {{ mensagem }}
                    </div>

                    <div v-if="erro" class="error-message">
                        {{ erro }}
                    </div>
                </section>

            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { criarCandidatura } from '../../services/candidaturaService';

const etapaAtual = ref(1);
const loading = ref(false);
const mensagem = ref('');
const erro = ref('');

const etapas = [
    { numero: 1, titulo: 'Critérios de Elegibilidade' },
    { numero: 2, titulo: 'Informações Gerais' },
    { numero: 3, titulo: 'Tipologia do Donativo' },
    { numero: 4, titulo: 'Descrição do Projeto' },
    { numero: 5, titulo: 'Impacto' },
    { numero: 6, titulo: 'Resumo' }
];

const form = reactive({
    nome_organizacao: '',
    tipo_entidade: '',
    obrigacoes_fiscais: '',

    morada: '',
    codigo_postal: '',
    cidade: '',
    nif: '',
    website: '',

    nome_contacto: '',
    cargo_contacto: '',
    telefone_contacto: '',
    email_contacto: '',

    area_atuacao: '',
    tipo_apoio: '',
    local_apoio: '',

    nome_projeto: '',
    descricao_projeto: '',
    indicadores_kpi: '',
    data_inicio: '',
    data_fim: '',
    localizacao_projeto: '',
    alcance_geografico: '',
    projeto_piloto: '',

    tipo_impacto: '',
    numero_beneficiarios: '',
    objetivos_impacto: '',

    consentimento_rgpd: false
});

function proximaEtapa() {
    if (etapaAtual.value < 6) {
        etapaAtual.value++;
    }
}

function etapaAnterior() {
    if (etapaAtual.value > 1) {
        etapaAtual.value--;
    }
}

function irParaEtapa(numero) {
    etapaAtual.value = numero;
}

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
        etapaAtual.value = 1;
    } catch (error) {
        erro.value = error.response?.data?.message || 'Erro ao submeter candidatura.';
    } finally {
        loading.value = false;
    }
}
</script>

<style src="./NovaCandidaturaView.css"></style>