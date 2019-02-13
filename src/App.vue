<template>
  <div>
    <MHeader />
    <div class="row-column">
      <div class="flex-row">
        <MSchool
          v-for="school in schoolsData"
          :school-data="school"
          :key="school.schools"
          class="pp"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MainComponent from './components/MainComponent.vue'
import MSchool from './components/MSchool.vue'
import MHeader from './components/MHeader.vue'

import ResizeObserver from 'resize-observer-polyfill';

export default {
  name: 'App',
  components: {
    MainComponent,
    MSchool,
    MHeader
  },
  data() {
    return {}
  },
  computed: {
    schoolsData() {
      return this.$store.state.schoolsData;
    },
  },
  created() {
    // load data
    this.$store.dispatch('fetchData');
  },
  mounted() {
    const elementRoot = this.$el;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const {
          height
        } = entry.contentRect;
        const elementHeight = 'elementHeight:' + height;
        // console.log(elementHeight);
        parent.postMessage(elementHeight, '*');
      }
    });
    resizeObserver.observe(elementRoot);
  },
  methods: {

  },
}
</script>

<style lang="scss">
@import "./styles/custom";

.flex-row {
  display: flex;
  flex-wrap: wrap;
}
.pp {
  margin: 50px;
}
</style>
