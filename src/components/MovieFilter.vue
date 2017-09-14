<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
      <!-- <check-filter v-bind:title="time" category="time" v-for="time in times"v-on:check-filter="checkFilter"> -->
      <check-filter v-bind:title="time" category="time" v-for="time in times">
      </check-filter>
    </div>
    <h3>By genre</h3>
    <div class="filter-group">
      <!-- <check-filter v-bind:title="genre" category="genre" v-for="genre in genres"v-on:check-filter="checkFilter"> -->
      <check-filter v-bind:title="genre" category="genre" v-for="genre in genres">
      </check-filter>
    </div>
  </div>
</template>

<script>
import genres from '../util/genres';
import times from '../util/times';
import CheckFilter from './CheckFilter.vue';

export default {
  data: function() {
    return {
      genres,
      times
    };
  },
  // Unnecessary because global bus!
  // methods: {
  //   checkFilter(category, title, checked) {
  //     this.$emit('check-filter', category, title, checked);
  //   },
  // },
  components: {
    CheckFilter,
  },
};
</script>
