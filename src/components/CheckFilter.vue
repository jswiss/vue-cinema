<template>
  <div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
    <span class="checkbox"></span>
    <span class="check-filter-title">{{ title }}</span>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      checked: false,
    };
  },
  props: ['title', 'category'],
  methods: {
    checkFilter() {
      this.checked = !this.checked;
      // you can have any number of arguments with $emit, but the first has to be the name of the custom event
      this.$bus.$emit('check-filter', this.category, this.title, this.checked);
    },
  },
}
</script>