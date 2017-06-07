<template>
  <div id="overlay" v-if="show">
    <h1>OVERLAYYY</h1>
    <a @click.prevent="continueVideo">{{data.content.btnText}}</a><br>
    <br/>{{ data }}
  </div>
</template>

<script>
  import { eventBus } from '@/eventBus'

  export default {
    name: 'overlay',
    props: ['data'],
    data () {
      return {
        show: false
      }
    },
    methods: {
      continueVideo () {
        // this.show = false
        this.$set(this, 'show', false)
        // this.$set(this.$parent.$data, 'playing', true)
        eventBus.$emit('play')
        eventBus.$emit('lock')
        // this.$parent.$data.playing = true
      }
    },
    created () {
      eventBus.$on('showOverlay', show => {
        this.$set(this, 'show', show)
        this.$set(this.$parent.$data, 'playing', false)
      })
    },
    mounted () {
      console.log('parent', this.$parent.$data)
    }
  }
</script>

<style lang="stylus">
  #overlay
    width:100vw
    position:absolute
    text-align:center
    top:0
    left:0
    z-index:1000
    height:100vh
    background:rgba(0,0,0,.6)
</style>
