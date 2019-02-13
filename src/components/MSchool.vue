<template>
  <div class="row">
    <template v-if="!isLoading">
      <div
        class="relative"
        @mouseenter="(e) => showToolTip(e, true)"
        @mouseleave="(e) => showToolTip(e, false)"
        @mousemove="moveToolTip">
        <div class="school-logo">
          <img
            :src="require(`../assets/${schoolData.logo}`)"
            alt="Avatar">
        </div>
        <div
          v-if="bshowToolTip"
          :style="tooltipPosition"
          class="tooltip" />
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
    return {
      bshowToolTip: false,
      tooltipPosition: {
        left: '0px',
        top: '0px',
      }
    }
  },
  methods: {
    showToolTip(event, state){
      this.bshowToolTip = state;
      this.tooltipPosition.left = `${event.layerX}px`;
      this.tooltipPosition.top = `${event.layerY}px`;
    },
    moveToolTip(event){
      if(this.bshowToolTip){
        this.tooltipPosition.left = `${event.layerX}px`;
        this.tooltipPosition.top = `${event.layerY}px`;
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/styles/variables';

.school-logo{
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 2px 2px 5px;
  padding: 10px;
  // border: 1px black solid;
  img {
   display: inline;
     margin: 0 auto;
     height: 100%;
     width: auto;
   }
}
.relative {
  position: relative;
  margin: auto;
}
.tooltip {
  position: absolute;
  border: 1px solid black;
  background-color: red;
  margin: 20px;
  z-index: 10;
  height: 20vw;
  width: 20vw;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
  transform:translateX(-10vw);
}


</style>
