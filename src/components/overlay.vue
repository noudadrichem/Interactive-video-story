<template>
  <transition name="fade">
    <div id="overlay" v-if="show">
      <div class="question">
        <h1>{{ data.content.question }}</h1>

        <div class="answers">
          <a v-for="answer in data.content.answers" :key="answer" class="btn inverted">{{ answer.answer }}</a>
        </div>
      </div>

      <center><a @click.prevent="continueVideo" class="btn">{{ data.content.btnText }}</a></center>

    </div>
  </transition>
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
        this.$set(this, 'show', false)
        eventBus.$emit('play')
        eventBus.$emit('lock')
      }
    },
    created () {
      eventBus.$on('showOverlay', show => {
        this.$set(this, 'show', show)
        this.$set(this.$parent.$data, 'playing', false)
      })
    },
    mounted () {
      console.log(this.data)
    }
  }
</script>

<style lang="stylus">
.fade-enter-active, .fade-leave-active
  transition:.5s
.fade-enter, .fade-leave-to
  opacity:0
  transform:translateX(50%)
</style>
