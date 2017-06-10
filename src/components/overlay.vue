<template>
  <transition name="fade">
    <div id="overlay" v-if="show">
      <div class="question">
        <h1>{{ data.content.question }}</h1>

        <div class="answers">
            <a v-for="(answer, index) in data.content.answers" ref="answer" @click="toggleFeedback(true, index)" :key="answer" class="btn inverted">{{ index + 1}}. {{ answer.answer }}</a>
        </div>

        <div class="feedback" v-show="showFeedback">
          {{ feedback }}
          <a v-if="status" @click="continueVideo" class="btn block">Ga verder</a>
          <a v-else @click="toggleFeedback(false)" class="btn block inverted">Hide feedback</a>
        </div>

        <div class="timer">
          <span class="seconds">{{ sec }}</span>
        </div>

        <div v-if="toLate" class="goOn">
          <a @click.prevent="continueVideo" class="btn">{{ data.content.btnText }}</a>
        </div>

      </div>

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
        show: false,
        showFeedback: false,
        feedback: '',
        status: null,
        sec: 2,
        toLate: false
      }
    },
    methods: {
      continueVideo () {
        this.$set(this, 'show', false)
        this.$set(this, 'showFeedback', false)
        this.resetAll()
        eventBus.$emit('play')
        eventBus.$emit('lock')
      },

      toggleFeedback (state, index) {
        this.$set(this, 'showFeedback', state)
        this.feedback = this.data.content.answers[index].feedback
        this.status = this.data.content.answers[index].status
      },

      timer () {
        const timer = setInterval(e => {
          this.sec--
          if (this.sec <= 0) {
            clearInterval(timer)
            this.$set(this, 'sec', 0)
            this.$set(this, 'toLate', true)
            this.disableInput()
          }
        }, 1000)
      },

      disableInput () {
        const answers = this.$refs.answer
        answers.forEach(button => {
          button.classList.add('disabled')
        })
      },

      resetAll () {
        this.$set(this, 'feedback', '')
        this.$set(this, 'sec', 30)
        this.$set(this, 'toLate', false)
      }
    },
    mounted () {},
    created () {
      eventBus.$on('showOverlay', show => {
        this.$set(this, 'show', show)
        this.$set(this.$parent.$data, 'playing', false)
        this.timer()
      })
      eventBus.$on('reset', e => { this.resetAll() })
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
