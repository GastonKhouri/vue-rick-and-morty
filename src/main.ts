import { createApp } from 'vue';
import { VueQueryPlugin } from "@tanstack/vue-query";

import router from './router';
import App from './App.vue';

import '@/store/characters.store';
import './assets/main.css';

const app = createApp( App );

VueQueryPlugin.install( app, {
	queryClientConfig: {
		defaultOptions: {
			queries: {
				cacheTime: 1000 * 120,
				refetchOnReconnect: 'always',
			}
		}
	}
} );

app.use( router );
app.mount( '#app' );
