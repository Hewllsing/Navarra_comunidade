import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/Home/HomeView.vue';
import NovaCandidaturaView from '../views/NovaCandidatura/NovaCandidaturaView.vue';
import ConsultarPedidoView from '../views/ConsultarPedido/ConsultarPedidoView.vue';
import BackofficeView from '../views/Backoffice/BackofficeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/nova-candidatura',
        name: 'nova-candidatura',
        component: NovaCandidaturaView
    },
    {
        path: '/consultar',
        name: 'consultar-pedido',
        component: ConsultarPedidoView
    },
    {
        path: '/backoffice',
        name: 'backoffice',
        component: BackofficeView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;