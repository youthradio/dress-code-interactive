<template>
  <div>
    <MHeader />
    <div class="row-column ">
      <MSchoolsHeader style="width:50%;"/>
      <div class="grid-row">
        <MOutfits class="order"/>
        <MSchoolsResult />
      </div>
    </div>
  </div>
</template>

<script>
import MainComponent from './components/MainComponent.vue'
import MSchoolsHeader from './components/MSchoolsHeader.vue'
import MHeader from './components/MHeader.vue'
import MOutfits from './components/MOutfits.vue'
import MSchoolsResult from './components/MSchoolsResult.vue'

import ResizeObserver from 'resize-observer-polyfill';

export default {
  name: 'App',
  components: {
    MainComponent,
    MSchoolsHeader,
    MHeader,
    MOutfits,
    MSchoolsResult
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

.grid-row {
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(400px, 1fr) );
  grid-auto-flow: dense;
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
