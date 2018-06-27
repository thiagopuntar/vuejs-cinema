<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies" :key="movie.title" 
            :movie="movie.movie" >
                <div class="movie-sessions">
                    <div v-for="session in filteredSessions(movie.sessions)" class="session-time-wrapper" :key="session">
                        <div class="session-time">{{ formatSessionTime(session.time) }}</div>
                    </div>
                </div>
            </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            {{ noResults }}
        </div>
        <div v-else class="no-results">
            Loading...
        </div>
    </div>
</template>

<script>
    import genres from '../util/genres.js';
    import times from '../util/times.js';
    import MovieItem from './MovieItem.vue';

    export default {

        components: {
            MovieItem
        },
        props: ['genre', 'time', 'movies', 'day'],
        methods: {
            formatSessionTime(raw){
                return this.$moment(raw).format('h:mm A');
            },
            filteredSessions(sessions) {
                return sessions.filter(this.sessionPassesTimeFilter)
            },
            moviePassGenreFilter(movie){
                if(!this.genre.length) {
                    return true;
                } else {
                    let movieGenres = movie.movie.Genre.split(", ");
                    let matched = true;
                    this.genre.forEach(genre => {
                        if(movieGenres.indexOf(genre) === -1) {
                            matched = false;
                        }
                    })
                    return matched;
                }
            },
            sessionPassesTimeFilter(session) {
                
                if(!this.$moment(session.time).isSame(this.day, 'day')) {
                    return false;
                } else if (this.time.length === 0 || this.time.length === 2) {
                    return true;
                } else if (this.time[0] === times.BEFORE_6PM) {
                    return this.$moment(session.time).hour() < 18;
                } else {
                    return this.$moment(session.time).hour() >= 18;
                }
            }
        },
        computed: {
            filteredMovies(){
                return this.movies
                    .filter(this.moviePassGenreFilter)
                    .filter(movie => movie.sessions.some(this.sessionPassesTimeFilter))
            },
            noResults(){
                let textTime = this.time.join(', ');
                let textGenre = this.genre.join(', ');

                return `No results for ${textGenre}${textTime ? `, ${textTime}.`: '.'}`;
            }
        }
    }
</script>

<style scoped>

</style>