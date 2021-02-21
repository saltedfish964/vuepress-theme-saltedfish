<template>
  <main class="page">
    <slot name="top" />

    <transition
      :name="contentTransition"
      mode="out-in"
      appear
    >
      <Content class="theme-saltedfish-content" />
    </transition>

    {{ data }}

    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from './PageEdit.vue'
import PageNav from './PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems'],
  computed: {
    data () {
      return this.$page.frontmatter
    },
    contentTransition() {
      let transitionList = ['fade', 'fade-in-up', 'fade-in-right', 'fade-in-down', 'fade-in-left']
      if (this.data.contentTransition) {
        return transitionList.includes(this.data.contentTransition) ? this.data.contentTransition : 'fade'
      } else {
        return transitionList.includes(this.$themeConfig.contentTransition) ? this.$themeConfig.contentTransition : 'fade'
      }
    },
  },
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
  overflow: hidden;
}

// fade
.fade-enter-active, .fade-leave-active {
  transition-duration: 0.7s;
  transition-property: opacity;
  transition-timing-function: ease;
}

// fade-in-up
.fade-enter, .fade-leave-active {
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
    perspective: 1px;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.fade-in-up-leave-to {
  opacity: 0;
  transition: opacity 0.3s;
}

.fade-in-up-enter {
  opacity: 0;
  transform: translate3d(0, 40px, 0);
}

.fade-in-up-enter-to {
  opacity: 0;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: fadeInUp;
}

// fade-in-right
@keyframes fadeInRight {
  from {
    transform: translate3d(40px, 0, 0);
    perspective: 1px;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.fade-in-right-leave-to {
  opacity: 0;
  transition: opacity 0.3s;
}

.fade-in-right-enter {
  opacity: 0;
  transform: translateX(40px);
}

.fade-in-right-enter-to {
  opacity: 0;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: fadeInRight;
}

// fade-in-down
@keyframes fadeInDown {
  from {
    transform: translate3d(0, -40px, 0);
    perspective: 1px;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.fade-in-down-leave-to {
  opacity: 0;
  transition: opacity 0.3s;
}

.fade-in-down-enter {
  opacity: 0;
  transform: translate3d(0, -40px, 0);
}

.fade-in-down-enter-to {
  opacity: 0;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: fadeInDown;
}

// fade-in-left
@keyframes fadeInLeft {
  from {
    transform: translate3d(-40px, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.fade-in-left-leave-to {
  opacity: 0;
  transition: opacity 0.3s;
}

.fade-in-left-enter {
  opacity: 0;
  transform: translate3d(-40px, 0, 0);
}

.fade-in-left-enter-to {
  opacity: 0;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: fadeInLeft;
}
</style>
