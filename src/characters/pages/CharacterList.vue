<script setup lang="ts">

import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import { useQuery } from '@tanstack/vue-query';
import CardList from '../components/CardList.vue'
import type { CharacterResponse } from '../interfaces/character';

const props = defineProps<{
	visible: boolean,
	title: string
}>()

const getCharacters = async () => {
	const { data } = await rickAndMortyApi.get<CharacterResponse>("/character")
	return data.results
}

const { isLoading, data: characters = [] } = useQuery(
	['characters'],
	getCharacters,
);

</script>

<template>

	<h1>{{ props.title }}</h1>

	<h1 v-if="isLoading">Cargando...</h1>

	<CardList v-else :characters="characters" />

</template>

<style scoped>
</style>