<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"/>

    <van-search v-model.trim="searchWord" show-action placeholder="请输入搜索关键词" clearable ref="searchInput">
      <template #action>
        <div @click="goSearch(searchWord)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clearHistory" name="delete-o" size="16"/>
      </div>
      <div class="list">
        <div class="list-item" v-for="item in searchHistory" :key="item" @click="goSearch(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import { getSearchHistory, setSearchHistory } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchHistory: getSearchHistory(),
      searchWord: this.$route.query.search || ''
    }
  },
  mounted () {
    this.$refs.searchInput.querySelector('input').focus()
  },
  methods: {
    goSearch (word) {
      if (!word) {
        return
      }
      const index = this.searchHistory.indexOf(word)
      if (index === -1) {
        this.searchHistory.unshift(word)
      } else {
        this.searchHistory.splice(index, 1)
        this.searchHistory.unshift(word)
      }
      setSearchHistory(this.searchHistory)
      this.$router.push(`/searchlist?search=${word}`)
    },
    clearHistory () {
      this.searchHistory = []
      setSearchHistory(this.searchHistory)
      this.$toast.success('清除成功')
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }

  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
