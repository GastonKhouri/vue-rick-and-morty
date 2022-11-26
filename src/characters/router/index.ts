import type { RouteRecordRaw } from 'vue-router';
import CharacterLayout from '@/characters/layout/CharacterLayout.vue';
import CharacterSearch from '@/characters/pages/CharacterSearch.vue';
import CharacterList from '@/characters/pages/CharacterList.vue';
import CharacterId from '@/characters/pages/CharacterId.vue';

export const characterRoute: RouteRecordRaw = {
	path: '/characters',
	redirect: '/characters/list',
	component: CharacterLayout,
	children: [
		{
			path: 'by/id',
			name: 'character-id',
			component: CharacterId,
			props: { title: 'Por ID', visible: false },
		},
		{
			path: 'list',
			name: 'character-list',
			component: CharacterList,
			props: { title: 'Lista', visible: true },
		},
		{
			path: 'search',
			name: 'character-search',
			component: CharacterSearch,
			props: { title: 'Búsqueda', visible: true },
		},
	],
};