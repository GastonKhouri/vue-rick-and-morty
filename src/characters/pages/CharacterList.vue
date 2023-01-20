<script setup lang="ts">

import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import characterStore from '@/store/characters.store';
import { useQuery } from '@tanstack/vue-query';
import CardList from '../components/CardList.vue'
import type { Character, CharacterResponse } from '../interfaces/character';
import axios from 'axios';

const props = defineProps<{
	visible: boolean,
	title: string
}>()

const getCharacters = async (): Promise<Character[]> => {

	if (characterStore.characters.count > 0) {
		return characterStore.characters.list
	}

	const { data } = await rickAndMortyApi.get<CharacterResponse>("/character")
	return data.results
}

useQuery(
	['characters'],
	getCharacters,
	{
		onSuccess: (data: Character[]) => {
			characterStore.loadedCharacters(data)
		},
		onError: (error: Error) => {
			if (axios.isAxiosError(error)) {
				characterStore.loadCharactersError(error.response?.data.error)
			}
		}
	}
);

</script>

<template>

	<h1>{{ props.title }}</h1>

	<h1 v-if="characterStore.characters.isLoading">Cargando...</h1>

	<div v-else-if="characterStore.characters.hasError">
		<h1>Error al cargar</h1>
		<p>{{ characterStore.characters.errorMsg }}</p>
	</div>

	<CardList v-else :characters="characterStore.characters.list" />

</template>

<style scoped>
</style>