<template>
	<div class="shop_banner">
		<a-carousel autoplay>
		    <div v-for="v in banner" :style="'background:url('+v.image_url+');height:450px;background-repeat: repeat-x;background-position: top center;'"></div>
		</a-carousel>
	</div>
</template>

<style>
.shop_banner{height: 450px;}
/* For demo */
.shop_banner .ant-carousel {
  text-align: center;
  height: 450px;
  line-height: 450px;
  background: #364d79;
  overflow: hidden;
}

.shop_banner .slick-slide{
	text-align: center;
	height: 450px;
	line-height: 450px;
	background: #364d79;
	overflow: hidden;
}

.shop_banner .ant-carousel{
  color: #fff;
}

.slick-slide h3 {
	color: #fff;
}
</style>

<script>
	export default{
		data(){
			return{
				banner:[],
			}
		},
		mounted(){
			var _this = this;
			this.$get(this.ROOT_URL + "Shop/getBanner").then(function(res){
				_this.banner = res.goods_slide;
			});
		},
	}
</script>