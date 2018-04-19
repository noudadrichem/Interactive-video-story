<template>
  <div id="mainContainer">

    <div class="points">
      <h1>{{ points }}</h1>
    </div>

    <div id="videoContainer">
      <video id="video" ref="video" controls :src="videoUrl"></video>
    </div>

    <div id="videobalk" ref="videobalk"></div>

    <overlay :data="currentCuePoint"/>

  </div>
</template>

<script>
  /*eslint-disable*/
  import cuePoints from '@/assets/data/cuePoints'
  import { eventBus } from '@/eventBus'
  import overlay from '@/components/overlay'

  export default {
    name: 'video',
    components: { overlay },
    data () {
      return {
        // videoUrl: 'http://nooncreation.com/video/fysio-isl.webm',
        videoUrl: 'http://nooncreation.com/video/raet-video-main.webm',
        playing: false,
        videoLock: false,
        currentTime: null,
        currentCuePoint: {},
        cuePoints,
        points: 10
      }
    },

    methods: {
      toggleVideo (state) {
        const video = this.$refs.video
        this.$set(this, 'playing', state)
        state ? video.play() : video.pause()
      },

      resetAll () { eventBus.$emit('reset') },

      showOverlay () { eventBus.$emit('showOverlay', true) },

      checkIfFrameEquals (currentTime, video) {
        this.cuePoints.map(item => {
          if (Math.floor(currentTime) === item.sec && this.videoLock === false) {
            this.$set(this, 'videoLock', true)
            eventBus.$emit('pause')
            this.$set(this, 'currentCuePoint', item)
            this.showOverlay()
          }
        })
      },

      getCurrentVideoTime () {
        const video = this.$refs.video
        video.volume = 0
        video.play()
        video.ontimeupdate = e => {
          this.$set(this, 'playing', true)
          this.$set(this, 'currentTime', Math.floor(e.target.currentTime))
          this.checkIfFrameEquals(e.target.currentTime, video)
        }
      },
    },

    mounted () {
      this.getCurrentVideoTime()
    },

    created () {
      eventBus.$on('play', play => { this.toggleVideo(true) })
      eventBus.$on('pause', pause => { this.toggleVideo(false) })
      eventBus.$on('editPoints', status => {
        if (status === '+') {
          this.points++
        } else if (status === '-') {
          this.points--
        }
      })
      eventBus.$on('lock', lock => {
        this.$set(this, 'videoLock', true)
        setTimeout(e => {
          this.$set(this, 'videoLock', false)
        }, 1000, false)
      })
    }
  }
</script>
