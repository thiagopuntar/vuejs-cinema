import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';

import MovieFilter from './components/MovieFilter.vue';
import MovieList from './components/MovieList.vue';

Vue.use(VueResource);

import moment from 'moment-timezone';

moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment} });

new Vue({
    el: "#app",
    components: {
        MovieList,
        MovieFilter
    },
    data() {
        return {
            genre: [],
            time: [],
            movies: [],
            moment,
            day: moment()
        }
    },
    methods: {
        checkFilter(category, title, checked){
            if(checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if(index > -1) {
                    this[category].splice(index, 1);
                }
            }
        }
    },
    created(){
        this.$http.get('/api').then(response => this.movies = response.data);
    }
})