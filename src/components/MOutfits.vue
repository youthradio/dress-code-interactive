<template>
  <div>
    <div class="box">
      <template v-if="!isLoading">

        <vue-glide
          ref="slider"
          :per-view="3"
          :bound="true"
          :drag-threshold="120"
          :animation-duration="200"
          :swipe-threshold="120"
          v-model="activeOutfit"
          focus-at="center"
          type="carousel"
          class="max-width"
        >
          <vue-glide-slide
            v-for="(review, ind) in reviewsData"
            :key="`slide-${-ind}`"
          >
            <div class="outfit-img">
              <img
                class="img-absolute"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAJYCAYAAADc9lwrAAAGRElEQVR4nO3SMQEAIAzAMMC/5yFjRxMFPXpnZg7EvO0A2GB8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CQZnyTjk2R8koxPkvFJMj5JxifJ+CR9UWIIrM76scAAAAAASUVORK5CYII=">
              <img
                :class="[activeOutfit === ind ? 'selected' : 'not-selected','img-fluid']"
                :src="require(`../assets/${review.outfit.outfit_photo_path}`)"
              >
            </div>
          </vue-glide-slide>
        </vue-glide>
      </template>
      <div
        class="left-arrow pointer"
        @click="prevTopic">
        <svg
          width="32"
          height="32"
          class="octicon octicon-triangle-left"
          viewBox="0 0 6 16"
          version="1.1"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M6 2L0 8l6 6V2z" />
        </svg>
      </div>
      <div
        class="right-arrow pointer"
        @click="nextTopic">
        <svg
          width="32"
          height="32"
          class="octicon octicon-triangle-right"
          viewBox="0 0 6 16"
          version="1.1"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M0 14l6-6-6-6v12z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import CommonUtils from "../mixins/CommonUtils";
import { Glide, GlideSlide } from "vue-glide-js";
import "vue-glide-js/dist/vue-glide.css";

export default {
  name: "MOutfits",
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  mixins: [CommonUtils],
  props: {
    schoolData: {
      type: Object,
      default: null,
      require: true
    }
  },
  data() {
    return {
      glide: undefined,
      activeOutfit: 1,
    };
  },
  watch:{
    activeOutfit(){
      this.$root.$emit('activeOutfit', {
        index: this.activeOutfit
      })
    }
  },
  mounted() {},
  methods: {
    nextTopic() {
      this.$refs.slider.go(">");
    },
    prevTopic() {
      this.$refs.slider.go("<");
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixins";

.box {
  // position: relative;
}
.left-arrow {
  display: flex;
  align-items: center;
  position: absolute;
  padding-left: 2%;
  padding-right: 20%;
  top: 0;
  left: 0;
  height: 100%;
}
.right-arrow {
  display: flex;
  align-items: center;
  position: absolute;
  padding-left: 20%;
  padding-right: 2%;
  top: 0;
  right: 0;
  height: 100%;
}
.not-selected {
  transform: scale(0.9, 0.9);
  opacity: 0.6;
}
.slide {
  text-align: center;
}
.outfit-img {
  display: flex;
  position: relative;
  padding: 10px;
}
.img-absolute{
  visibility: hidden;
  margin: 0 auto;
  height: 100%;
  width: auto;
  max-height: 300px;
  @include breakpoint("small") {
    max-height: 400px;
  }
}
.img-fluid {
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.5));
  // display: inline;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 100%;
  width: auto;
  max-height: 300px;
  @include breakpoint("small") {
    max-height: 400px;
  }

}
.max-width{ 
  max-width: 100vw;
}

</style>
