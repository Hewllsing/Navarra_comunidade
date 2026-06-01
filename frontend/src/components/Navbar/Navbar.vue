<template>
    <nav class="navbar">
        <div class="navbar-container">
            <RouterLink to="/" class="navbar-logo">
                <img src="../../assets/images/navarra-hero.jpg" alt="Navarra Comunidade Logo" class="navbar-logo-image" />
            </RouterLink>

            <div class="navbar-links">
                <RouterLink to="/">Grupo Navarra</RouterLink>
                <RouterLink to="/nova-candidatura">Candidatura</RouterLink>
                <RouterLink to="/consultar">Consultar Pedido</RouterLink>
                <RouterLink to="/backoffice">Backoffice</RouterLink>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>