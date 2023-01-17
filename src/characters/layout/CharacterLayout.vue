<script setup lang="ts">

	import type { RouteLink } from '@/router/link-routes';
	import NavBar from '@/shared/components/NavBar.vue';
	import { characterRoute } from '../router';

	const routeLinks: RouteLink[] = characterRoute.children
		?.filter( route => ( route.props as { visible: boolean; } ).visible )
		.map( route => ( {
			name: route.name as string,
			path: route.path,
			title: ( route.props as { title: string; } ).title
		} ) ) || [];

</script>

<template>
	<h1>Personajes</h1>

	<NavBar
		:show-icon="false"
		:links="routeLinks"
	/>

	<!-- <Suspense> -->
		<RouterView />
	<!-- </Suspense> -->

</template>

<style scoped>
</style>