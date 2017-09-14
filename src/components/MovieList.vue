<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item class="movie" v-for="movie in filteredMovies" v-bind:movie="movie.movie" v-bind:sessions="movie.sessions" v-bind:day="day" v-bind:time="time"></movie-item>
    </div>
    <div v-else-if="movies.length">
      {{ noResults }}
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import genres from '../util/genres';
import times from '../util/times';
import MovieItem from './MovieItem.vue';

export default {
  props: ['genre', 'time', 'movies', 'day'],
  methods: {
    moviePassesGenreFilter(movie) {
      if (!this.genre.length) {
        return true;
      } else {
        let movieGenres = movie.movie.Genre.split(", ");
        let matched = true;
        this.genre.forEach(genre => {
          if (movieGenres.indexOf(genre) === -1) {
            matched = false;
          }
        });
        return matched;
      }
    },
    sessionPassesTimeFilter(session) {
      if (!this.day.isSame(this.$moment(session.time), 'day')) {
        return false;
      } else if (this.time.length === 0 || this.time.length === 2) {
        return true;
      } else if (this.time[0] === times.AFTER_6PM) {
        return this.$moment(session.time).hour() >= 18;
      } else {
        return this.$moment(session.time).hour() < 18
      }
    },
  },
  computed: {
    filteredMovies() {
      // array filter method requires a callback, where you pass the filter function
      return this.movies
        .filter(this.moviePassesGenreFilter)
        // .find returns undefined if nothing is found, or a truthy value
        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
    },
    noResults() {
      let times = this.time.join(', ');
      let genres = this.genre.join(', ')
      return `No results for ${genres}${times.length && genres.length ? ': ' : ''} ${times}`;
    }
  },
  components: {
    MovieItem,
  },
};
</script>
