import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import axios from 'axios';

import type { Character } from '../interfaces/character';
import { rickAndMortyApi } from '../../api/rickAndMortyApi';

const characterSet = ref<{ [id: string]: Character }>({})
const hasError = ref<boolean>(false)
const errorMsg = ref<string | null>(null)

const getCharacter = async (id: string) => {

	if (characterSet.value[id]) {
		return characterSet.value[id]
	}

	const { data } = await rickAndMortyApi.get(`/character/${id}`);
	return data;

};

const loadedCharacter = (data: Character) => {

	hasError.value = false
	errorMsg.value = null
	characterSet.value[data.id] = data

}

const loadCharacterError = (error: string) => {

	hasError.value = true
	errorMsg.value = error
	characterSet.value = {}

}

export const useCharacter = () => {

	const route = useRoute();

	const { id } = route.params as { id: string };
	
	const { isLoading } = useQuery(
		['character', id],
		() => getCharacter(id),
		{
			onSuccess: loadedCharacter,
			onError: (error: Error) => {
				if (axios.isAxiosError(error)) {
					loadCharacterError(error.response?.data.error)
				}
			}
		}
	)
	
	return {
		//* Props
		list: characterSet,
		isLoading,
		hasError,
		errorMsg,

		//* Getters
		character: computed<Character | null>(() => characterSet.value[id]),

		//* Methods
	}
}
