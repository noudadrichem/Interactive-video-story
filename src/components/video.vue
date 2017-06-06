<template>
  <div>
    <div id="videoContainer">
      <video id="video" ref="video" controls :src="videoUrl"></video>
    </div>
    <br/>
    <a @click.prevent="playVideo(true)">START</a>
    <a @click.prevent="playVideo(false)">STOP</a>
    <a @click.prevent="showOverlay">SHOW</a>
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span ref="currentTime">0</span>
    <pre>{{ $data }}</pre>
    <overlay :data="'yes'"/>
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
        cuePoints
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

      playVideo (state) {
        const video = this.$refs.video
        if (state) {
          video.play()
          this.getCurrentVideoTime(video)
        } else {
          video.pause()
        }
      },

      checkIfFrameEquals (frame) {
        this.$refs.currentTime.innerHTML = frameFloor
        // const getSec = (item.sec * 10)
        this.cuePoints.map(item => {
          if (frame === item.sec && this.videLock === false) {
            this.playVideo(false)
            this.$set(this, 'videoLock', true)
            console.log('EQUALS NOW')
          }
        })
      },

      getCurrentVideoTime (video) {
        setInterval(e => {
          const frame = Math.floor(video.currentTime)
          console.log(frame)
          this.checkIfFrameEquals(frame)
        }, 1000)
        // video.addEventListener('timeupdate', e => {
        //   console.log(Math.floor(video.currentTime))
        // })

        // this.checkIfFrameEquals(frame)
      }
    },

    mounted () {
      this.$refs.video.volume = 0
      // console.log(this.cuePoints)
    }
  }
</script>
