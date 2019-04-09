<template>
  <div
    class="tooltip"
    @click.prevent="$emit('closeTooltip')">
    <template v-if="!isLoading">
      <section>
        <h2>Dress Code</h2>
        <div v-html="getHTMLHighlights" />
      </section>
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import CommonUtils from "../mixins/CommonUtils";
import matchAll from 'string.prototype.matchall';

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
  computed: {
    getHTMLHighlights() {
      const html = this.tooltipData.info.dress_code_html;
      const result = this.tooltipData.result // clean strings to match on regex
      if(result === "pass"){
        return html;
      }
      const tags = Array.from(matchAll(result, /{([^}]+)\}/g)); // match all contetnt between {}
      const regex = tags.map(e => e[1]).join("|");
      const regexEscaped =  regex.replace(/[-\/\\^$*+?.()[\]{}]/g, '\\$&'); //scape all caracters
      const rg = new RegExp(regexEscaped,"gi");
      return html.replace(rg, "<span class=\"highlight\">$&</span>"); // find and replace with higlights
    }
  },
  mounted() {
    document.querySelector("body").style.cssText = "overflow: hidden;";
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
    display: block;
    list-style-type: disc;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }
  /deep/ li {
    display: list-item;
  }
  /deep/ .highlight {
    font-weight: bolder;
    background-color: rgba(255,255,0,0.8);
  }
}
</style>
