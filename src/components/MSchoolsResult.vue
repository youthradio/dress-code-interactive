<template>
  <div>
    <template v-if="!isLoading">
      <div class="container m-1">
        <header>
          <h2>
            <template v-if="voteOption">
              You're <span class="right">right</span>
            </template>
            <template v-else>
              You're <span class="wrong">wrong</span>
            </template>
            according to:
          </h2>
        </header>
        <section :class="[voteOption?'right':'wrong']">
          <MTooltip
            v-if="bShowTooltip"
            :tooltip-data="tooltipData"
            @closeTooltip="closeTooltip"
          />
          <ul>
            <li
              v-for="school in schoolsFail"
              :key="school.name"
              @click="showTooltip(school)"
            >
              <div class="school-result">
                <MSchool
                  :school-data="school.info"
                  class="school-logo-max"
                />
                <div class="school-info">
                  <h4>{{ school.name }}</h4>
                  <h5>{{ school.info.level }}</h5>
                  <h5>{{ school.info.type }}</h5>
                  <h5>{{ school.info.location }}</h5>
                  <h5><a>see dress code</a></h5>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <header>
          <h2>
            <template v-if="!voteOption">
              You're <span class="right">right</span>
            </template>
            <template v-else>
              You're <span class="wrong">wrong</span>
            </template>
            according to:
          </h2>
        </header>
        <section :class="[voteOption?'wrong':'right']">
          <ul>
            <template v-if="schoolsPass.length">
              <li
                v-for="school in schoolsPass"
                :key="school.name"
                @click="showTooltip(school)">
                <div class="school-result">
                  <MSchool
                    :school-data="school.info"
                    class="school-logo-max"
                  />
                  <div>
                    <h4>{{ school.name }}</h4>
                    <h5>{{ school.info.level }}</h5>
                    <h5>{{ school.info.type }}</h5>
                    <h5>{{ school.info.location }}</h5>
                    <h5><a>see dress code</a></h5>
                  </div>
                </div>
              </li>
            </template>
            <template v-else>
              <li>
                <div class="school-result">
                  <h2> None </h2>
                </div>
              </li>
            </template>
          </ul>
        </section>
      </div>
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import CommonUtils from "../mixins/CommonUtils";
import MSchool from "./MSchool.vue";
import MTooltip from "./MTooltip.vue";

export default {
  name: "MSchoolsResult",
  components: {
    MSchool,
    MTooltip
  },
  mixins: [CommonUtils],
  props: {
    activeOutfit: {
      type: Number,
      default: null,
      require: true
    },
    voteOption: {
      type: Boolean,
      default: null,
      require: true
    }
  },
  data() {
    return {
      bShowTooltip: false,
      selectedData: null
    };
  },
  computed: {
    getSchoolsData() {
      return this.reviewsData[this.activeOutfit].schools;
    },
    schoolsPass() {
      return Object.entries(this.getSchoolsData)
        .filter(e => e[1] === "pass")
        .map(e => ({
          name: e[0],
          result: e[1],
          info: this.schoolsData.filter(s => s.school_name === e[0])[0]
        }));
    },
    schoolsFail() {
      return Object.entries(this.getSchoolsData)
        .filter(e => e[1] !== "pass")
        .map(e => ({
          name: e[0],
          result: e[1],
          info: this.schoolsData.filter(s => s.school_name === e[0])[0]
        }));
    }
  },
  mounted() {
    window.scrollTo({
      behavior: "smooth",
      top: this.$el.offsetTop - window.innerHeight / 3
    });
  },
  methods: {
    closeTooltip(){
      this.bShowTooltip = false;
    },
    showTooltip(s) {
      this.bShowTooltip = true;
      this.tooltipData = s;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixins";

span {
  vertical-align: baseline;
  border-radius: 10px;
  padding: 2px
}
.school-result {
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: minmax(60px,1fr) 3fr;
  align-items: center;
}
.school-logo-max {
  max-width: 90px;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
section {
  grid-row: 2;
  border-radius: 10px;
  margin: 20px 5px 10px 5px;
}
header {
  grid-row: 1;
}
a {
  cursor: pointer;
  color: $sky-blue;
  text-decoration: underline;
}
.right {
  background-color: lighten($green, 45%);
}
.wrong {
  background-color: lighten($red, 25%);
}
</style>
