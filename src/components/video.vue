<template>
  <div>
    <div id="videoContainer">
      <video id="video" ref="video" controls :src="videoUrl"></video>
    </div>
    <!-- <br/>
    <a @click.prevent="playVideo(true)">START</a>
    <a @click.prevent="playVideo(false)">STOP</a>
    <a @click.prevent="showOverlay">SHOW</a> -->
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span>{{ currentTime }}</span>
    <pre>{{ $data }}</pre>
    <overlay :data="currentCuePoint"/>
  </div>
</template>

<script>
  /*eslint-disable*/
  import cuePoints from '@/assets/data/cuePoints'
  import { eventBus } from '@/eventBus'
  import overlay from '@/components/overlay'

  /**FLOW**:
    GET currentTime of video in seconds,
    check if currentSec equals given second,
      if true
        show overlay
          on click overlay video lock = false after 1 sec,
        videolock = true
      else
        continue playing
        videolock = false
  */

  export default {
    name: 'video',
    components: { overlay },
    data () {
      return {
        videoUrl: 'http://nooncreation.com/video/fysio-isl.webm',
        playing: false,
        videoLock: false,
        currentTime: null,
        currentCuePoint: {},
        cuePoints
      }
    },

    methods: {
      toggleVideo (state) {
        console.log('TOGGLE')
        const video = this.$refs.video
        this.$set(this, 'playing', state)
        state ? video.play() : video.pause()
      },

      showOverlay () {
        eventBus.$emit('showOverlay', true)
        this.$set(this, 'videoLock', true)
      },

      checkIfFrameEquals (currentTime, video) {
        this.cuePoints.map(item => {
          // console.log(item.sec + 0.5)
          if (currentTime >= item.sec && currentTime <= (item.sec + 0.5)) {
            eventBus.$emit('pause')
            this.$set(this, 'currentCuePoint', item)
            this.showOverlay()
          }
        })
      },

      getCurrentVideoTime (video) {}
    },

    mounted () {
      const video = this.$refs.video
      video.volume = 0
      video.ontimeupdate = e => {
        this.$set(this, 'playing', true)
        this.$set(this, 'currentTime', Math.floor(e.target.currentTime))
        // pass currentTime and whole video object to frame checker
        this.checkIfFrameEquals(e.target.currentTime, video)
      }
    },

    created () {
      // global events to play/pause the video, and lock the video if an overlay got triggered to prevent stuttering when playing agia
      eventBus.$on('play', play => { this.toggleVideo(true) })
      eventBus.$on('pause', pause => { this.toggleVideo(false) })
      eventBus.$on('lock', lock => {
        this.$set(this, 'videoLock', true)
        setTimeout(e => {
          this.$set(this, 'videoLock', false)
        }, 1000, false)
      })
    }
  }
</script>
