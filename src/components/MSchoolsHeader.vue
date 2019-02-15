<template>
  <div class="flex-row">
    <div class="flex-no-wrap">
      <MSchool
        v-for="school in schoolsData.slice(0, 4)"
        :school-data="school"
        :key="school.schools"
        class="logo"
        @showSchoolInfo="showSchoolInfo"
      />
    </div>
    <div
      ref="schoolInfoBox"
      :class="['middle', bshowSchoolInfo ? 'info-box' : '']"
    >
      <div 
        v-if="!bshowSchoolInfo" 
        class="welcome-message">
        <h3>
          We reviewed dress codes from 8 schools across the United States.
        </h3>
      </div>
      <div 
        v-else 
        class="school-dress-code">
        <h3>{{ selectedSchool.schools }}</h3>
        <p>
          {{ selectedSchool.dress_code_text }}
        </p>
      </div>
    </div>
    <div class="flex-no-wrap">
      <MSchool
        v-for="school in schoolsData.slice(4)"
        :school-data="school"
        :key="school.schools"
        class="logo"
        @showSchoolInfo="showSchoolInfo"
      />
    </div>
  </div>
</template>

<script>
import CommonUtils from "../mixins/CommonUtils";
import MSchool from "./MSchool.vue";

export default {
  name: "MSchoolsHeader",
  components: {
    MSchool
  },
  mixins: [CommonUtils],
  data() {
    return {
      bshowSchoolInfo: false,
      selectedSchool: null
    };
  },
  methods: {
    showSchoolInfo(e) {
      if (e.state === "mouse-click") {
        this.bshowSchoolInfo = true;
        this.selectedSchool = e.selectedSchool;
        this.$refs.schoolInfoBox.scrollTo(0, 0);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixins";

.flex-no-wrap {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 100%;
}
.logo {
  margin: 1%;
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
