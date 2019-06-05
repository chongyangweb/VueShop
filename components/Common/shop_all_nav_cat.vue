<template>
	<div class="shop_all_nav_cat">
		<div class="shop_cat_list" v-for="(v,key) in goodsCat" @mouseover="showSub(key)" @mouseleave="hideSub" >
			<div class="shop_cat_title">
				<nuxt-link :to="'/goods/goods_cat/'+v.id">{{v.name}}</nuxt-link>
			</div>
			<div class="shop_cat_small">
				<ul>
					<li v-for="vo in v.child"><nuxt-link :to="{name:'goods-goods_cat-id',params:{child_id:vo.id,id:v.id+'?'+vo.id}}">{{vo.name}}</nuxt-link></li>
				</ul>
			</div>
		</div>


		<transition name="sub_cat_fade">
		<div class="shop_sub_cat" @mouseover="showSub" @mouseleave="hideSub" v-show="subCat">
			<ul>
				<li  v-for="v in goodsCatChild.slice(3)"><nuxt-link :to="{name:'goods-goods_cat-id',params:{child_id:vo.id,id:v.id+'?'+vo.id}}">{{v.name}}</nuxt-link></li>
			</ul>
		</div>
		</transition>

	</div>
</template>

<script>
	export default {
		data(){
			return{
				subCat:false,
				goodsCat:[],
				goodsCatChild:[],
			}
		},
		methods:{
			showSub:function(e){
				this.subCat = true;
				if(!isNaN(e)){
					this.goodsCatChild = this.goodsCat[e]['child'];
				}
			},
			hideSub:function(){
				this.subCat = false;
			},


		},
		mounted(){
			var _this = this;
			this.$get(this.ROOT_URL + "Shop/getGoodsCat").then(function(res){
				_this.goodsCat = res.goods_cat;
			});
		},

	}
</script>

<style>
.shop_all_nav_cat{display:block;position: absolute;top: 40px;left:0;background-color: rgba(255,255,255,1);z-index: 3;height: 450px;width: 240px;box-sizing: border-box;}
.shop_cat_list{position: relative;padding:15px;padding-bottom: 10px;}
.shop_cat_title a{color:#000;}
.shop_cat_small ul li{float: left;margin-right: 15px;}
.shop_cat_small ul li:nth-child(3){margin-right: 0;}
.shop_cat_small ul li a{color:#999;line-height: 30px;font-size:12px;}
.shop_sub_cat{position: absolute; background-color: #f5f5f5;left:240px;top:0px;z-index: 999;height: 450px;width: 100%;}
.shop_sub_cat ul li a{margin-right: 15px;line-height: 50px;padding-left: 15px;width: 100%;display: block;}
.shop_sub_cat ul li:hover{background: #eee;}
.shop_cat_list:hover{background-color: #f5f5f5;}
.sub_cat_fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.sub_cat_fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

</style>