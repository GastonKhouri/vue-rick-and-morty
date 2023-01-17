<script setup lang="ts">

import type { Character } from '../interfaces/character';
import CharacterCard from './CharacterCard.vue';

	//! Normal usando Suspense 
	// const { data } = await rickAndMortyApi.get<CharacterResponse>("/character")
	// const characters = data.results
	// const characters = ref<Character[]>(data.results);

	//! Con el composable
	// const { characters, isLoading, errorMessage, hasError } = useCharacters()	
	
	//! Con TanStack Query
	// const getCharactersSlow = async () => {

	// 	return new Promise(resolve => {

	// 		setTimeout( async() => {
	// 			const { data } = await rickAndMortyApi.get<CharacterResponse>("/character")
	// 			resolve(data.results)
	// 		}, 1000)

	// 	})

	// }

	// const { isLoading, data: characters } = useQuery(
	// 	['characters'],
	// 	getCharactersSlow,
	// 	// {
	// 	// 	cacheTime: 1000 * 60,
	// 	// 	refetchOnReconnect: 'always',
	// 	// }
	// );

const props = defineProps<{
	characters: Character[]
}>();

</script>

<template>
	<ul class="card-list">
		<CharacterCard
			v-for="character of props.characters" 
			:key="character.id"
			:character="character"
		/>
	</ul>
</template>

<style scoped>

.card-list {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
}

</style>
