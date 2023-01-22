import { ref, computed } from 'vue';
import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';

import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import type { Character, CharacterResponse } from '../interfaces/character';

const characters = ref<Character[]>([]);
const hasError = ref<boolean>(false);
const errorMsg = ref<string | null>(null);

const getCharacters = async (): Promise<Character[]> => {

	if (characters.value.length > 0) {
		return characters.value
	}

	const { data } = await rickAndMortyApi.get<CharacterResponse>("/character")
	return data.results
}

const loadedCharacters = (data: Character[]) => {

	hasError.value = false
	errorMsg.value = null
	characters.value = data

}

const loadCharactersError = (error: string) => {

	hasError.value = true
	errorMsg.value = error
	characters.value = []

}

export const useCharacters = () => {
	
	const { isLoading } = useQuery(
		['characters'],
		getCharacters,
		{
			onSuccess: loadedCharacters,
			onError: (error: Error) => {
				if (axios.isAxiosError(error)) {
					loadCharactersError(error.response?.data.error)
				}
			}
		}
	);

	return {
		//* Props
		characters,
		isLoading,
		hasError,
		errorMsg,

		//* Getters
		count: computed(() => characters.value.length),

		//* Methods
	}

}
