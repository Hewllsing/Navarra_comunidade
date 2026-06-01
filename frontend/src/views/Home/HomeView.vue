<template>
    <div class="home-page">
        <section class="home-hero">
            <div class="home-hero-overlay">
                <div class="container home-hero-content">
                    <span class="home-kicker">Navarra Comunidade</span>

                    <h1>
                        Canal Solidário<br>
                        Grupo Navarra
                    </h1>

                    <p>
                        Uma plataforma para submissão, análise e acompanhamento
                        de pedidos de apoio social, cultural e sustentável.
                    </p>

                    <RouterLink to="/nova-candidatura" class="home-button">
                        Submeter candidatura
                    </RouterLink>
                </div>
            </div>
        </section>

        <section class="home-info">
            <div class="container home-info-grid">
                <article>
                    <h2>Responsabilidade com impacto</h2>
                    <p>
                        O canal Navarra Comunidade permite centralizar candidaturas,
                        estruturar a análise interna e apoiar o reporte ESG.
                    </p>
                </article>

                <article>
                    <h2>Áreas de apoio</h2>
                    <p>
                        Projetos sociais, culturais, comunitários e iniciativas
                        alinhadas com sustentabilidade e impacto local.
                    </p>
                </article>

                <article>
                    <h2>Gestão eficiente</h2>
                    <p>
                        Fluxo digital para receção, análise, decisão, histórico
                        e comunicação com entidades candidatas.
                    </p>
                </article>
            </div>
        </section>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style src="./HomeView.css"></style>