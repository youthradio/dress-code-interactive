<template>
  <div>
    <template v-if="!isLoading">
      <section>
        <h4>
          We reviewed dress codes from 8 schools across the United States.
        </h4>
        <div class="grid-wrap">
          <MSchool
            v-for="school in schoolsData"
            :school-data="school"
            :key="school.schools"
          />
        </div>
      </section>
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
  name: "MSchoolsHeader",
  components: {
    MSchool
  },
  mixins: [CommonUtils],
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixins";

h4 {
  text-align: center;
  margin-bottom: 2rem;
}
.grid-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
