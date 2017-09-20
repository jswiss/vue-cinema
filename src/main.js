import Vue from 'vue';
import moment from 'moment-timezone';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './util/routes';
import Tooltip from './util/tooltip';
import { checkFilter, setDay } from './util/bus';

import './style.scss';

moment.tz.setDefault('UTC');

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Tooltip);

const router = new VueRouter({ routes });

// Global bus!
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
	get() {
		return this.$root.bus;
	},
});

//makes library or method available in any component
// '$' indicates to developer that this is a public api method
Object.defineProperty(Vue.prototype, '$moment', {
	get() {
		return this.$root.moment;
	},
});

new Vue({
	el: '#app',
	data: {
		genre: [],
		time: [],
		movies: [],
		moment,
		day: moment(),
		bus,
	},
	created() {
		this.$http.get('/api').then(response => {
			this.movies = response.data;
		});
		// JS bind keyword putting 'this' in the checkFilter function
		this.$bus.$on('check-filter', checkFilter.bind(this));
		this.$bus.$on('set-day', setDay.bind(this));
	},
	router,
});
