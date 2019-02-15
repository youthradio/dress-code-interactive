<template>
  <div>
    <MHeader />
    <div class="row-column">
      <div class="flex-row">
        <MSchoolsHeader class="margin"/>
      </div>
    </div>
  </div>
</template>

<script>
import MainComponent from './components/MainComponent.vue'
import MSchoolsHeader from './components/MSchoolsHeader.vue'
import MHeader from './components/MHeader.vue'

import ResizeObserver from 'resize-observer-polyfill';

export default {
  name: 'App',
  components: {
    MainComponent,
    MSchoolsHeader,
    MHeader
  },
  data() {
    return {}
  },
  computed: {

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
@import "~@/styles/custom";
@import '~@/styles/mixins';

.flex-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.margin {
  width: 100%;
  @include breakpoint("small"){
    max-width: 70%;
  }
  @include breakpoint("large"){
    max-width: 50%;
  }
}
</style>
