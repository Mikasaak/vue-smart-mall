import { getCartList } from '@/api/cart'

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
