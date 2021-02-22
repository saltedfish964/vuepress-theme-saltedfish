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

    <div>
      <transition-group
        name="list-complete"
        tag="div"
        class="sort"
        v-if="data.cheatsheetsSort"
      >
        <RouterLink
          :to="item.link"
          tag="div"
          class="sort-item"
          custom
          v-slot="{ navigate }"
          v-for="(item, index) in showList"
          :key="index"
        >
          <div @click="navigate">
            <span>{{ item.text }}</span>
            <span class="icon"></span>
          </div>
        </RouterLink>
      </transition-group>
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
      color: #fff;
      outline: 0;
      width: 25rem;
      height: 3rem;
      border-radius: 0.2rem;
      box-sizing: border-box;
      padding: 0 1rem;
      font-size: 1.25rem;
      border: 0;
      font-weight: bold;
      background: #252830;

      &:focus {
        background: #2c303a;
      }
    }
  }

  .sort {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-bottom: 2rem;

    .sort-item {
      transition: all 0.5s;
      display: inline-block;
      text-align: center;
      padding: 10px 15px;
      margin: 10px;
      font-size: 18px;
      background-color: #efefef;
      border-radius: 3px;
      box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
      cursor: pointer;

      &:hover {
        color: white;
        background: #009bd5;
      }

      .icon {
        margin-left: 8px;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: #77dab2;
        display: inline-block;
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

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.list-complete-leave-active {
  position: absolute;
}

@media (max-width: $MQMobile) {
}

@media (max-width: $MQMobileNarrow) {
}
</style>
