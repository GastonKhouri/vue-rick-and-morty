import { onMounted, ref } from 'vue';
import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import type { Character, CharacterResponse } from '../interfaces/character';
import axios from 'axios';

const characters = ref<Character[]>( [] );
const isLoading = ref<boolean>( true );
const hasError = ref<boolean>( false );
const errorMessage = ref<string>( '' );

export const useCharacters = () => {

	onMounted( () => {
		loadCharacters();
	} );

	const loadCharacters = async () => {

		if ( characters.value.length > 0 ) return;

		isLoading.value = true;
		hasError.value = false;

		try {

			const { data } = await rickAndMortyApi.get<CharacterResponse>( "/character" );
			characters.value = data.results;
			isLoading.value = false;

		} catch ( error ) {

			hasError.value = true;
			isLoading.value = false;

			if ( axios.isAxiosError( error ) ) {
				errorMessage.value = error.response?.data.error;
				return;
			}

			errorMessage.value = JSON.stringify( error );

		}

	};

	return {
		characters,
		isLoading,
		hasError,
		errorMessage,
	};

};
