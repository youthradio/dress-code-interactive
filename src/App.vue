<template>
  <div>
    <div class="row-flex-column margin-all">
      <h2 class="title">Do you think the student should get dress coded?</h2>
      <MOutfits class="order" />
      <div v-if="!hasVoted">
        <div class="row-flex center">
          <button 
            class="button-style" 
            @click="vote(true)">Yes</button>
          <button 
            class="button-style" 
            @click="vote(false)">No</button>
        </div>
      </div>
      <transition 
        v-if="hasVoted" 
        name="fade">
        <MSchoolsResult
          v-if="hasVoted"
          ref="resultbox"
          :vote-option="voteOption"
          :active-outfit="activeOutfit"
        />
      </transition>
    </div>
  </div>
</template>

<script>
// import MainComponent from "./components/MainComponent.vue";
// import MSchoolsHeader from "./components/MSchoolsHeader.vue";
// import MHeader from "./components/MHeader.vue";
import MOutfits from "./components/MOutfits.vue";
import MSchoolsResult from "./components/MSchoolsResult.vue";
import ResizeObserver from "resize-observer-polyfill";
import ga from "./analytics.js";

export default {
  name: "App",
  components: {
    // MainComponent,
    // MSchoolsHeader,
    // MHeader,
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

    ga.send("pageview", {
      an: "Dress Code Interactive", // application name
      ec: "Interactive", // event category
      dt: "Dress Code Interactive",
      dp: "/dress-code-interactive"
    });
  },
  methods: {
    resetView({ index }) {
      this.hasVoted = false;
      this.activeOutfit = index;
    },
    vote(option) {
      this.voteOption = option;
      ga.send("event", {
        an: "Dress Code Interactive", // application name
        ec: "Interactive", // event category
        ev: Number(option + 1), // event value
        el: `${option ? "Yes" : "No"} - ${this.activeOutfit}`, // event label
        ea: "vote" // event action,
      });
      this.hasVoted = true;
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/custom";
@import "~@/styles/mixins";
.margin-all {
  margin: auto;
  max-width: 100%;
  @include breakpoint("small") {
    max-width: 70%;
  }
  @include breakpoint("large") {
    max-width: 50%;
  }
}
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
.title {
  text-align: center;
  margin: 30px 0px 30px 0px;
}

.fade-enter-active {
  transition: all 1.5s;
}
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter {
  transform: translateY(100%);
}
.fade-leave-to {
  transform: translateY(200%);
}
</style>
