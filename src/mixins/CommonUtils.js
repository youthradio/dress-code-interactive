export default {
  data(){
    return {
      _mixingDebouceTimer: null,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    debouceEvent(event, callback) {
      if(this._mixingDebouceTimer){
        window.cancelAnimationFrame(this._mixingDebouceTimer);
      }
      this._mixingDebouceTimer = window.requestAnimationFrame(() => callback(event));
    },
    tweetMessage (message) {
      const url = 'https://yr.media'
      const tweet = `${message}: ${url}`
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
      window.open(tweetUrl, 'pop', 'width=600, height=400, scrollbars=no')
    },
    facebookThis (title) {
      const url = 'https://yr.media'
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${encodeURIComponent(title)}`
      window.open(facebookUrl, '_blank')
    }
  },
}
