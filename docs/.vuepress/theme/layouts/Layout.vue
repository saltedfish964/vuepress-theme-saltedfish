<template>
  <div
    class="theme-container"
    :class="pageClasses"
  >
    <Navbar v-if="shouldShowNavbar"></Navbar>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { resolveSidebarItems } from '../util';

export default {
  name: 'Layout',
  data () {
    return {
      isSidebarOpen: false,
    }
  },
  components: {
    Navbar,
  },
  computed: {
    // 是否有导航栏
    shouldShowNavbar () {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title // 页面标题
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      );
    },
    // 是否有侧边栏
    shouldShowSidebar () {
      const { frontmatter } = this.$page;
      console.log('是否有侧边栏：', frontmatter);
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      );
    },
    sidebarItems () {
      console.log('sidebarItems：', resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath,
      ));
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath,
      );
    },
    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass;
      console.log('无导航栏：', !this.shouldShowNavbar);
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },
  },
  methods: {
    // 控制侧边栏展开/收起
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
  },
  mounted () {
    // 跳转路由之后关闭侧边栏
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },
}
</script>
