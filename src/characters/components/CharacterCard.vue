<script setup lang="ts">

	import { toRef } from 'vue';
	import type { Character } from '../interfaces/character';

	const props = defineProps<{
		character: Character;
	}>();

	const character = toRef(props, 'character');

</script>

<template>
	<div class="character-card">
		<img v-if="!character.image" src="https://d1bvpoagx8hqbg.cloudfront.net/259/0f326ce8a41915e8b1d21ffaee087fae.jpg" alt="No image">
		<img v-else :src="character.image" :alt="character.name">
		<h3>{{ character.name }}</h3>
	</div>
</template>

<style scoped>

.character-card {
	margin-right: 5px;
	margin-left: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 10px;
}

img {
	width: 150px;
	border-radius: 5px 5px 0 0;
	box-shadow: 0px 2px 10px 0px rgba(255,255,255,0.1);
}

</style>