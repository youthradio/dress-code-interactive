<template>
  <div 
    class="tooltip" 
    @click.prevent="$emit('closeTooltip')">
    <template v-if="!isLoading">
      <section v-html="tooltipData.info.dress_code_html"/>
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import CommonUtils from "../mixins/CommonUtils";

export default {
  name: "MTooltip",
  mixins: [CommonUtils],
  props: {
    tooltipData: {
      type: Object,
      default: null,
      require: true
    }
  },
  data() {
    return {};
  },
  mounted() {
    document.querySelector("body").style.cssText =
      "overflow: hidden;";
  },
  destroyed() {
    document.querySelector("body").style.cssText = "";
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/styles/variables";

.tooltip {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
}
section {
  overflow-y: scroll;
  padding: 30px;
  font-weight: 600;
  max-height: 100%;
  background-color: white;
  /deep/ ul {
    list-style: circle;
  }

}

</style>
