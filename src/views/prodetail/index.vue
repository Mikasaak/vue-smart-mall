<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)"/>

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image) in images" :key="image.file_id">
        <img :src="image.external_url"/>
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed"/>七天无理由退货</span>
          <span><van-icon name="passed"/>48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow"/>
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ reviewsTotal }}条)</div>
        <div class="right">查看更多
          <van-icon name="arrow"/>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in reviewsList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content">
    </div>
    <!--    防止底部遮挡-->
    <div class="tips" style="height: 55px"></div>
    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push('/')">
        <van-icon name="wap-home-o"/>
        <span>首页</span>
      </div>
      <div class="icon-cart" @click="$router.push('/cart')">
        <span v-if="cartTotal > 0" class="num">{{ cartTotal }}</span>
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div class="btn-add" @click="ShowPannelByAddCart">加入购物车</div>
      <div class="btn-buy" @click="ShowPannelByBuyNow">立刻购买</div>
    </div>
    <van-action-sheet v-model="showPannel" title="标题">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ detail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <CountBox v-model="count"></CountBox>
        </div>
        <div class="showbtn" v-if="detail.stock_total > 0" @click="addCartOrBuyNow">
          <div class="btn" v-if="mode==='cart'" @click="addToCart()">加入购物车</div>
          <div class="btn now" v-else @click="buyNow">立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>

</template>

<script>
import { getProDetail, getReviews } from '@/api/produce'
import defaultImg from '@/assets/default-avatar.png'
import CountBox from '@/components/CountBox.vue'
import { addToCart } from '@/api/cart'
import { mapState } from 'vuex'
import { loginConfirm } from '@/mixins/loginConfirm'

export default {
  name: 'ProDetail',
  components: { CountBox },
  mixins: [loginConfirm],
  created () {
    this.getDetail()
    this.getReviews()
    if (this.$store.getters.UserInfo.token
    ) { this.$store.dispatch('cart/getCartList') }
  },
  data () {
    return {
      images: [],
      current: 0,
      detail: {},
      reviewsList: [],
      reviewsTotal: 0,
      defaultImg,
      mode: 'cart',
      showPannel: false,
      count: 1
    }
  },

  methods: {
    onChange (index) {
      this.current = index
    },
    updateCartCount () {
      this.$store.dispatch('cart/getCartList')
    },
    async getDetail () {
      const { data: { detail } } = await getProDetail(this.goodsId)
      // console.log(detail)
      this.detail = detail
      this.images = detail.goods_images
    },
    async getReviews () {
      const { data: { list, total } } = await getReviews({
        goodsId: this.goodsId,
        limit: 3
      })

      // console.log(list)
      // console.log(total)
      this.reviewsList = list
      this.reviewsTotal = total
    },
    ShowPannelByAddCart () {
      this.showPannel = true
      this.mode = 'cart'
    },
    ShowPannelByBuyNow () {
      this.showPannel = true
      this.mode = 'buy'
    },
    async addToCart () {
      const { data: { cartTotal } } = await addToCart(this.goodsId, this.count, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = cartTotal
      this.$toast.success('加入购物车成功')
      this.showPannel = false
      this.updateCartCount()
    },
    addCartOrBuyNow () {
      console.log('加入购物车或立刻购买')
      this.loginConfirm()
    },
    buyNow () {
      console.log('立刻购买')
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsNum: this.goodsNum,
          goodsSkuId: this.goodsSkuId
        }
      })
    }
  },
  computed: {
    // 从路由中获取商品id
    goodsId () {
      return this.$route.params.id
    },
    goodsNum () {
      return this.count
    },
    goodsSkuId () {
      return this.detail.skuList[0].goods_sku_id
    },
    ...mapState('cart', ['cartTotal'])
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  img {
    display: block;
    width: 100%;
  }

  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  .desc {
    width: 100%;
    overflow: scroll;

    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }

  .info {
    padding: 10px;
  }

  .title {
    display: flex;
    justify-content: space-between;

    .now {
      color: #fa2209;
      font-size: 20px;
    }

    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }

    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }

  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }

  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;

    .left-words {
      span {
        margin-right: 10px;
      }

      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }

  .comment-title {
    display: flex;
    justify-content: space-between;

    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;

    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;

      img {
        width: 20px;
        height: 20px;
      }

      .name {
        margin: 0 10px;
      }
    }

    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      .van-icon {
        font-size: 24px;
      }
    }

    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }

    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

// 弹窗样式定制
.product {
  .product-title {
    display: flex;

    .left {
      img {
        width: 90px;
        height: 90px;
      }

      margin: 10px;
    }

    .right {
      flex: 1;
      padding: 10px;

      .price {
        font-size: 14px;
        color: #fe560a;

        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn,
  .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }

  .btn.now {
    background-color: #fe5630;
  }

  .btn-none {
    background-color: #cccccc;
  }
}
// 购物车角标
.footer .icon-cart {
  position: relative;
  padding: 0 6px;
  .num {
    z-index: 999;
    position: absolute;
    top: -2px;
    right: 0;
    min-width: 16px;
    padding: 0 4px;
    color: #fff;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 50%;
  }
}

</style>
