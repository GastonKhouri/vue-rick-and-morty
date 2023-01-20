<script setup lang="ts">

import axios from 'axios';
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';

import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import characterStore from '@/store/characters.store';
import type { Character } from '../interfaces/character';

const route = useRoute();

const { id } = route.params as { id: string };

// Function to get the character with axios
const getCharacter = async (id: string) => {

	if (characterStore.checkIdInStore(id)) {
		return characterStore.ids.list[id]
	}

	const { data } = await rickAndMortyApi.get(`/character/${id}`);
	return data;
};

useQuery(
	['character', id],
	() => getCharacter(id),
	{
		onSuccess: (data: Character) => {
			characterStore.loadedCharacter(data)
		},
		onError: (error: Error) => {
			if (axios.isAxiosError(error)) {
				characterStore.loadCharactersError(error.response?.data.error)
			}
		}
	}
)

</script>

<template>

	<h1 v-if="characterStore.ids.isLoading">Cargando...</h1>

	<div v-else-if="characterStore.ids.hasError">
		<h1>Error al cargar</h1>
		<p>{{ characterStore.ids.errorMsg }}</p>
	</div>

	<div v-else>
		<h1>{{ characterStore.ids.list[id].name }}</h1>
		<div class="character-container">
			<img 
				:src="characterStore.ids.list[id].image" 
				:alt="characterStore.ids.list[id].name" 
			/>
			<ul>
				<li>Genero: {{ characterStore.ids.list[id].gender }}</li>
				<li>Localización: {{ characterStore.ids.list[id].location.name }}</li>
				<li>Origen: {{ characterStore.ids.list[id].origin.name }}</li>
				<li>Especies: {{ characterStore.ids.list[id].species }}</li>
				<li>Estado: {{ characterStore.ids.list[id].status }}</li>
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