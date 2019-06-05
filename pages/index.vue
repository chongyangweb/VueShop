<template>
  <div class="shop">
    <shop_header />
    <shop_index_nav />
    <shop_banner />

    <!-- banner下 -->
    <div class="banner_bottom_gg">
      <div class="shop_left_on">
        <ul>
          <li><nuxt-link to="/"><img src="@/assets/sm.png" alt=""><p>实名认证</p></nuxt-link></li>
          <li><nuxt-link to="/"><img src="@/assets/hx.png" alt=""><p>以旧换新</p></nuxt-link></li>
          <li><nuxt-link to="/"><img src="@/assets/ygm.png" alt=""><p>优购码</p></nuxt-link></li>
          <li><nuxt-link to="/"><img src="@/assets/tx.png" alt=""><p>开售提醒</p></nuxt-link></li>
          <li><nuxt-link to="/"><img src="@/assets/gg.png" alt=""><p>公告</p></nuxt-link></li>
          <li><nuxt-link to="/"><img src="@/assets/tq.png" alt=""><p>特权频道</p></nuxt-link></li>
        </ul>
      </div>

      <div class="shop_right_on">
        <ul>
          <li><nuxt-link to="/"><img src="http://hw.yocit.com/Public/Home/images/index3.jpg" alt=""></nuxt-link></li>
          <li><nuxt-link to="/"><img src="http://hw.yocit.com/Public/Home/images/index2.jpg" alt=""></nuxt-link></li>
          <li><nuxt-link to="/"><img src="http://hw.yocit.com/Public/Home/images/index1.jpg" alt=""></nuxt-link></li>
        </ul>
      </div>
      <div class="clear"></div>
    </div>

    <!-- 热销推荐 -->
    <div class="shop_hot_product">
      <h2>热销推荐</h2>
      <div class="shop_index_list">
        <ul>
          <li v-for="v in hot_goods"><nuxt-link :to="'/goods/'+v.id">
            <img :src="v.images.split(',')[0]" height="142px" width="142px" alt="">
            <p class="shop_index_list_title">{{v.title}}</p>
            <p class="shop_index_list_tag">{{v.sub_title}}</p>
            <p class="shop_index_list_price">{{v.get_sku != null?v.get_sku.price:v.price}}元</p>
          </nuxt-link></li>
        </ul>
      </div>

      <div class="hot_shop_gg">
        <img src="http://hw.yocit.com/Public/Home/images/hf1.jpg" alt="">
      </div>
    </div>

    <!-- 列表产品 -->
    <div class="shop_cat_lists_bg">
      <div class="shop_cat_lists" v-for="v in goods_cat">
        <div class="lanmu">
          <h2>{{v.name}}</h2>
          <div class="lanmu_list">
            <ul>
              <li v-for="vo in v.child"><nuxt-link :to="{name:'goods-goods_cat-id',params:{child_id:vo.id,id:v.id+'?'+vo.id}}">{{vo.name}}</nuxt-link></li>
            </ul>
          </div>
          <div class="shop_cat_more">
            <nuxt-link :to="'/goods/goods_cat/'+v.id">>> 更多 <<</nuxt-link>
          </div>
        </div>
        <!-- 左边广告 -->
        <div class="shop_real_product">
          <div class="shop_left_gg">
            <img :src="v.thumb" width="232px" height="570px" alt="">
          </div>
          <div class="shop_right_product">
            <dl v-for="vo in v.goods_list">
              <nuxt-link :to="'/goods/'+vo.id">
              <dt><img :src="vo.images.split(',')[0]" width="142px" height="142px" alt=""></dt>
              <dd class="hg1">{{vo.title}}</dd>
              <dd class="hg2">{{vo.sub_title}}</dd>
              <dd class="hg3">{{vo.get_sku != null?vo.get_sku.price:vo.price}}</dd>
              </nuxt-link>
            </dl>

          </div>
        </div>
      </div>

    </div>
    
    <!-- 底部 -->
    <shop_foot />

  </div>
</template>

<script>
import shop_header from '@/components/Common/shop_header.vue'
import shop_index_nav from '@/components/Common/shop_index_nav.vue'
import shop_banner from '@/components/Common/shop_banner.vue'
import shop_foot from '@/components/Common/shop_foot.vue'

export default {
  components: {
    shop_header,
    shop_index_nav,
    shop_banner,
    shop_foot,
  },
  data(){
    return{
      hot_goods:[],
      goods_cat:[],
    }
  },
  mounted(){
    var _this = this;
    this.$get(this.ROOT_URL + "Shop/getIndexGoods").then(function(res){
      _this.hot_goods = res.hot_goods;
      _this.goods_cat = res.goods_cat;
      // console.log(res);
    });
  },
}
</script>

<style>
.banner_bottom_gg{width: 1200px;margin:0 auto;margin-top:22px;}
.shop_left_on{float: left;width:240px; }
.shop_left_on ul li{width: 78px;height: 80px;text-align: center;background: #f2f2f2;box-sizing: border-box;padding-top: 10px;float: left;}
.shop_left_on ul li p{text-align: center;line-height: 30px;}
.shop_left_on ul li img{margin:0 auto;}
.shop_left_on ul li:hover{background: #eee;}
.shop_left_on ul li:nth-child(1){border-right: 1px solid #dedede;border-bottom: 1px solid #dedede;}
.shop_left_on ul li:nth-child(2){border-right: 1px solid #dedede;border-bottom: 1px solid #dedede;}
.shop_left_on ul li:nth-child(3){border-bottom: 1px solid #dedede;}
.shop_left_on ul li:nth-child(4){border-right: 1px solid #dedede;}
.shop_left_on ul li:nth-child(5){border-right: 1px solid #dedede;}
.shop_right_on{float: left;margin-left: 14x;}
.shop_right_on ul li{float: left;margin-right: 10px;}
.shop_right_on ul li:nth-child(3){margin-right: 0;}
.shop_right_on ul:after{display: block;clear: both;content:'';}
.shop_right_on:after{display: block;clear: both;content:'';}
.shop_hot_product{width: 1200px;margin:0 auto;margin-top: 35px;}
.shop_hot_product h2{font-size: 24px;}
.shop_index_list{margin-top: 20px;}
.shop_index_list ul li{width: 239px;height: 316px;box-sizing: border-box;border:1px solid #efefef;border-left: none;float: left;}
.shop_index_list ul li:nth-child(1){border-left: 1px solid #efefef;}
.shop_index_list ul li img{margin:0 auto;display: block;margin-top: 38px;margin-bottom: 28px;}
.shop_index_list_title{font-size: 14px;color:#222;height: 48px;line-height: 24px;overflow: hidden;text-align: center;padding: 0 20px;}
.shop_index_list_tag{font-size: 12px;color:#b0b0b0;height: 24px;line-height: 24px;overflow: hidden;text-align: center;padding: 0 20px;}
.shop_index_list_price{font-size: 14px;color:#ca151c;height: 24px;line-height: 24px;overflow: hidden;text-align: center;padding: 0 20px;}
.shop_index_list ul li:hover p{color:#ca151c;}
.hot_shop_gg{margin-top: 40px;}
.shop_cat_lists{width: 1200px;margin: 0 auto;}
.lanmu:after{display: block;clear: both;content:'';}
.lanmu h2{font-size: 24px;float: left;margin-right: 60px;display: block;}
.lanmu_list{float: left;display: block;}
.lanmu_list ul li{float: left;line-height: 36px;margin-right: 15px;}
.lanmu_list ul li a{color:#999;font-size: 13px;}
.lanmu_list ul li a:hover{color:#ca151c;}
.lanmu{padding-top: 40px;padding-bottom: 20px;}
.shop_cat_lists_bg{background: #f5f5f5;margin-top: 40px;}
.shop_cat_more{float: right;line-height: 30px;font-size: 16px;}
.shop_left_gg{float: left;margin-right: 10px;}
.shop_real_product:after{display: block;clear: both;content:'';}
.shop_right_product{float: left;width: 958px;}
.shop_right_product dl{width: 232px;height: 280px;display: block;float: left;margin-right: 10px;background: #fff;margin-bottom: 10px;}
.shop_right_product dl:hover{-moz-box-shadow:2px 2px 5px #dedede; -webkit-box-shadow:2px 2px 5px #dedede; box-shadow:2px 2px 5px #dedede;}
.shop_right_product dl:nth-child(4n){margin-right: 0px;}
.shop_right_product dl dt img{margin:0 auto;display: block;}
.shop_right_product dl dt{margin:30px 0 28px 0;}
.shop_right_product dl dd{text-align: center;}
.shop_right_product dl dd.hg1{font-size: 14px;color:#222;overflow: hidden;line-height: 25px;height:25px;padding:0 10px;}
.shop_right_product dl dd.hg2{font-size: 12px;color:#999;overflow: hidden;height:25px;padding:0 10px;}
.shop_right_product dl dd.hg3{font-size: 14px;color:#ca151c;overflow: hidden;line-height: 30px;}
</style>
