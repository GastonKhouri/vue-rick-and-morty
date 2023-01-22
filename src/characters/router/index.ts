import type { RouteRecordRaw } from 'vue-router';
import CharacterLayout from '@/characters/layout/CharacterLayout.vue';
import CharacterSearch from '@/characters/pages/CharacterSearch.vue';
import CharacterList from '@/characters/pages/CharacterList.vue';
import CharacterId from '@/characters/pages/CharacterId.vue';

const ROUTE_NAME = 'characters';

export const characterRoute: RouteRecordRaw = {
	path: `/${ROUTE_NAME}`,
	redirect: `/${ROUTE_NAME}/list`,
	component: CharacterLayout,
	children: [
		{
			path: `/${ROUTE_NAME}/by/:id`,
			name: 'character-id',
			component: CharacterId,
			props: { title: 'Por ID', visible: false },
		},
		{
			path: `/${ROUTE_NAME}/list`,
			name: 'character-list',
			component: CharacterList,
			props: { title: 'Lista', visible: true },
		},
		{
			path: `/${ROUTE_NAME}/search`,
			name: 'character-search',
			component: CharacterSearch,
			props: { title: 'Búsqueda', visible: true },
		},
	],
};