<template>
	<div class="shop_all_nav_cat2">
		<div class="shop_cat_list2" v-for="(v,key) in goodsCat" @mouseover="showSub(key)" @mouseleave="hideSub" >
			<div class="shop_cat_title2">
				<nuxt-link :to="'/goods/goods_cat/'+v.id">{{v.name}}</nuxt-link>
			</div>
			<div class="shop_cat_small2">
				<ul>
					<li v-for="vo in v.child"><nuxt-link :to="{name:'goods-goods_cat-id',params:{child_id:vo.id,id:v.id+'?'+vo.id}}">{{vo.name}}</nuxt-link></li>
				</ul>
			</div>
		</div>


		<transition name="sub_cat_fade">
		<div class="shop_sub_cat2" @mouseover="showSub" @mouseleave="hideSub" v-show="subCat">
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
.shop_all_nav_cat2{display:block;position: absolute;top: 40px;left:0;background-color: rgba(0,0,0,0.7);z-index: 3;height: 450px;width: 240px;box-sizing: border-box;}
.shop_cat_list2{position: relative;padding:15px;padding-bottom: 10px;}
.shop_cat_title2 a{color:#fff;}
.shop_cat_small2 ul li{float: left;margin-right: 15px;}
.shop_cat_small2 ul li:nth-child(3){margin-right: 0;}
.shop_cat_small2 ul li a{color:#c1c1c1;line-height: 30px;font-size:12px;}
.shop_sub_cat2{position: absolute; background-color: rgba(255,255,255,0.95);left:240px;top:0px;z-index: 999;height: 450px;width: 100%;}
.shop_sub_cat2 ul li a{margin-right: 15px;line-height: 50px;padding-left: 15px;width: 100%;display: block;}
.shop_sub_cat2 ul li:hover{background: #eee;}
.shop_cat_list2:hover{background-color: #333;}
.sub_cat_fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.sub_cat_fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

</style>