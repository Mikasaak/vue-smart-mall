<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch|| '搜素商品'"
      show-action
      @click="$router.push(`/search/?search=${querySearch}`)"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list" v-if="searchProductList.length>0">
      <GoodsItem v-for="item in searchProductList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
    <div class="not-found" v-else>
      <p>抱歉，没有找到相关商品</p>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getSearchedProducts } from '@/api/produce'
export default {
  name: 'SearchList',
  components: {
    GoodsItem
  },
  async created () {
    const res = await getSearchedProducts({
      goodsName: this.querySearch,
      categoryId: this.queryCategoryId,
      page: this.page
    })
    console.log(res)
    this.searchProductList = res.data.list.data
  },
  data () {
    return {
      searchWord: '',
      searchProductList: [],
      page: 1
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    },
    queryCategoryId () {
      return this.$route.query.categoryId
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
.not-found{
  text-align: center;
  padding: 20px 0;
}
</style>
