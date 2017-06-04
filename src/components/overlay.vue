<template>
  <div id="overlay" v-if="show">
    <h1>OVERLAYYY</h1>
    <a @click.prevent="hide">hide</a>
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
      hide () {
        this.show = false
      }
    },
    created () {
      eventBus.$on('showOverlay', show => {
        this.$set(this, 'show', show)
      })
    }
  }
</script>

<style lang="stylus">
  #overlay
    width:100vw
    position:absolute
    top:0
    left:0
    z-index:1000
    height:100vh
    background:rgba(0,0,0,.6)
</style>
