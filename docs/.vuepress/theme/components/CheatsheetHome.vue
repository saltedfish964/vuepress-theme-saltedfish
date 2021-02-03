<template>
  <main
    class="home"
    :aria-labelledby="data.heroText !== null ? 'main-title' : null"
  >

    <div
      class="search-wrap"
      v-if="data.cheatsheetsSort"
    >
      <input
        type="text"
        v-model="searchValue"
        @input="onSearchInput"
        placeholder="Search"
      />
    </div>

    <div
      class="sort"
      v-if="data.cheatsheetsSort"
    >
      <div
        class="sort-item"
        v-for="(item, index) in showList"
        :key="index"
      >
        <RouterLink :to="item.link">{{ item.text }}</RouterLink>
        <span class="icon"></span>
      </div>
    </div>

    <Content class="theme-saltedfish-content custom" />

    <div
      v-if="data.footer"
      class="footer"
    >
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import Fuse from 'fuse.js'
import NavLink from './NavLink.vue'

export default {
  name: 'CheatsheetHome',

  data() {
    return {
      searchValue: '',
      list: [],
      resultList: [],
      fuse: null,
    };
  },

  components: { NavLink },

  methods: {
    onSearchInput(value) {
      this.resultList = this.fuse.search(this.searchValue).map(item => item.item)
    },
  },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },

    showList () {
      return this.searchValue ? this.resultList : this.list
    },
  },

  created() {
    this.list = this.$page.frontmatter.cheatsheetsSort
    this.fuse = new Fuse(this.list, {
      keys: ['text']
    })
  },
}
</script>

<style lang="stylus">
.home {
  .search-wrap {
    display: flex;
    justify-content: center;
    padding: 2rem 0;

    input {
      outline: 0;
      width: 20rem;
      height: 3rem;
      border-radius: 1.5rem;
      box-sizing: border-box;
      padding: 0 1rem;
      font-size: 1.25rem;
      border: 1px solid #cfd4db;
    }
  }

  .sort {
    display: flex;
    flex-wrap: wrap;

    .sort-item {
      flex: 0 0 50%;
      color: #111;
      font-weight: normal;
      padding: 0.5rem 0;
      text-align: center;

      &:hover {
        .icon {
          background: #77dab2;
        }
      }

      .icon {
        margin-left: 8px;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: transparent;
        display: inline-block;
      }

      a {
        color: #111;
        font-weight: normal;
      }
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
}

@media (max-width: $MQMobile) {
}

@media (max-width: $MQMobileNarrow) {
}
</style>
