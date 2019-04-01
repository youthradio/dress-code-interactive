<template>
  <div>
    <template v-if="!isLoading">
        {{schoolData}}
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'

export default {
  name: 'MTooltip',
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/styles/variables';

</style>
