<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active" sticky>
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="待支付" name="payment"></van-tab>
      <van-tab title="待发货" name="delivery"></van-tab>
      <van-tab title="待收货" name="received"></van-tab>
      <van-tab title="待评价" name="comment"></van-tab>
    </van-tabs>

    <OrderListItem v-for="item in list" :item="item" :key="item.order_id" :updateOrderList="getMyOrderList"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrderList } from '@/api/order'
export default {
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: [],
      OrderData: {}
    }
  },
  methods: {
    async getMyOrderList () {
      const { data: { list } } = await getMyOrderList(this.active, this.page)
      console.log(list)
      this.OrderData = list
      this.list = list.data
    }
  },
  watch: {
    active: {
      immediate: true,
      handler () {
        this.getMyOrderList()
      }
    }
  }
}

</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
