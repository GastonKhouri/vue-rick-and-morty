import { reactive } from 'vue';
import type { Character, CharacterResponse } from '@/characters/interfaces/character';
import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import axios from 'axios';

interface Store {
	characters: {
		list: Character[],
		count: number,
		isLoading: boolean,
		hasError: boolean,
		errorMsg: string | null,
	},
	ids: {
		isLoading: boolean,
		list: { [key: string]: Character },
		hasError: boolean,
		errorMsg: string | null,
	}

	// Methods
	startLoadingCharacters: () => void,
	loadedCharacters: (characters: Character[]) => void,
	loadCharactersError: (errorMsg: string) => void,

	startLoadingCharacter: (id: string) => void,
	loadedCharacter: (character: Character) => void,
	loadCharacterError: (errorMsg: string) => void,
	checkIdInStore: (id: string) => boolean,
}

// Initial state
const characterStore = reactive<Store>({
	characters: {
		count: 0,
		errorMsg: null,
		hasError: false,
		isLoading: true,
		list: []
	},
	ids: {
		list: {},
		isLoading: true,
		hasError: false,
		errorMsg: null,
	},

	// Methods
	async startLoadingCharacters() {

		try {
			const { data } = await rickAndMortyApi.get<CharacterResponse>("/character")
			this.loadedCharacters(data.results);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				this.loadCharactersError(error.response?.data.error);
			}
		}

	},

	loadedCharacters(characters: Character[]) {
		this.characters = {
			count: characters.length,
			errorMsg: null,
			hasError: false,
			isLoading: false,
			list: characters
		}
	},

	loadCharactersError(errorMsg: string) {
		this.characters = {
			count: 0,
			errorMsg: errorMsg,
			hasError: true,
			isLoading: false,
			list: []
		}
	},

	async startLoadingCharacter (id: string) {

		try {
			const { data } = await rickAndMortyApi.get<Character>(`/character/${id}`)
			this.loadedCharacter(data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				this.loadCharactersError(error.response?.data.error);
			}
		}

	},

	loadedCharacter (character: Character) {
		this.ids = {
			list: {
				...this.ids.list,
				[character.id]: character
			},
			isLoading: false,
			hasError: false,
			errorMsg: null,
		}
	},

	loadCharacterError (errorMsg: string) {
		this.ids = {
			list: {},
			isLoading: false,
			hasError: true,
			errorMsg: errorMsg,
		}
	},

	checkIdInStore (id: string) {
		return !!this.ids.list[id];
	},

});

characterStore.startLoadingCharacters();

export default characterStore;