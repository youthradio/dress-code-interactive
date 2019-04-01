<template>
  <div>
    <MHeader />
    <div class="row-flex-column">
      <MSchoolsHeader class="schools-header" />
      <MOutfits class="order" />
      <MSchoolsResult
        v-if="hasVoted"
        ref="resultbox"
        :vote-option="voteOption"
        :active-outfit="activeOutfit"
      />
      <transition 
        name="fade" 
        enter-class="disable-scroll" 
        leave-class="disable-scroll">
        <div v-if="!hasVoted">
          <h2>Do you think the student should get dress coded?</h2>
          <div class="row-flex center">
            <button 
              class="button-style" 
              @click="vote(true)">Yes</button>
            <button 
              class="button-style" 
              @click="vote(false)">No</button>
          </div>
        </div>
      </transition>
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
      hasVoted: false,
      voteOption: null,
      activeOutfit: 1
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
    //clean has voted state with outfitchange
    this.$root.$on("activeOutfit", this.resetView);
  },
  methods: {
    resetView({ index }) {
      this.hasVoted = false;
      this.activeOutfit = index;
    },
    vote(option) {
      this.voteOption = option;
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
  margin: auto;
  max-width: 100%;
  @include breakpoint("small") {
    max-width: 60%;
  }
  @include breakpoint("large") {
    max-width: 50%;
  }
}
.margin {
  width: 100%;
  // max-width: 70%;
  // @include breakpoint("small") {
  //   max-width: 60%;
  // }
  // @include breakpoint("large") {
  //   max-width: 50%;
  // }
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
h2 {
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
}
</style>
