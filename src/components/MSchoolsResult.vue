<template>
  <div>
    <template v-if="!isLoading">
      <div class="row-flex m-1">
        <section>
          <h2>
            <template v-if="voteOption"
              >You're right</template
            >
            <template v-else
              >You're wrong</template
            >
            according to:
          </h2>
          <ul>
            <li v-for="school in schoolsFail">
              <div class="school-result">
                <MSchool
                  class="school-logo-max"
                  :school-data="school.info"
                  :key="school.name"
                  @showSchoolInfo="showSchoolInfo"
                />
                <div class="school-info">
                  <h4>{{ school.name }}</h4>
                  <h5>{{ school.info.level }}</h5>
                  <h5>{{ school.info.type }}</h5>
                  <h5>{{ school.info.location }}</h5>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section>
          <h2>
            <template v-if="!voteOption"
              >You're right</template
            >
            <template v-else
              >You're wrong</template
            >
            according to:
          </h2>
          <ul>
            <li v-for="school in schoolsPass">
              <div class="school-result">
                <MSchool
                  class="school-logo-max"
                  :school-data="school.info"
                  :key="school.name"
                  @showSchoolInfo="showSchoolInfo"
                />
                <div>
                  <h4>{{ school.name }}</h4>
                  <h5>{{ school.info.level }}</h5>
                  <h5>{{ school.info.type }}</h5>
                  <h5>{{ school.info.location }}</h5>
                </div>
              </div>
            </li>
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

export default {
  name: "MSchoolsResult",
  components: {
    MSchool
  },
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
  mixins: [CommonUtils],
  data() {
    return {
      bshowSchoolInfo: false,
      selectedSchool: null,
      hasVoted: false
    };
  },
  mounted() {
    window.scrollTo({
      behavior: "smooth",
      top: this.$el.offsetTop - window.innerHeight / 2
    });
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
  methods: {
    showSchoolInfo(e) {
      if (e.state === "mouse-click") {
        console.log(e);

        //   this.bshowSchoolInfo = true;
        //   this.selectedSchool = e.selectedSchool;
        //   this.$refs.schoolInfoBox.scrollTo(0, 0);
        //   this.$refs.schoolInfoBox.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixins";

.school-result {
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: minmax(60px,1fr) 2fr;
  align-items: center;
}
.school-logo-max {
  max-width: 100px;
}
</style>
