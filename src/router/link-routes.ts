export interface RouteLink {
	name: string;
	path: string;
	title: string;
}

export const routeLinks: RouteLink[] = [
	{ name: 'home', path: '/', title: 'Inicio' },
	{ name: 'about', path: '/about', title: 'Acerca de' },
	{ name: 'characters', path: '/characters', title: 'Personajes' },
];