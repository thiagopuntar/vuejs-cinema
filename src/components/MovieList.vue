<template>
    <div id="movie-list">
        <div v-for="movie in filteredMovies" :key="movie.title" class="movie">
            {{ movie.movie.Title }}
        </div>
    </div>
</template>

<script>
    import genres from '../util/genres.js'

    export default {
        data() {
            return {
                
            }
        },
        props: ['genre', 'time', 'movies'],
        methods: {
            moviePassGenreFilter(movie){
                if(!this.genre.length) {
                    return true;
                } else {
                    return this.genre.find(genre => movie.genre === genre);
                }
            }
        },
        computed: {
            filteredMovies(){
                return this.movies.filter(this.moviePassGenreFilter)
            }
        }    
    }
</script>

<style scoped>

</style>