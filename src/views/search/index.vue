<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
    -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 历史结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- /历史结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else :search-histories="searchHistories" @search="onSearch"/>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: [] // 搜索历史数据
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    // 获取登录后用户搜索历史记录
    this.loadSearchHistories()
  },
  methods: {
    onSearch(val) {
      // 把输入框设置为你要搜索的文本
      this.searchText = val
      const index = this.searchHistories.indexOf(val)

      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }

      // 把最新的搜索历史记录放在顶部
      this.searchHistories.unshift(val)

      // 如果用户已登录，，则把搜索历史记录存储到线上
      //    提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史记录
      // 如果没有登录，则把搜索历史记录存储到本地
      setItem('search-histories', this.searchHistories)
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },

    // 获取登录后用户搜索历史记录
    async loadSearchHistories() {
      // 因为后端帮我们存储的用户搜索历史记录太少了（只有4条）
      // 所以我们这里让后端返回的历史记录和本地的历史记录合并到一起
      // 如果用户已登录
      let searchHistories = getItem('search-histories') || []
      if (this.user) {
        const { data } = await getSearchHistories()
        // console.log(data.data.keywords)
        // 合并数据：[...数组, ...数组]
        // 把 Set 转为数组：[...Set对象]
        // 数据去重：[...new Set([...数组, ...数组])]
        searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      }

      // console.log(searchHistories)

      this.searchHistories = searchHistories
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
