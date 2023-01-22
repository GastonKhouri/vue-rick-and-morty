import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/shared/pages/HomePage.vue';
import AboutPage from '@/shared/pages/AboutPage.vue';
import { characterRoute } from '@/characters/router';

const router = createRouter( {
	history: createWebHistory( import.meta.env.BASE_URL ),
	routes: [
		// Public routes
		{ path: '/', name: 'home', component: HomePage, },
		{ path: '/about', name: 'about', component: AboutPage, },

		// Characters routes
		{
			...characterRoute,
			path: '/characters',
		},
		// characterRoute,
		// {
		// 	path: '/characters',
		// 	name: 'characters',
		// 	component: () => import( '@/characters/layout/CharacterLayout.vue' ),
		// },

		// Default route
		// { path: '/:pathMatch(.*)*', redirect: () => ( { name: 'home' } ), },
	]
} );

export default router;