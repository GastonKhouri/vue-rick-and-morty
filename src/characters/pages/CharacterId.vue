<script setup lang="ts">

import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useCharacter } from '../composables';

const { character, errorMsg, hasError, isLoading } = useCharacter();
const router = useRouter();

//* Watch para una sola propiedad
//* watchEffect para multiples propiedades

watchEffect(() => {
	if (!isLoading.value && hasError.value) {
		router.replace('/characters');
	}
});

</script>

<template>

	<h1 v-if="isLoading">Cargando...</h1>

	<div v-else-if="hasError">
		<h1>Error al cargar</h1>
		<p>{{ errorMsg }}</p>
	</div>

	<div v-else-if="character">
		<h1>{{ character.name }}</h1>
		<div class="character-container">
			<img 
				:src="character.image" 
				:alt="character.name" 
			/>
			<ul>
				<li>Genero: {{ character.gender }}</li>
				<li>Localización: {{ character.location.name }}</li>
				<li>Origen: {{ character.origin.name }}</li>
				<li>Especies: {{ character.species }}</li>
				<li>Estado: {{ character.status }}</li>
			</ul>
		</div>
	</div>

</template>

<style scoped>

.character-container {
	display: flex;
	flex-direction: row;
	align-items: center;
}

img {
	width: 150px;
	border-radius: 5px;
}

</style>