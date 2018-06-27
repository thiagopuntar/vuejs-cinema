import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';

moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment} });

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus} });

import { checkFilter, setDay } from './util/bus.js';

import routes from './util/routes.js';
import VueRouter from 'vue-router';
const router = new VueRouter({ routes });
Vue.use(VueRouter);

new Vue({
    el: "#app",
    router,
    data() {
        return {
            genre: [],
            time: [],
            movies: [],
            moment,
            day: moment(),
            bus
        }
    },
    created(){
        this.$http.get('/api').then(response => this.movies = response.data);
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    }
})