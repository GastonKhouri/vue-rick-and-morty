<script setup lang="ts">

import CardList from '../components/CardList.vue';
import { useCharacters } from '../composables';

const props = defineProps<{
	visible: boolean,
	title: string
}>()

const { 
	characters, 
	errorMsg, 
	hasError, 
	isLoading 
} = useCharacters();

</script>

<template>

	<h1>{{ props.title }}</h1>

	<h1 v-if="isLoading">Cargando...</h1>

	<div v-else-if="hasError">
		<h1>Error al cargar</h1>
		<p>{{ errorMsg }}</p>
	</div>

	<CardList v-else :characters="characters" />

</template>

<style scoped>
</style>