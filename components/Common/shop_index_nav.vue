<template>
	<div class="shop_index_nav">
		<div class="shop_index_nav_in">
			<div class="all_nav">所有产品
			<shop_all_nav_cat />
			</div>
			<div class="shop_nav">
				<ul>
					<li><nuxt-link to="/">首页</nuxt-link></li>
					<li v-for="v in data"><nuxt-link :to="'/goods/goods_cat/'+v.id">{{v.name}}</nuxt-link></li>
<!-- 					<li><nuxt-link to="/">华为专区</nuxt-link></li>
					<li><nuxt-link to="/">荣耀专区</nuxt-link></li>
					<li><nuxt-link to="/">荣耀狂欢夜</nuxt-link></li>
					<li><nuxt-link to="/">荣耀8</nuxt-link></li>
					<li><nuxt-link to="/">华为P9</nuxt-link></li>
					<li><nuxt-link to="/">智能家居</nuxt-link></li>
					<li><nuxt-link to="/">特惠配件</nuxt-link></li> -->
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import shop_all_nav_cat from '@/components/Common/shop_all_nav_cat.vue'

export default {
  components: {
    shop_all_nav_cat,
  },
  data() {
    return {
    	data:[],
    }
},
  mounted(){
  	var _this = this;
  	this.$get(this.ROOT_URL + 'Shop/getIndexCat').then(function(res){
  		_this.data = res.data;
  	});
  },
}
</script>

<style>
.shop_index_nav{height: 40px;background: #333;}
.shop_index_nav_in{width: 1200px;margin:0 auto;}
.all_nav{width: 240px;background: #ca151e;line-height: 40px;position: relative;color:#fff;font-size: 14px;padding-left: 15px;float: left;}
.shop_nav{float: left;color:#fff;font-size: 14px;margin-left: 20px;}
.shop_nav ul li{float: left;}
.shop_nav ul li a{color:#fff;line-height: 40px;padding:0 30px;height: 40px;display: block;}
.shop_nav ul li a:hover{background: #111;}
</style>