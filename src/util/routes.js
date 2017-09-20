import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
	{ name: 'home', path: '/', component: Overview },
	{ name: 'movie', path: '/movie/:id', component: Detail },
	{ path: '*', redirect: { name: 'home' } },
];
