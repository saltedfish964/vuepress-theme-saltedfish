<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <div class="blog">
      <div class="blog-box">
        <div class="list">
          <div
            class="item"
            v-for="page in $pagination.pages"
          >
            <div class="image-wrap"></div>
            <div class="extract">
              <div class="date">
                <div class="month">{{ page.path.split('/')[2] }}</div>
                <div class="day">{{ page.path.split('/')[3] + '.' + page.path.split('/')[4] }}</div>
              </div>
              <div class="detail">
                <h1 class="title">{{ page.title }}</h1>
                <p>The College Football Playoff (CFP) determines the national champion of the
                  top division of college football. The format fits within the academic calendar and
                  preserves the
                  sport’s unique and compelling regular season.</p>
              </div>
            </div>
          </div>
          <!-- <ul>
            <li v-for="page in $pagination.pages">
              <router-link
                class="page-link"
                :to="page.path"
              >{{ page.title }}</router-link>
            </li>
          </ul> -->
        </div>
        <div class="info"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import { resolveSidebarItems } from '../util'

export default {
  name: 'Layout',

  components: {
    Sidebar,
    Navbar
  },

  data () {
    return {
      isSidebarOpen: false
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      const userPageTheme = this.$page.frontmatter.pageTheme === 'cheatsheet'
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
          'cheatsheet': userPageTheme,
        },
        userPageClass
      ]
    }
  },

  mounted () {
    console.log(this.$pagination)
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.blog {
  padding-top: 1rem;
  margin-top: 3.6rem;
  height: calc(100vh - 3.6rem);
  box-sizing: border-box;

  .blog-box {
    display: flex;
    justify-content: center;
    max-width: 1040px;
    margin: 0 auto;
  }

  .list {
    flex: 1;
    max-width: 740px;

    .item {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 12%), 0 1px 2px rgba(0, 0, 0, 24%);
      border-radius: 0.25rem;
      overflow: hidden;
      margin-bottom: 1rem;

      .image-wrap {
        height: 16rem;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        background-size: cover;
        background-position: top;
        background-image: url('/background.jpg');
      }

      .extract {
        display: flex;
        flex-direction: row;

        .date {
          background-color: #c8dd8f;
          border-radius: 0 0 0 0.25rem;
          display: flex;
          font-weight: 700;
          line-height: 1;
          padding: 1rem;
          color: #2d3748;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 25%;

          .month {
            margin-bottom: 0.5rem;
          }

          .day, .month {
            color: #fff;
            font-size: 2rem;
          }
        }

        .detail {
          font-weight: 400;
          padding: 1rem;
          color: #2d3748;
          width: 75%;

          .title {
            font-weight: 700;
            line-height: 1;
            margin: 0;
            margin-bottom: 1rem;
            color: #2d3748;
            font-size: 2.25rem;
            letter-spacing: -0.025em;
          }
        }
      }
    }
  }

  .info {
    flex: 0 0 300px;
    background: #f1f1f1;
    margin-left: 15px;
  }
}

@media (max-width: 719px) {
  .blog {
    .blog-box {
      flex-direction: column;
    }

    .list {
      .item {
        border-radius: 0;

        .image-wrap {
          border-radius: 0;
        }

        .extract {
          flex-direction: column;

          .date {
            justify-content: space-around;
            width: auto;
            flex-direction: row;
            border-radius: 0;

            .month, .day {
              font-size: 1.5rem;

              span {
                display: inline;
              }
            }
          }
        }
      }
    }

    .info {
      margin-left: 0;
    }
  }
}
</style>
