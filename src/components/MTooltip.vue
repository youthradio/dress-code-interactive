<template>
  <div class="tooltip">
    <template v-if="!isLoading">
      <section>
        <header>
          <span
            @click.prevent="$emit('closeTooltip')"
            class="icon-arrow-left arrow arrow-size" />

          <h2>
            <a
              target="_blank"
              :href="tooltipData.info.dress_code_url"
              :title="`Dress code URL: ${tooltipData.info.dress_code_url} `"
            >
              Dress Code
            </a>
          </h2>
          <h3>
            <a
              target="_blank"
              :href="tooltipData.info.schools_url"
              :title="`Scholl website: ${tooltipData.info.schools_url}`"
            >
              {{ tooltipData.info.school_name }}
            </a>
          </h3>
        </header>
        <div
          class="cursor"
          @click.prevent="$emit('closeTooltip')"
          v-html="getHTMLHighlights"
        />
      </section>
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import CommonUtils from "../mixins/CommonUtils";
import matchAll from "string.prototype.matchall";

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
      const result = this.tooltipData.result; // clean strings to match on regex
      if (result === "pass") {
        return html;
      }
      const tags = Array.from(matchAll(result, /{([^}]+)\}/g)); // match all contetnt between {}
      const regex = tags.map(e => e[1]).join("|");
      const regexEscaped = regex.replace(/[-\/\\^$*+?.()[\]{}]/g, "\\$&"); //scape all caracters
      const rg = new RegExp(regexEscaped, "gi");
      return html.replace(rg, '<span class="highlight">$&</span>'); // find and replace with higlights
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
@import "~@/styles/mixins";

a {
  cursor: pointer;
  color: $sky-blue;
  text-decoration: underline;
}
a:hover {
  color: $dark;
  text-decoration: underline;
}
h2,
h3 {
  text-align: center;
  margin-bottom: 10px;
}
.arrow-size {
  font-size: 2rem;
  position: sticky;
  top: 0px;
  cursor:pointer;
}
.icon-arrow-left::before {
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
}
.cursor {
  cursor: pointer;
}
.tooltip {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 100%;
  margin: auto;
  @include breakpoint("small") {
    max-width: 70%;
  }
  @include breakpoint("large") {
    max-width: 50%;
  }

  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
  font-size: 1rem;
  // background-color: rgba(0, 0, 0, 0.5);
}
section {
  box-shadow: 0px 5px 10px 10px rgba(100, 100, 100, 0.5);
  border-radius: 5px;
  // border: 1px solid black;
  // margin: 30px;
  overflow-y: scroll;
  padding: 20px;
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
    margin-bottom: 5px;
  }
  /deep/ .highlight {
    font-weight: bolder;
    background-color: rgba(255, 255, 0, 0.8);
  }
}
</style>
