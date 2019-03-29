<template>
  <div>
    <template v-if="!isLoading">
      <div class="relative">
        <div
          class="school-logo"
          @click="(e) => sendEvent(e, 'mouse-click')">
          <img
            :src="require(`../assets/${schoolData.logo}`)"
            :alt="schoolData.school_name">
        </div>
      </div>
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'

export default {
  name: 'MSchool',
  mixins: [
    CommonUtils,
  ],
  props: {
    schoolData: {
      type: Object,
      default: null,
      require: true,
    }
  },
  data() {
    return {}
  },
  methods: {
    sendEvent(event, state) {
      this.$emit('showSchoolInfo', {
        event: event,
        state: state,
        selectedSchool: this.schoolData
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/styles/variables';

.school-logo {
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 3px 2px 2px rgba(0, 0, 0, 0.2);
    // padding: 10px;
    // border: 1px black solid;
    &:hover {
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }
    img {
        display: inline;
        margin: auto;
        height: auto;
        width: 100%;
        max-height: auto;
    }
}
.relative {
    position: relative;
    margin: 5px;
    padding: 5px;
}
.tooltip {
    position: absolute;
    border: 1px solid black;
    background-color: white;
    margin: 0 20px;
    z-index: 10;
    width: 100%;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
}
.text-tooltip {
    font-size: 1.0rem;
    padding: 0.3rem;
}
</style>
