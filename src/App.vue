<script setup lang="ts">
	import NavBar from '@/shared/components/NavBar.vue';
	import { routeLinks } from '@/router/link-routes'
</script>

<template>

	<div class="wrapper">
		<header>
			<NavBar 
				title="Rick and Morty" 
				:links="routeLinks"
			/>
		</header>

		<main>
			<RouterView />
		</main>
	</div>

</template>

<style scoped>
	.wrapper {
		display: flex;
		flex-direction: column;
	}
</style>
