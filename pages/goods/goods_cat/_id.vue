<template>
  <div class="shop">
    <shop_header />
    <shop_othor_nav />

    <!-- 面包屑 -->
    <mbx />
    
    <!-- 分类 -->
    <div class="product_cat">
      <ul>
        <li>
          <span>分类：</span>
          <span :class="now_cat==''?'act':''" @click="now_cats_fun('')">全部</span>
          <span v-for="v in goods_cat" :class="now_cat==v.id?'act':''"  @click="now_cats_fun(v.id)">{{v.name}}</span>
        </li>
        <li>
          <span>品牌：</span>
          <span :class="now_cat==''?'act':''" @click="now_brands_fun('')">全部</span>
          <span v-for="v in goods_brand" :class="now_brand==v.id?'act':''" @click="now_brands_fun(v.id)">{{v.name}}</span>
        </li>
        <li>
          <span>排序：</span>
          <span :class="now_status==''?'act':''"  @click="now_status_fun('')">默认</span>
          <span :class="now_status=='price'?'act':''" @click="now_status_fun('price')">价格</span>
          <span :class="now_status=='comment'?'act':''" @click="now_status_fun('comment')">评论</span>
          <span :class="now_status=='sale'?'act':''" @click="now_status_fun('sale')">销售</span>
          <span :class="now_status=='add_time'?'act':''" @click="now_status_fun('add_time')">添加时间</span>
        </li>
      </ul>
    </div>

    <!-- 产品列表 -->
    <div class="product_list">
      <dl v-for="v in goods_list"><nuxt-link :to="'/goods/'+v.id">
        <dt><img :src="v.images.split(',')[0]" width="180px" height="180px" alt=""></dt>
        <dd class="title">{{v.title}}</dd>
        <dd class="price">￥{{v.get_sku != null?v.get_sku.price:v.price}}</dd>
        <dd><span>立即购买</span><span>1 人评价</span></dd>
        </nuxt-link>
      </dl>
    </div>

    <div class="fy">
      <a-pagination v-model="page.page" :total="page.count" :defaultPageSize="30" @change="onChange" />
    </div>

    <!-- 底部 -->
    <shop_foot />

  </div>
</template>

<script>
import shop_header from '@/components/Common/shop_header.vue'
import shop_othor_nav from '@/components/Common/shop_other_nav.vue'
import shop_foot from '@/components/Common/shop_foot.vue'
import mbx from '@/components/Common/mbx.vue'

export default {
  components: {
    shop_header,
    shop_othor_nav,
    shop_foot,
    mbx,
  },
  data(){
    return{
      now_cat:'',
      now_brand:'',
      now_status:'',
      sorts:'asc',
      goods_cat:[],
      goods_brand:[],
      goods_list:[],
      page:[],
      pages:30,
      limit:1,
    }
  },
  methods:{
    now_cats_fun:function(e){
      this.now_cat = e;
      this.getData();
    },
    now_brands_fun:function(e){
      this.now_brand = e;
      this.getData();
    },
    now_status_fun:function(e){
      if(e == this.now_status){
        if(this.sorts == 'asc'){
          this.sorts = 'desc';
        }else{
          this.sorts = 'asc';
        }
      }
      this.now_status = e;
      this.getData();
    },
    getData:function(){
      var _this = this;
      var goods_cat = this.$route.params.id;
      var goods_cat_arr = goods_cat.split('?');
      goods_cat = goods_cat_arr[0];
      this.$post(this.ROOT_URL + "Shop/getGoodsList",{goods_cat:goods_cat,now_cat:this.now_cat,now_brand:this.now_brand,now_status:this.now_status,sorts:this.sorts,limit:this.page.limit,page:this.page.page}).then(function(res){
        _this.goods_cat = res.goods_cat;
        _this.goods_brand = res.goods_brand;
        _this.goods_list = res.data;
        _this.page = res.page;
      });
    },
    onChange:function(current, size){
      this.page.limit = size;
      this.page.page = current;
      this.getData();
    }
  },
  mounted(){
    if(this.$route.params.child_id !== undefined){
      this.now_cat = this.$route.params.child_id
    }
    this.getData();
  },
}
</script>

<style>
.product_cat{width: 1200px;margin:0 auto;}
.product_cat ul li{border-top: 1px solid #efefef;border-left: 1px solid #efefef;border-right: 1px solid #efefef;line-height: 50px;padding-left: 45px;}
.product_cat ul li:last-child{border-bottom: 1px solid #efefef;}
.product_cat ul li span{margin-right: 20px;}
.product_cat ul li span.act{color:#e01d20;}
.product_cat ul li span:hover{color:#e01d20;}
.product_list{width: 1200px;margin:0 auto;margin-top: 30px;}
.product_list dl{border: 1px solid #efefef;width: 224px;height: 364px;float: left;margin:0 20px 20px 0;}
.product_list dl:nth-child(5n){margin-right: 0px;}
.product_list dl dt img{margin:0 auto;display: block;margin-top: 30px;margin-bottom: 25px;}
.product_list dl dd.title{color:#000;height: 36px;text-align: center;padding: 0 15px;overflow: hidden;}
.product_list dl dd.price{color:#e01d20;line-height:50px;text-align: center;padding: 0 15px;font-size: 20px;overflow: hidden;}
.product_list dl dd span{width: 50%;display: block;border-top:1px solid #efefef;float: left;line-height: 41px;text-align: center;}
.product_list dl dd span:first-child{box-sizing: border-box;border-right: 1px solid #efefef;}
.product_list dl dd span:first-child:hover{background: #e01d20;color:#fff;}
.product_list dl:hover{border:1px solid #e01d20;}
.fy{width: 1200px;margin:0 auto;}
.fy .anticon{vertical-align:-0.7em}
.fy .ant-pagination-item-active a{color:#e01d20;}
.fy .ant-pagination-item:focus a, .ant-pagination-item:hover a{color:#e01d20;}
.fy .ant-pagination-item-active{border-color:#e01d20;}
.fy .ant-pagination-item:focus, .ant-pagination-item:hover{border-color:#e01d20;}
</style>
