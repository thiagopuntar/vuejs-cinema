<template>
    <div id="movie-filter">
        <h2>Filter results</h2>
        <h3>By time of day</h3>
        <div class="filter-group">
            <div v-for="time in times" :key="time">
                <check-filter :title="time" category="time" @check-filter="checkFilter"></check-filter>
            </div>
        </div>
        <h3>By genre</h3>
        <div class="filter-group">
            <div v-for="genre in genres" :key="genre">
                <check-filter :title="genre" category="genre" @check-filter="checkFilter"></check-filter>
            </div>
        </div>
    </div>
</template>

<script>
    import CheckFilter from './CheckFilter.vue';
    import times from '../util/times.js';
    import genres from '../util/genres.js';

    export default {
        data() {
            return {
                times,
                genres
            }
        },
        components: {
            CheckFilter
        },
        methods: {
            checkFilter(category, title, checked){
                this.$emit('check-filter', category, title, checked);
            }
        }
    }
</script>

<style scoped>

</style>