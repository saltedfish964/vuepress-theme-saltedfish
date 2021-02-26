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
        <div class="list-box">
          <div class="list">
            <div
              class="item"
              v-for="page in articleList"
            >
              <div class="image-wrap"></div>
              <div class="extract">
                <div class="date">
                  <div class="month">{{ formatDate(page)['year'] }}</div>
                  <div class="day">{{ formatDate(page)['monthAndDay'] }}</div>
                </div>
                <div class="detail">
                  <h1
                    class="title"
                    @click="onDetail(page)"
                  >{{ page.title }}</h1>
                  <p v-if="page.frontmatter">{{ page.frontmatter.summary }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination-box">
            <Pagination></Pagination>
          </div>
        </div>
        <div class="info"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import { Pagination } from '@vuepress/plugin-blog/lib/client/components'
import { resolveSidebarItems } from '../util'

export default {
  name: 'Layout',

  components: {
    Sidebar,
    Navbar,
    Pagination
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
    },

    articleList () {
      return this.$pagination.pages;
    },
  },

  mounted () {
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
    },

    formatDate (item) {
      let obj = {
        year: '',
        monthAndDay: ''
      };
      if (item.frontmatter.date) {
        obj.year = dayjs(item.frontmatter.date).year();
        obj.monthAndDay = dayjs(item.frontmatter.date).format('MM.DD');
      } else {
        obj.year = dayjs().year();
        obj.monthAndDay = dayjs().format('MM.DD');
      }
      return obj;
    },

    onDetail(page) {
      console.log(page)
      this.$router.push(page.path);
    },
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

  .list-box {
    flex: 1;
  }

  .list {
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
            font-size: 1.75rem;
            letter-spacing: -0.025em;

            &:hover {
              color: #666;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .pagination-box {
    display: flex;
    justify-content: flex-end;
  }

  .info {
    flex: 0 0 200px;
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

    .pagination-box {
      padding: 0 15px;
    }

    .info {
      margin-left: 0;
    }
  }
}
</style>
