<template>
  <div>
    <template v-if="!isLoading">
      <div 
        v-for="school in schoolsData" 
        class="list">
        <div class="school-logo">
          <MSchool
            :school-data="school"
            :key="school.schools"
            @showSchoolInfo="showSchoolInfo"
          />
        </div>
        <div>
          <h4>{{ school.schools }}</h4>
        </div>
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
  mixins: [CommonUtils],
  data() {
    return {
      bshowSchoolInfo: false,
      selectedSchool: null,
      hasVoted: false
    };
  },
  methods: {
    showSchoolInfo(e) {
      if (e.state === "mouse-click") {
        this.bshowSchoolInfo = true;
        this.selectedSchool = e.selectedSchool;
        this.$refs.schoolInfoBox.scrollTo(0, 0);
        this.$refs.schoolInfoBox.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixins";

.list {
  display: flex;
}

.school-logo{
  padding: 10px;
  max-width: 80px;
}

.middle {
  display: flex;
  justify-content: center;
  margin: 20px;
  overflow-y: scroll;
  padding: 20px;
  max-height: 30vh;
  height: auto;
}

.welcome-message {
  text-align: center;
  max-width: 100%;
  align-self: center;
  @include breakpoint("small") {
    max-width: 50%;
  }
}
.info-box {
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  // margin: 5%;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
</style>
