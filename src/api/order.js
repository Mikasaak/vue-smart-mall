import request from '@/utils/request'

/**
 * 订单结算
 * @param mode 模式 buyNow立即购买 cart购物车
 * @param remark 备注
 * @param obj {Object}对象参数
 * @param obj.cartIds {string} 购物车id mode=cart时必填
 * @param obj.goodsId {string} 商品id mode=buyNow时必填
 * @param obj.goodsNum {string} 商品数量 mode=buyNow时必填
 * @param obj.goodsSkuId {string } 商品skuId mode=buyNow时必填
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const settleOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      shopId: 0,
      couponId: 0,
      ...obj
    }
  })
}

/**
 *
 * @param mode 模式 buyNow立即购买 cart购物车
 * @param params {Object}对象参数
 * @param params.cartIds {string} 购物车id mode=cart时必填
 * @param params.goodsId {string} 商品id mode=buyNow时必填
 * @param params.goodsNum {string} 商品数量 mode=buyNow时必填
 * @param params.goodsSkuId {string } 商品skuId mode=buyNow时必填
 * @param params.remark {string} 备注 必填
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...params
  })
}

export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
export const cancelOrder = (orderId) => {
  return request.post('/order/cancel', {
    orderId
  })
}
