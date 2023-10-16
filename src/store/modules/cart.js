import { delCartItems, getCartList, setProductCount } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: [],
      cartTotal: 0
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    setCartTotal (state, newTotal) {
      state.cartTotal = newTotal
    },
    toggleChecked (state, id) {
      const item = state.cartList.find(item => item.goods_id === id)
      item.isChecked = !item.isChecked
    },
    toggleAllChecked (state, checked) {
      state.cartList.forEach(item => { item.isChecked = checked })
    },
    setProductCount (state, { goodsId, goodsNum }) {
      state.cartList.find(item => item.goods_id === goodsId).goods_num = goodsNum
    }

  },
  actions: {
    async getCartList (ctx) {
      const { data: { list, cartTotal } } = await getCartList()
      list.forEach(item => { item.isChecked = true })
      ctx.commit('setCartList', list)
      ctx.commit('setCartTotal', cartTotal)
      console.log(list)
      console.log(cartTotal)
    },
    async setProductCountAction (ctx, { goodsId, goodsNum, goodsSkuId }) {
      const res = await setProductCount(goodsId, goodsNum, goodsSkuId)
      ctx.commit('setProductCount', { goodsId, goodsNum })
      console.log(res)
    },
    async delCartItemsAction (ctx) {
      const cartIds = ctx.getters.checkedGoodsList.map(item => item.id)
      console.log(cartIds)
      const res = await delCartItems(cartIds)
      console.log(res)
      Toast('删除成功')
      ctx.dispatch('getCartList')
    }
  },
  getters: {
    // 所有商品是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    },
    // 所有商品数量
    allGoodsCount (state) {
      return state.cartList.reduce((pre, item) => {
        pre += item.goods_num
        return pre
      }, 0)
    },
    checkedGoodsList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品数量
    checkedGoodsCount (state) {
      return state.cartList.reduce((pre, item) => {
        if (item.isChecked) {
          pre += item.goods_num
        }
        return pre
      }, 0)
    },
    // 选中的商品总价
    checkedGoodsAmount (state) {
      return state.cartList.reduce((pre, item) => {
        if (item.isChecked) {
          pre += item.goods.goods_price_max * item.goods_num
        }
        return pre
      }, 0)
    }
  }

}
