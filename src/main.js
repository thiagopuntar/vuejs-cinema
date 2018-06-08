import Vue from 'vue';
import './style.scss';
import MovieFilter from './components/MovieFilter.vue';


new Vue({
    el: "#main",
    components: {
        MovieFilter
    },
    template: `<movie-filter></movie-filter>`   
})