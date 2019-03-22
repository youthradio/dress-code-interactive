<template>
  <div>
    <MHeader />
    <div class="row-flex-column ">
      <MSchoolsHeader class="schools-header" />
      <MOutfits class="order" />
      <MSchoolsResult v-if="hasVoted" />
      <div class="row-flex-column" v-else>
        <div class="message">
          <h2>Do you think the student will get dress coded?</h2>
        </div>
        <div class="row-flex center">
          <button @click="vote('YES')" class="button-style">Yes</button>
          <button @click="vote('NO')" class="button-style">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainComponent from "./components/MainComponent.vue";
import MSchoolsHeader from "./components/MSchoolsHeader.vue";
import MHeader from "./components/MHeader.vue";
import MOutfits from "./components/MOutfits.vue";
import MSchoolsResult from "./components/MSchoolsResult.vue";
import ResizeObserver from "resize-observer-polyfill";

export default {
  name: "App",
  components: {
    MainComponent,
    MSchoolsHeader,
    MHeader,
    MOutfits,
    MSchoolsResult
  },
  data() {
    return {
      hasVoted: false
    };
  },
  computed: {},
  created() {
    // load data
    this.$store.dispatch("fetchData");
  },
  mounted() {
    const elementRoot = this.$el;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        const elementHeight = "elementHeight:" + height;
        // console.log(elementHeight);
        parent.postMessage(elementHeight, "*");
      }
    });
    resizeObserver.observe(elementRoot);
  },
  methods: {
    vote(option) {
      this.hasVoted = true;
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/custom";
@import "~@/styles/mixins";

.grid-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-flow: dense;
}

.center {
  justify-content: center;
}
.schools-header {
  // margin: auto;
  @include breakpoint("small") {
    max-width: 100%;
  }
  @include breakpoint("large") {
    max-width: 50%;
  }
}
.margin {
  width: 100%;
  @include breakpoint("small") {
    max-width: 70%;
  }
  @include breakpoint("large") {
    max-width: 50%;
  }
}
.button-style {
  text-transform: uppercase;
  background-color: $white;
  border: 3px solid $dark;
  border-radius: 10px;
  padding: 0.5rem 0.5rem;
  font-size: 1.5rem !important;
  font-family: "Assistant", sans-serif;
  font-weight: 600;
  box-shadow: 0.3rem 0.3rem $sky-blue;
  margin: 0.6rem;
}

.button-style:hover {
  color: #fff;
  background-color: $sky-blue;
  box-shadow: 4px 4px $dark;
}
.button-style:active {
  color: #fff;
  background-color: $sky-blue;
  box-shadow: 2px 2px $dark;
}
</style>
