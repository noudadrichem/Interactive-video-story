<template>
  <div>
    <div id="videoContainer">
      <video id="video" ref="video" controls :src="videoUrl"></video>
    </div>
    <br/>
    <a @click.prevent="toggleVideo(true)">START</a>
    <a @click.prevent="toggleVideo(false)">STOP</a>
    <a @click.prevent="showOverlay">SHOW</a>
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span ref="currentTime"></span>
    <pre>{{ $data }}</pre>
    <overlay/>
  </div>
</template>

<script>
  import cuePoints from '@/assets/data/cuePoints'
  import { eventBus } from '@/eventBus'
  import overlay from '@/components/overlay'

  export default {
    name: 'video',
    components: { overlay },
    data () {
      return {
        videoUrl: 'http://nooncreation.com/video/fysio-isl.webm',
        cuePoints,
        playing: false,
        videoLock: false
      }
    },

    methods: {
      toggleVideo (state) {
        const video = this.$refs.video
        this.$set(this, 'playing', state)
        state ? video.play() : video.pause()
      },

      showOverlay () {
        eventBus.$emit('showOverlay', true)
      },

      checkIfFrameEquals (frame) {
        this.cuePoints.map(item => {
          const getSec = (item.sec * 10)
          if (frame >= getSec && this.playing === false) {
            this.toggleVideo(false)
          }
        })
      },

      getCurrentVideoTime () {
        const video = this.$refs.video
        video.volume = 0.1
        setInterval(e => {
          if (!video.paused) {
            const frame = Math.floor(video.currentTime * 10)
            this.$refs.currentTime.innerHTML = frame
            this.checkIfFrameEquals(frame)
          }
        }, 1)
      }
    },

    mounted () {
      /*eslint-disable*/
      console.log(this.cuePoints)
      this.getCurrentVideoTime()
    }
  }
</script>

<style lang="stylus" scoped>
  #videoContainer
    width: 1270px
    height: 720px
    margin:auto
    // position: absolute
    // transform: scale(1.0) translate(-50%,-50%)
    // top:50%
    // left:50%
    // overflow:hidden !important
    #video
      height: 100%
      width: 100%
      overflow: hidden

  .zoom
    transform: scale(1.2) !important
    transition: 8000ms all !important

</style>
